import mongoose from "mongoose";

const OrderSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        requried:true,
        ref:"User"
    },
    orderItems:[{ 
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
        product:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"Product"
        }
    }],
    shippingAddress:[{
        address:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        postalcode:{
            type:String,
            required:true
        },
        country:{
            type:String,
            required:true
        }
    }],
    paymentMethod:{
        type:String,
        required:false
    },
    paymentresult:{
        id:{type:String},
        status:{type:String},
        update_time:{type:String},
        email_address:{type:String}
    },
    itemPrice:{
        type:Number,
        requried:true
    },
    taxPrice:{
        type:Number,
        requried:true
    },
    shippingPrice:{
        type:Number,
        required:true, 
    },
    totalPrice:{
        type:Number,
        required:true
    },
    isPaid:{
        type:Boolean, 
        requried:true,
        default:false
    },
    PaidAt:{type:Date},
    isDelivered:{type:Boolean,requried:true,default:false},
    DeliveredAt:{type:Date}
},{
    timestamps:true
})

const Order=mongoose.model("Order",OrderSchema)

export default Order;