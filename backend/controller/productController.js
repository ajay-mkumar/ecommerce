import asyncHandler from "../middleware/asyncHandler.js"
import Product from "../model/ProductModel.js"

export const getProducts=asyncHandler(async(req,res)=>{

  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1
 
  const keyword=req.query.keyword ? {name:{$regex:req.query.keyword,$options:'i'}} : {};


  const count = await Product.countDocuments({...keyword})
  const products = await Product.find({...keyword})
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ products, page, pages: Math.ceil(count / pageSize) })
 
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
  const {name,image,brand,category,description,countInStock,price}=req.body;
  const product=new Product({
    name,
    image,
    brand,
    category,
    description,
    countInStock,
    price,
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
export const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find( 
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) { 
      res.status(400);
      throw new Error('Product already reviewed');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export const getTopProducts=asyncHandler(async(req,res)=>{
  const products=await Product.find({}).sort({rating:-1}).limit(3);

  res.status(200).json(products);
})