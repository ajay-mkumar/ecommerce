import React from 'react'
import { Message } from './Message';
import { Loader } from './Loader';
import { useGettopproductQuery } from '../slice/productApislice'
import { Carousel,Image } from 'react-bootstrap';
import {Link} from 'react-router-dom'

const ProductCarousel = () => {
    const{data:products,isLoading,error}=useGettopproductQuery();


  return  isLoading ? <Loader /> : error ? <Message>{error}</Message> :(
        <Carousel pause='hover' className='bg-primary mb-4' xs={1}>
            {products.map(product=>(
                <Carousel.Item key={product._id}>
                    <Link to={`product/${product._id}`}>
                        <Image src={product.image} alt={product.name} />
                        <Carousel.Caption className='carousel-caption'>
                            <h2>{product.name}(${product.price})</h2>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
    )
  
}

export default ProductCarousel