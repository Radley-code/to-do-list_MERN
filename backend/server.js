// basic Express server setup

// Import necessary modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());

//Routes
app.use("/api/todos", require("./routes/todoRoutes")); // Setting up the todo routes

// Connect to MongoDB
// mongoose
//   .connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((err) => {
//     console.error("MongoDB connection error:", err);
//   });


const connectDB = async()=>{
 try{
       const conn = await mongoose.connect(process.env.MONGODB_URI);
       console.log('connected successful', conn.connection.host);
       console.log('connected to db', conn.connection.name);
 }catch(error){
    console.log('unable to connect', error)
 }

};

connectDB();

//Now we start the server
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
