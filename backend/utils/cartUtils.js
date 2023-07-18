export const addDecimal=(num)=>{
    return (Math.round(num*100/100)).toFixed(2);
}

export const updateCart=async(cart)=>{
    cart.itemPrice=addDecimal(cart.cartItems.reduce((acc,item)=>acc+item.price*item.qty,0));

    cart.shippingPrice=addDecimal(cart.itemPrice >= 1000 ? 0 : 50);


    cart.taxPrice=addDecimal(Number(0.15*cart.itemPrice).toFixed(2));
    
    cart.totalPrice=(
       Number(cart.itemPrice)+Number(cart.shippingPrice)+Number(cart.taxPrice)).toFixed(2);
    return cart
    
}