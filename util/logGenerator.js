const fs = require("fs");
const util = require("util");
const os = require("os");
const moment = require("moment-timezone");
const morgan = require("morgan");
const path = require("path");

// Set the desired log file path
const terminalLogs = path.join(__dirname, "..", "logs", "terminalLogs.log");
const requestLogs = path.join(__dirname, "..", "logs", "requestLogs.log");
const allLogs = path.join(__dirname, "..", "logs", "allLogs.log");

// If log paths are not present, create them
if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
  fs.mkdirSync(path.join(__dirname, "..", "logs"));
}

// morgran logs save in both requestLogs.log and allLogs

// Create a write stream (in append mode)
const AllLogStream = fs.createWriteStream(allLogs, { flags: "a" });
const requestLogStream = fs.createWriteStream(requestLogs, { flags: "a" });

// Set your timezone
const timezone = "Asia/Kolkata"; // Replace with your actual timezone

// Get the IP address
function getIPAddress() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const networkInterface of interfaces[name]) {
      if (networkInterface.family === "IPv4" && !networkInterface.internal) {
        return networkInterface.address;
      }
    }
  }
}
const logGenerator = () => {
  // Function to append logs to the file
  function logToFile(data) {
    const ipAddress = getIPAddress();
    const timestamp = moment().tz(timezone).format("YYYY-MM-DD HH:mm:ss"); // Formatted timestamp
    fs.appendFile(
      allLogs,
      ` ${ipAddress} - ${timestamp} - ${data}\n`,
      (err) => {
        if (err) {
          console.error("Error writing to log file:", err);
        }
      },
      fs.appendFile(
        terminalLogs,
        ` ${ipAddress} - ${timestamp} - ${data}\n`,
        (err) => {
          if (err) {
            console.error("Error writing to log file:", err);
          }
        }
      )
    );
  }

  // Override console.log, console.error, etc. to redirect output
  console.log = function (d) {
    logToFile(util.format(d)); // Log to file
    process.stdout.write(util.format(d) + "\n"); // Also log to the terminal
  };

  console.error = console.log; // Redirect other console methods similarly
};

morgan.token("date", (req, res, format) => {
  return moment().tz(timezone).format("YYYY-MM-DD HH:mm:ss");
});

morgan.token("ip", (req) => getIPAddress());

// Combined Morgan log format
const morganFormat = ":ip - :date :method :url :status :response-time ms";

module.exports = {
  logGenerator,
  morganMiddleware: morgan(morganFormat, {
    stream: requestLogStream,
  }),
  morganAllRequests: morgan(morganFormat, {
    stream: AllLogStream,
  }),
};
