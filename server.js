require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./routes')
const DBConnect = require('./database');
const cookeParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 8000;
DBConnect()


const corsOptions = {
    credentials:true,
    origin: ["http://localhost:5173"]
}

app.use(cookeParser())
app.use('/storage',express.static('storage'))
app.use(express.json({ limit:'8mb' ,extended: true}));
app.use(cors(corsOptions))

app.use('/api/v1', router);

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})