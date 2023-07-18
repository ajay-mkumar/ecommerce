import asyncHandler from "../middleware/asyncHandler.js";
import Cart from "../model/CartModel.js";
import { updateCart } from "../utils/cartUtils.js";

export const addToCart=asyncHandler(async(req,res)=>{
    const {productId:product,name,qty,image,price}=req.body;



    const existcart=await Cart.findOne({user:req.user._id})
    let updateCartPrices
   
    if(existcart){
        const existitem= existcart.cartItems.findIndex((c)=>c.product==product)
        if(existitem>-1){
            if(qty==0){
               const c=await Cart.updateOne({user:req.user._id},{$pull:{'cartItems':{product}}})
               res.status(200).json(c)
            }else if(qty>5){
                res.status(404);
                throw new Error("We're Sorry,only 5units allowed in each order")
            }else{
            let product=existcart.cartItems[existitem];
            product.qty=qty;
            existcart.cartItems[existitem]=product
            const cart=await existcart.save();
            updateCartPrices=await updateCart(existcart)
            await updateCartPrices.save()
            res.status(202).json(cart)
        }
        }else{
           await existcart.cartItems.push({product,name,qty,image,price});
           await existcart.save();
           updateCartPrices=await updateCart(existcart)
           await updateCartPrices.save()
           res.status(200).json(existcart)
    }
}else{
    const cart=new Cart({
        user:req.user._id,
        cartItems:[{product,name,qty,image,price}]
    })
    await cart.save();
    updateCartPrices=await updateCart(cart)
    await updateCartPrices.save()
    res.status(200).json(cart)
}

})

export const getCartItems=asyncHandler(async(req,res)=>{
    
    const cart=await Cart.findOne({user:req.user._id});
    if(cart){
     res.json(cart)
   }else{
    res.status(404)
    throw new Error("Your Cart is Empty")
   }
})

export const addShippingAddress=asyncHandler(async(req,res)=>{

    const{id,address,city,postalcode,country}=req.body;
    const cart=await Cart.findOne({user:req.user._id});

    if(cart){
        const shippingaddress=cart.shippingAddress.findIndex((s)=>s._id==id)
        if(shippingaddress>-1){
            let saddress=cart.shippingAddress[shippingaddress];
            saddress.address=address,
            saddress.city=city,
            saddress.postalcode=postalcode,
            saddress.country=country
            cart.shippingAddress[shippingaddress]=saddress
            await cart.save();
            res.status(200).json(cart)
        }else{
            await cart.shippingAddress.push({address,city,postalcode,country})
            await cart.save()
            res.status(200).json(cart)
        }
    }

})

export const removeCartProducts=asyncHandler(async(req,res)=>{
    

        const cart=await Cart.updateOne({user:req.user._id},{$unset:{'cartItems':""}})
        res.status(200).json(cart)
    
})

export const addPaymentMethod=asyncHandler(async(req,res)=>{
    const {paymentMethod}=req.body;
    const cart=await Cart.findOneAndUpdate({user:req.user._id},{paymentMethod})
    res.status(200).json(cart)
})
