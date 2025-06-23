import Product from '../modals/modal.mjs'

// Get all products
let getAllProducts=async(req,res)=>{
    try {
    let products = await Product.find();
    if (products.length == 0) {
           res.status(404).json({message:"No products found"});
    } else {
    
        res.status(200).json({
        message:"Our Products",
        products:products,
    })
    } 
    } catch (error) {
       console.log(error) ;
       res.status(500).json({message:"Internal server errror"});
    }
    }

    // Get a single product by ID
    let getProduct=async(req,res)=>{
        try {
        
            let id= req.params.id;
        let product = await Product.find({_id:id});
        if (product.length === 0) {
            res.status(404).json({message: "No product found"});
        } else {
            res.status(200).json({
            message:"product found",
            product:product,
        })
        } 
        } catch (error) {
           console.log(error) ;
           res.status(500).json({message:"Internal server errror"});
        }
        }
        
// Add a new product
        let addProduct=async(req,res)=>{
            try {
            let newProduct = new Product({
                 name:req.body.name,
                 description:req.body.description,
                 price:req.body.price,
              
                 image:req.body.image,
                 category:req.body.category,
                 inStock:req.body.inStock,
                 
            
            });
            let addprod = await Product.insertOne(newProduct);
            if (!addprod) {
                   res.status(404).json({message:"Failed to add product"});
            } else {
            
                res.status(200).json({
                message:"Product added successfully",
                product:addprod,
            })
            } 
            } catch (error) {
               console.log(error) ;
               res.status(500).json({message:"Internal server errror"});
            }
            }

            // Update a product
            let updateProduct=async(req,res)=>{
                try {
                    let id=req.params.id;
                    let updateProduct=await Product.findByIdAndUpdate(id,req.body,{new:true});
                    if(!updateProduct){
                        res.status(404).json({message:"Product not found"});
                    }else{
                        res.status(200).json({message:"Product updated successfully",product:updateProduct});
                    }
                } catch (error) {
                    console.log(error);
                    res.status(500).json({message:"Internal server error"});
                }
            }

            // Delete a product
            let deleteProduct=async(req,res)=>{
                try {
                    let id=req.params.id;
                    let deleteProduct=await Product.findByIdAndDelete(id);
                    if(!deleteProduct){
                        res.status(404).json({message:"Product not found"});
                    }else{
                        res.status(200).json({message:"Product deleted successfully"});
                    }
                    
                } catch (error) {
                    console.log(error);
                    res.status(500).json({message:"Internal server error"});
                }
            }

    const controller = { getAllProducts,getProduct,addProduct,updateProduct,deleteProduct};
    export default controller;