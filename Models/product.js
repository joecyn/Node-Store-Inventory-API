const mongoose=require("mongoose");

const productSchema=new mongoose.Schema({
   
    
            Name:{
                type:String,
                required:true,
                trim:true,
                lowercase:true
            },
            Quantity:{
                type:Number,
                required:true,   
            },
            Price:{
                type:Number,
                required:true,      
            },
            Category:{
                    type:String,
                    required:true,
                    trim:true,
                    lowercase:true   

            }
            

      
})
module.exports=mongoose.model("Product",productSchema);