const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const userSchema = new Schema({
    phone: {
        type: String,
        required: true,
    },
    activated: {
        type: Boolean,
        required: false,
        default: false,
    },
    count:{
        type: Number,
        required: false,
        default: 0,
    }
},{
    timestamps: true,
})

module.exports = mongoose.model("User", userSchema,"users");