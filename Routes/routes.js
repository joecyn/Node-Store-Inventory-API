const express=require("express");
const Products=require("../Models/product")
const router=express.Router();

//get All Products
router.get("/products",async(req,res)=>{
   try {
    
    const products=await Products.find({});
    //console.log(products);
    const responseData={
        status:"Success",
        Total:products.length,
        // data:{
        //     products:products
        // }
        products:products
    }
    
    products.length > 0 ? res.status(200).send(responseData):res.status(200).json({products:"There are products to display"})
    
   } catch (error) {
        res.status(400).json({error:error});
   }
});

//get single product

router.get("/product/:id",async(req,res)=>{
    try{
        const id=req.params.id;
        const product =await Products.findById({_id:id});
        const responseData={
            Status:"Success",
            product:product
            
        }
        res.status(200).json(responseData)

    }catch(error){
        console.log(error);
    }

})
//Add new product
router.post("/product",async(req,res)=>{
    try {
        const{name,category,price,quantity}=req.body;
        const newProduct=await Products.create({
            Name:name,
            Quantity:quantity,
            Price:price,
            Category:category
        });
        const responseData={
            Status:"Success",
            data:{
                product:newProduct
            }
        }
        res.status(200).json({Message:"Product added Successfully"});
        
    } catch (error) {
        res.status(400).send(error);
        
    }

});

//update product
router.patch("/product/:id",async(req,res)=>{
    try{
        const id=req.params.id;
        const updatedProduct =await Products.findByIdAndUpdate({_id:id},req.body);
        res.status(200).json(updatedProduct)

    }catch(error){
        console.log(error);
    }

});
//Delete product
router.delete("/product/:id",async(req,res)=>{
    
    try{
        const id=req.params.id;
        await Products.findByIdAndDelete({_id:id});
        res.status(200).json({Message:"Product deleted"})

    }catch(error){
        console.log(error);
    }
})
//get products that are Out of Stock
router.get("/outOfStock",async(req,res)=>{
    try {
        const outOfStock=await Products.find({}).where({Quantity:0});
        // console.log(products);
        // const outOfStock=products.filter(product=>{
        //     return product.Quantity===0;
        // })
        const responseData={
            status:"Success",
            Total:outOfStock.length,
            data:{
                products:outOfStock
            }
        };
        outOfStock.length > 0 ? res.status(200).json(responseData):res.status(200).json({products:"There are no products out of stock "})

        
    } catch (error) {
        
    }

})

module.exports=router