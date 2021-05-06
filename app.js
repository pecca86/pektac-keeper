const express = require("express");
const app = express();
app.use(express.json());

const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

// ROUTES IMPORT
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const contactsRoutes = require("./routes/contacts");
// ROUTES
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
