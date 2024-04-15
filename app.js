const cluster = require("cluster");
const os = require("os");

const totalCPUs = os.cpus().length;

if (cluster.isPrimary) {
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }

  // Listen for dying workers
  cluster.on("exit", function (worker) {
    // Replace the dead worker
    console.log("Worker", worker.id, " died :(");
    cluster.fork();
  });
} else {
  require("./server");
}
