const mongoose = require("mongoose");

const DBConnect = () =>{
    mongoose.connect(process.env.DATABASE_URL)
        .then(() => console.log('Connected to MongoDB'))
        .catch(err => console.error('Error connecting to MongoDB:', err));
}

module.exports = DBConnect;