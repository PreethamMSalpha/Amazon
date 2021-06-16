require("dotenv").config();

const express = require("express");
const app = express();

const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//my routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");

//DB connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DATABASE CONNECTED"))
  .catch(() => console.log("DB CONNECTION FAILED"));

// middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);

//PORT
const port = process.env.PORT || 3000;

//starting a server
app.listen(port, () => {
  console.log(`server running in port ${port}`);
});

// app.get("/", (req, res) => {
//   res.send("hello fellas");
// });
