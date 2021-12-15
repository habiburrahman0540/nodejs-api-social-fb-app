const express = require("express");
const app = express();
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const helmet = require('helmet')
const morgan = require('morgan')
const autRouter = require('./routes/auth')
const userRouter = require('./routes/users')
dotenv.config();
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true}, ()=>{
    console.log("Mongo DB also connected successfully.")
  });
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

app.use('/api/users',autRouter);
app.use('/api/users',userRouter);


app.listen(8080,()=>{
    console.log("Server successfully connected with 8080 port")
})