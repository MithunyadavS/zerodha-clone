
const mongoose = require("mongoose");

const { PositionsSchema } = require("../schemas/PositionsSchema");

// Create the Positions model
const PositionsModel = mongoose.model(
    "Position",
    PositionsSchema,
    "positions"
);

// Export the model
module.exports = { PositionsModel };
