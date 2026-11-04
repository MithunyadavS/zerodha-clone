
const mongoose = require("mongoose");

const { OrdersSchema } = require("../schemas/OrdersSchema");

// Create the Orders model
const OrdersModel = mongoose.model(
    "Order",
    OrdersSchema,
    "orders"
);

// Export the model
module.exports = { OrdersModel };
