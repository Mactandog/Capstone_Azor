const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require('cors');

const bookingRoutes = require("./routes/bookingsRoutes");
const userRoutes = require("./routes/userRoutes");
const customerInquiryRoutes = require("./routes/customerInquiryRoutes");

// Allow requests from specific origins (replace with your frontend URL)
const allowedOrigins = ['https://azor-motorcycle-services.onrender.com'];

// EXPRESS APP
const app = express();

// MIDDLEWARES
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});


const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));


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
