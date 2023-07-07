import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import { Form,Button, Card, Col, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import Rating from '../component/Rating';
import { useGetProductDetailsQuery } from '../slice/productApislice';
import { Loader } from '../component/Loader';
import { Message } from '../component/Message';
import { useState } from 'react';
import { addToCart } from '../slice/cartSlice';
const ProductScreen = () => {

   const {id:ProductID}=useParams();
   const [qty,setQty]=useState(1)
   console.log(qty)
   const dispatch=useDispatch();
   const navigate=useNavigate();

   const addToCartHandler=()=>{
    dispatch(addToCart({...product,qty}));
    navigate('/cart')

   }

   const {data:product,isLoading,error}=useGetProductDetailsQuery(ProductID);
   console.log(product)

  
  return (
    <>
    <Link to={'/'} className='btn btn-light my-3'>Go back</Link>
    {isLoading ? (<Loader />) :error ? <Message variant="danger" > (error.data.messzge || error.error) </Message> :(<>
      <Row>
      <Col md={5}>
        <Image src={product.image} alt={product.name} fluid/>
      </Col>
      <Col md={4}>
        <ListGroup variant='flush'>
          <ListGroupItem>
            <h3>{product.name}</h3>
          </ListGroupItem>
          <ListGroupItem>
            <Rating value={product.rating} review={`${product.numReviews} reviews`} />
          </ListGroupItem>
          <ListGroupItem>
            ${product.price}
          </ListGroupItem>
          <ListGroupItem>
            Description: {product.description}
          </ListGroupItem>
        </ListGroup>

      </Col>
      <Col md={3}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroupItem>
              <Row> 
                <Col>Price:</Col>
                <Col>
                <strong>${product.price}</strong>
                </Col>
              </Row>
            </ListGroupItem>
            <ListGroupItem>
              <Row>
                <Col>Status:</Col>
                <Col>
                <strong>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</strong></Col>
              </Row>
            </ListGroupItem>
            { product.countInStock > 0 && 
            <ListGroupItem>
              <Row>
                <Col>qty</Col>
                <Col>
                <Form.Control 
                  as='select'
                  value={qty}
                  onChange={(e)=>setQty(Number(e.target.value))}
                  >
                  {[...Array(product.countInStock).keys()].map((x)=>(
                    <option key={x+1} value={x+1}>{x+1}</option>
                  ))}
                  </Form.Control>
                  </Col>
              </Row>
            </ListGroupItem>
            
            }
            <ListGroupItem>
              <Button
              className='btn-block'
              type='button'
              disabled={product.countInStock===0} onClick={addToCartHandler}>Add to Cart</Button>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </Col>
    </Row>
    </>
    )}
   
    </>
  )
}

export default ProductScreen