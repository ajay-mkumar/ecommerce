import asyncHandler from "../middleware/asyncHandler.js"
import Product from "../model/ProductModel.js"

export const getProducts=asyncHandler(async(req,res)=>{
    const products=await Product.find({})
    res.json(products)
})

export const getProductById=asyncHandler(async(req,res)=>{
    const product=await Product.findById(req.params.id);

    if(product){
      return   res.json(product);
    }
    res.status(404);
    throw new Error("resource not found")
})

export const createProduct=asyncHandler(async(req,res)=>{
  const product=new Product({
    name:"sample Prod",
    image:"sampimg.jpg",
    brand:"apple",
    category:"samp cat",
    description:'dsdsds',
    countInStock:0,
    numReviews:0,
    price:0,
    user:req.user._id
  })

  const createdproduct=await product.save();
  res.status(200).json(createdproduct);
})

export const updateProduct=asyncHandler(async(req,res)=>{

  const {name,image,brand,category,description,countInStock,price}=req.body;
  const product=await Product.findById(req.params.id);

  if(product){
    product.name=name;
    product.image=image;
    product.brand=brand;
    product.category=category;
    product.description=description;
    product.countInStock=countInStock;
    product.price=price

    const updateproduct=product.save();
    return   res.json(updateproduct);
  }else{
    res.status(404);
    throw new Error("can't find product by this id")
  }
})

export const deleteProduct=asyncHandler(async(req,res)=>{
  const product=await Product.findById(req.params.id);

  if(product){
    await Product.deleteOne({_id:product._id});
    res.status(200).json({message:"Deleted Successfully"});
  }else{
    res.status(404);
    throw new Error("Unable to Delete");
  }

})