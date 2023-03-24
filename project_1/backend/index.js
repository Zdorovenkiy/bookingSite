require("dotenv").config()
const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");  
const ObjectId = require("mongodb").ObjectId
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./routes/index"); 
const errorMiddleware = require("./middleware/error-middleware");

const dbName = 'projectSite';
const client = new MongoClient(process.env.DB_URL);
const app = express();
let port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser()); 
app.use(cors({
   origin:"http://localhost:3000",
   credentials: true
  }));
app.use("/", router); 
app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    app.listen(port, function() {
        console.log("Server started successfully");
    });
  } catch(e) {
      console.log(e);
  }
}

start();
