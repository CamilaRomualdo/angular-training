const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Create Router
const bookRoute = require("./routes/book.routes");
app.use(bookRoute);

// API Root
app.use("/api", bookRoute);

// Static Directory Path
app.use(
  express.static(path.join(__dirname, "dist/angular-training"))
);

// Connect to MongoDB (example URI).
mongoose
  .connect("mongodb://localhost:27017/bookstore", { useNewUrlParser: true, useUnifiedTopology: true })
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo.", err.reason);
  });

// Start server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("Listening on port: " + port);
});

// Base Route (Redirect or inform about the invalid endpoint.)
app.get("/", (req, res) => {
  res.send("Welcome to the Angular Training App!");
});

// Fallback
app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "dist/angular-training/index.html")
  );
});

// Error Handler for 404 - Not Found
app.use((req, res, next) => {
  next(createError(404, 'Resource not found'));
});

// Global Error Handler
app.use(function (err, req, res, next) {
  console.error(`Error - ${err.statusCode}: ${err.message}`);
  res.status(err.statusCode || 500).send({
    error: {
      status: err.statusCode || 500,
      message: err.message || 'Internal Server Error',
    }
  });
});
