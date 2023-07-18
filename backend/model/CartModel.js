import mongoose, { mongo } from "mongoose";

const cartSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        requried:true,
        ref:"User"
    },
    cartItems:[{ 
        product:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"Product"
        },
        name:{
            type:String,
            required:true
        },
        qty:{
            type:Number,
            required:true
        },
        image:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
       
    }],
    itemPrice:{
        type:Number,
        requried:false
    },
    taxPrice:{
        type:Number,
        requried:false
    },
    shippingPrice:{
        type:Number,
        required:false, 
    },
    totalPrice:{
        type:Number,
        required:false
    },
    shippingAddress:[{
        address:{
            type:String,
            required:false
        },
        city:{
            type:String,
            required:false
        },
        postalcode:{
            type:String,
            required:false
        },
        country:{
            type:String,
            required:false
        }
    }],
    paymentMethod:{
        type:String,
        required:false
    }
})

const Cart=mongoose.model('Cart',cartSchema)

export default Cart;