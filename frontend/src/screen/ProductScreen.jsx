import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import { Button, Card, Col, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import Rating from '../component/Rating';
import axios from 'axios';

const ProductScreen = () => {
   const [product,setProduct]=useState([]);
   const {id:ProductID}=useParams();

   useEffect(()=>{
    const fetchproduct=async()=>{
      const {data}=await axios.get(`/api/products/${ProductID}`);
      setProduct(data)
    }
    fetchproduct();
   },[ProductID])
  
  return (
    <>
    <Link to={'/'} className='btn btn-light my-3'>Go back</Link>
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
            <ListGroupItem>
              <Button
              className='btn-block'
              type='button'
              disabled={product.countInStock===0}>Add to Cart</Button>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </Col>
    </Row>
    </>
  )
}

export default ProductScreen