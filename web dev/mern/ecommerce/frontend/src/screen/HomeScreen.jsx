import { useGetProductsQuery } from '../slice/productApislice'
import { Col, Row } from 'react-bootstrap'
import Product from '../component/Product'
import { Loader } from '../component/Loader'
import { Message } from '../component/Message'

const HomeScreen = () => {

  const {data:products,isLoading,error}=useGetProductsQuery()
  return (
    <>
  
    {isLoading ? (<Loader />) :error ? <Message variant="danger" > (error.data.messzge || error.error) </Message> : (<>
     <h1>Latest Products</h1>
     <Row  >
         {products.map(product=>(
             <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
             <Product  product={product}/>
             </Col>
         ))}
     </Row>
    </>)}
   
    </>
  )
}

export default HomeScreen