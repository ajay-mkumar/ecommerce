import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Col, Row } from 'react-bootstrap'
import Product from '../component/Product'

const HomeScreen = () => {
  const [products,setProducts]=useState([]);
  useEffect(()=>{
    const fetchproduct=async()=>{
      const {data}=await axios.get('/api/products');
      setProducts(data);
    }
    fetchproduct()
  },[])
  return (
    <>
    <h1>Latest Products</h1>
    <Row  >
        {products.map(product=>(
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product  product={product}/>
            </Col>
        ))}
    </Row>
    </>
  )
}

export default HomeScreen