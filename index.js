const express=require("express");
const app=express();
const mongoose=require("mongoose");
const router=require("./Routes/routes");
let cors = require('cors')
const PORT=5000;


//DB connection  mongodb://127.0.0.1:27017
mongoose.connect("mongodb://127.0.0.1:27017/Inventory")
        .then(()=>{
            console.log("Connected!");
        })
        .catch((err)=>{
            console.log(err);
        });

//Middlewares
app.use(cors());
app.use(express.json());

app.use("/api",router);

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});