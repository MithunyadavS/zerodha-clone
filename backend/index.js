
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");

const app = express();

const PORT = process.env.PORT || 3002;
const MONGO_URL = process.env.MONGO_URL;

// -------------------- MIDDLEWARE --------------------

app.use(cors());
app.use(express.json());

// -------------------- HEALTH CHECK --------------------

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Zerodha Clone Backend is running!"
    });
});

// -------------------- GET ALL HOLDINGS --------------------

app.get("/allHoldings", async (req, res) => {
    try {
        const allHoldings = await HoldingsModel.find({});

        res.status(200).json(allHoldings);

    } catch (error) {
        console.error("Error fetching holdings:", error.message);

        res.status(500).json({
            message: "Unable to fetch holdings"
        });
    }
});

// -------------------- GET ALL POSITIONS --------------------

app.get("/allPositions", async (req, res) => {
    try {
        const allPositions = await PositionsModel.find({});

        res.status(200).json(allPositions);

    } catch (error) {
        console.error("Error fetching positions:", error.message);

        res.status(500).json({
            message: "Unable to fetch positions"
        });
    }
});

// -------------------- CREATE NEW ORDER --------------------

app.post("/newOrder", async (req, res) => {
    try {
        const { name, qty, price, mode } = req.body;

        // Validate stock name
        if (!name || typeof name !== "string" || !name.trim()) {
            return res.status(400).json({
                message: "Stock name is required"
            });
        }

        // Validate quantity
        if (!Number.isInteger(Number(qty)) || Number(qty) <= 0) {
            return res.status(400).json({
                message: "Quantity must be a positive whole number"
            });
        }

        // Validate price
        if (!Number.isFinite(Number(price)) || Number(price) <= 0) {
            return res.status(400).json({
                message: "Price must be a positive number"
            });
        }

        // Validate order mode
        const orderMode = String(mode).toUpperCase();

        if (!["BUY", "SELL"].includes(orderMode)) {
            return res.status(400).json({
                message: "Order mode must be BUY or SELL"
            });
        }

        // Create order
        const newOrder = new OrdersModel({
            name: name.trim().toUpperCase(),
            qty: Number(qty),
            price: Number(price),
            mode: orderMode
        });

        // Save order in MongoDB
        const savedOrder = await newOrder.save();

        res.status(201).json({
            message: "Order saved successfully!",
            order: savedOrder
        });

    } catch (error) {
        console.error("Error creating order:", error.message);

        res.status(500).json({
            message: "Unable to save order"
        });
    }
});

// -------------------- HANDLE INVALID ROUTES --------------------

app.use((req, res) => {
    res.status(404).json({
        message: "API route not found"
    });
});

// -------------------- START SERVER --------------------

async function startServer() {
    try {
        if (!MONGO_URL) {
            throw new Error("MONGO_URL is missing in the backend .env file");
        }

        // Connect to MongoDB first
        await mongoose.connect(MONGO_URL);

        console.log("MongoDB connected successfully!");

        // Start Express server only after DB connection
        app.listen(PORT, () => {
            console.log(`Backend server running at http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("Failed to start backend:", error.message);
        process.exit(1);
    }
}

startServer();
