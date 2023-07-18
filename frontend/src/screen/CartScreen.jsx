import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { Message } from '../component/Message'
import { Col,Form, ListGroup, ListGroupItem, Row,Image, Button, Card } from 'react-bootstrap'
import {FaTrash} from 'react-icons/fa'
import { useAddToCartMutation, useGetCartItemsQuery } from '../slice/cartSlice'
import { Loader } from '../component/Loader'
import { toast } from 'react-toastify'

const CartScreen = () => {

    const {data:cartItems,isLoading,error,refetch}=useGetCartItemsQuery( { count: 5 },{refetchOnMountOrArgChange: true} );
    const navigate=useNavigate();
    

    const [addToCart,{isLoading:addToCartLoading}]=useAddToCartMutation();
    const addToCartHandler=async(product,qty)=>{
        try {
            const res=await addToCart({productId:product.product,qty}).unwrap();
            refetch();
        } catch (err) {
            toast.error(err.data.message || err.message)
        }
        
    }
  
    
  return (
   
    <Row>
      
      
      {isLoading ? <Loader /> : error ? <Message>{error.data.message}</Message> : 
      cartItems.cartItems.length<=0 ? <Message>Your cart is empty</Message> :
      <>
    <Col md={8} >
    <h1 style={{marginBottom:'20px'}}>Shopping Cart</h1>
  
        <ListGroup variant='flush'>
            {cartItems.cartItems.map((item)=>(
                <ListGroupItem key={item._id}>
                    <Row>
                        <Col md={2}>
                            <Image src={item.image} alt={item.name} fluid rounded/>
                        </Col>
                        <Col md={3}>
                            <Link to={`/product/${item._id}`}>{item.name}</Link>
                        </Col>
                        <Col md={2}>${item.price}</Col>
                        
                        <Col >
                            <Row >
                                <Col sm={2} >
                                     <Button  variant='light' onClick={()=>{addToCartHandler(item,item.qty+1)}}>+</Button>
                                </Col>
                        <Col md={4}>
                       <Form.Control 
                        type='text'
                        value={item.qty}
                        onChange={(e)=>{addToCartHandler(item,Number(e.target.value))}}
                        />       
                        </Col>
                        <Col  sm={2}> 
                        <Button  variant='light' onClick={()=>{addToCartHandler(item,item.qty-1)}}>-</Button>
                        </Col>
                        </Row>
                        
                        </Col>
                     
                        {/* <Col md={2}> 
                            <Button type='button' variant='light' onClick={()=>removeFromCartHandler(item._id)}>
                                <FaTrash/>
                            </Button>
                        </Col>*/}
                    </Row>

                </ListGroupItem>
            ))}
        </ListGroup>
    
</Col>
<Col md={4}>
    <Card>
    <ListGroup variant='flush'>
        <ListGroupItem>
            <h2>Subtotal ({cartItems.cartItems.reduce((acc,item)=>acc+item.qty,0)}) items</h2>
            ${cartItems.cartItems.reduce((acc,itm)=>acc+itm.qty*itm.price,0).toFixed(2)}
        </ListGroupItem>
        <ListGroupItem>
            <Button type='button' onClick={()=>navigate('/shipping')} className='btn-block' disabled={cartItems.cartItems.length<=0}>
                Proceed to checkout
            </Button>
        </ListGroupItem>
    </ListGroup>
    </Card>
</Col>    
</>
}
       
    </Row>
  )
}

export default CartScreen