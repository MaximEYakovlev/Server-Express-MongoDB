const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const authRouter = require("./routes/authRouter");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5001;
const corsOptions = {
  origin: process.env.CLIENT_URL,
  methods: "GET, POST, PUT, DELETE",
};

const mongoDB = process.env.MONGODB_URL;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
