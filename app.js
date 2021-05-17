// === EXPRESS ==
const express = require("express");
const app = express();
const path = require("path");

// === COOKIES ===
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// === ENVIROMENT VARS ===
const dotenv = require("dotenv");
if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: "./config/config.env" });
}

// === CONNECT TO MONGO DB TROUGH MONGOOSE ===
const connectDB = require("./config/db");
connectDB();

// == MIDDLEWARE ===
// Parses JSON body data
app.use(express.json({ extended: false }));

// === ROUTES IMPORT ===
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const contactsRoutes = require("./routes/contacts");
// === ROUTES ===
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactsRoutes);

// Errorhandling middleware for routes
// NEEDS TO COME AFTER ALL OTHER MIDDLEWARE!
const errorHandler = require("./middleware/error");
app.use(errorHandler);

// Serve static assets in production (REACT):
if (process.env.NODE_ENV === "production") {
  // set static REACT folder
  app.use(express.static("client/build"));
  // get any URL (IMPORTAN! has to come AFTER all other routes)
  // Searches for the REACT index.html
  app.get("*", (res, req) =>
    res.send(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

// === LISTEN TO PORT ON SERVER ===
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
