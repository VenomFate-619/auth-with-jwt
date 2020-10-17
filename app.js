require("dotenv").config();
const express = require('express')
const app = express()
const cookiePraser=require('cookie-parser')
const mongoose=require('mongoose')
const authRoutes=require('./routes/auth')
const port = process.env.PORT || 8080

// db connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch(() => {
    console.log("error in connecting to DB");
  });
// middleware
app.use(express.json())
app.use(cookiePraser())
// routes
app.use("/api", authRoutes);
app.listen(port, () => console.log(`Example app listening on port ${port}!`))