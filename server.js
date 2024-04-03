require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./routes')
const DBConnect = require('./database');

const app = express();
const PORT = process.env.PORT || 8000;
DBConnect()

app.use(express.json());
app.use(cors())
app.use('/api/v1', router);

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})