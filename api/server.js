const mongoose = require("mongoose");
const express = require("express");
const app = express();
require("dotenv").config();

// db
mongoose.connect(process.env.MONGO_URI).then(() => console.log("DB Connected"));

// mw
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
require("./routes")(app);

// server
const PORT = process.env.PORT || 8001;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
