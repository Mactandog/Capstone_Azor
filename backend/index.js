const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");

const bookingRoutes = require("./routes/bookingsRoutes");
const userRoutes = require("./routes/userRoutes");
const customerInquiryRoutes = require("./routes/customerInquiryRoutes");

// EXPRESS APP
const app = express();

// MIDDLEWARES
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// ROUTES
app.use("/api/bookings", bookingRoutes);
app.use("/api/users", userRoutes);
app.use("/api/inquiries", customerInquiryRoutes);

// CONNECT TO MONGO DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.get("/", (req, res) => {
      res.json("Hello!");
    });
    // Listen to port
    app.listen(process.env.PORT || 2023, () => {
      console.log("listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
