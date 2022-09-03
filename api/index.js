import express from "express";
import dotenv from "dotenv";
import transactionRoute from "./routes/transactions.js";
import authRoute from "./routes/auth.js";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
dotenv.config();

const port = process.env.PORT;

// middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes

app.get("/", (req, res) => {
  res.json({ msg: "Welcome to your expense tracker app" });
});

app.use("/api/v1/transactions", transactionRoute);
app.use("/api/v1/auth", authRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";

  return res.status(errorStatus).json({
    status: errorStatus,
    success: false,
    message: errorMessage,
    stack: err.stack,
  });
});

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to mongDB...");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.off("disconnected", () => {
  console.log("MongoDB disconnected!");
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected!");
});

app.listen(port, () => {
  connect();
  console.log(`Server running on port ${port}`);
});
