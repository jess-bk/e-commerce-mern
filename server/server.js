require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");

const verifyJWT = require("./middleware/verifyJWT");
const credentials = require("./middleware/credentials");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const dbConnection = require("./config/dbConnection");
const PORT = process.env.PORT || 3500;

// Connect to MongoDB
dbConnection();

// custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//serve static files
app.use("/", express.static(path.join(__dirname, "/public")));

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// routes for the app
app.use("/api/auth/register", require("./routes/register"));
app.use("/api/auth/login", require("./routes/auth"));
app.use("/api/products", require("./routes/product"));
app.use("/refresh", require("./routes/refresh"));
app.use("/api/logout", require("./routes/logout"));

// Routes for authorized users
app.use(verifyJWT);
app.use("/api/users", require("./routes/users"));
app.use("/api/carts", require("./routes/cart"));
app.use("/api/orders", require("./routes/order"));
app.use("/api/checkout", require("./routes/stripe"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () =>
    console.log(
      `Server running on port - ${PORT}\nData Base connecion on - ${process.env.DB_CONNECTION}`
    )
  );
});
