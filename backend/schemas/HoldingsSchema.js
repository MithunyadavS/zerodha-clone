
const mongoose = require("mongoose");

const HoldingsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    qty: {
        type: Number,
        required: true,
        min: 0
    },

    avg: {
        type: Number,
        required: true,
        min: 0
    },

    price: {
        type: Number,
        required: true,
        min: 0
    },

    net: {
        type: String,
        default: "0%"
    },

    day: {
        type: String,
        default: "0%"
    }
});

module.exports = { HoldingsSchema };
