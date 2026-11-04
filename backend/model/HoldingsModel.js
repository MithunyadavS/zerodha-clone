
const mongoose = require("mongoose");

const { HoldingsSchema } = require("../schemas/HoldingsSchema");

// Create the Holdings model
const HoldingsModel = mongoose.model(
    "Holding",
    HoldingsSchema,
    "holdings"
);

// Export the model
module.exports = { HoldingsModel };
