import { useEffect } from "react"
import { Link,useNavigate } from "react-router-dom"
import Checkoutsteps from "../component/Checkoutsteps"
import { Row,Col, ListGroup,Image, Card, Button } from "react-bootstrap"
import { Message } from "../component/Message"
import { useCreateOrderMutation } from "../slice/orderSlice"
import { Loader } from "../component/Loader"
import {toast} from 'react-toastify'
import { clearCartItems, useGetCartItemsQuery, useRemoveCartItemsMutation } from "../slice/cartSlice"

const PlaceOrderScreen = () => {
    const navigate=useNavigate();

    const{data:cart,isLoading:cartLoading,error:cartError}=useGetCartItemsQuery();
    const [removeCartItems]=useRemoveCartItemsMutation();

    const [createOrder,{isLoading,error}]=useCreateOrderMutation();

    

    const placeOrderHandler=async()=>{
        try{
         
            const res=await createOrder({
                orderItems:cart.cartItems,
                shippingAddress:cart.shippingAddress,
                paymentMethod:cart.paymentMethod,
                itemPrice:cart.itemPrice,
                taxPrice:cart.taxPrice,
                shippingPrice:cart.shippingPrice,
                totalPrice:cart.totalPrice
            }).unwrap();
            await removeCartItems().unwrap();
            navigate(`/order/${res._id}`)
        }catch(err){
            toast.error(err?.data?.message || err.message)

        }

    }
  return (
    <>
        <Checkoutsteps step2 step3 step4/>
        {cartLoading ?<Loader /> :
        <Row>
           
            <Col md={8}>
                <ListGroup variant="flush">
                <h2>Shipping:</h2>
                    <ListGroup.Item>
                        <strong>Address:</strong>
                        {cart.shippingAddress.map(((c,i)=>(
                        <p key={i}>{c.address},{c.city}{' '}
                        {c.postalcode}{' '},{c.country}</p>
                        )))}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <strong>Payment Method: </strong>
                        <p>{cart.paymentMethod}</p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {cart.cartItems.length===0 && (
                            <Message>Your Cart Is Empty</Message>
                        ) } <ListGroup >
                           {cart.cartItems.map((item,index)=>(
                           
                                <ListGroup.Item key={index}>
                                    <Row>
                                        <Col md={1}>
                                        <Image src={item.image} alt={item.name}
                                        fluid rounded />

                                        </Col>
                                        <Col>
                                        <Link to={`/product/${item._id}`}>
                                        {item.name}
                                        </Link></Col>
                                        <Col md={4}>
                                            {item.qty} X {item.price}=${item.qty*item.price}
                                        </Col>
                                    </Row>
                                    
                                </ListGroup.Item>
                           
                        ))}
                        </ListGroup>
                    </ListGroup.Item>

                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                Items:
                                </Col>
                                <Col>
                                Rs.{cart.itemPrice}
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>
                                Shipping:
                                </Col>
                                <Col>
                                Rs.{cart.shippingPrice}
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>
                                Tax:
                                </Col>
                                <Col>
                                Rs.{cart.taxPrice}
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>
                                Total Price:
                                </Col>
                                <Col>
                                Rs.{cart.totalPrice}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            {error && <Message>{error}</Message>}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type="button" className="btn-block"
                            disabled={cart.cartItems.length===0} onClick={()=>{placeOrderHandler()}}>Place Order</Button>
                            {isLoading && <Loader />}
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
}
    </>
  )
}

export default PlaceOrderScreen