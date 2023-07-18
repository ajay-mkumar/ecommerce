import { useEffect, useState } from "react"
import {Form,Button} from 'react-bootstrap'
import FormContainer from "../component/FormContainer"
import {toast} from 'react-toastify'
import { useNavigate } from "react-router-dom";
import Checkoutsteps from "../component/Checkoutsteps";
import { useAddShippingAddressMutation, useGetCartItemsQuery } from "../slice/cartSlice";
import {Loader} from '../component/Loader'


const ShippingScreen = () => {;

    const  {data,isLoading}=useGetCartItemsQuery();
    

    const [address,setAddress]=useState('');
    const [city,setCity]=useState('');
    const [postalcode,setPostalcode]=useState( '');
    const [country,setCountry]=useState('');
    const [id,setId]=useState(null)
    

    useEffect(()=>{
        if(!isLoading && data.shippingAddress){
            data.shippingAddress.map((s)=>{
                setId(s._id)
                setAddress(s.address)
                setCity(s.city)
                setPostalcode(s.postalcode)
                setCountry(s.country)
            })
        }
    },[data,isLoading])

   



   const [addShippingAddress,{isLoading:shippingAddressLoading}]=useAddShippingAddressMutation();
   
    const navigate=useNavigate();


    const handleSubmit=async(e)=>{
      
        e.preventDefault();
        try{
        await addShippingAddress({id,address,city,postalcode,country}).unwrap();
        navigate('/payment');
    }catch(err){
        toast.error(err?.data?.message)
    }
        
    }

  return (
   
    
    <FormContainer>
         {isLoading && <Loader /> }
        <Checkoutsteps step2 />
        <h1>Shipping</h1>
        <Form onSubmit={handleSubmit} className="my-2">
            <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" value={address}
                placeholder="Enter Address" onChange={(e)=>setAddress(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" value={city}
                placeholder="Enter City" onChange={(e)=>setCity(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="postalcode">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control type="text" value={postalcode}
                placeholder="Enter Postal Code" onChange={(e)=>setPostalcode(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="country">
                <Form.Label>Country</Form.Label>
                <Form.Control type="text" value={country}
                placeholder="Enter Country" onChange={(e)=>setCountry(e.target.value)} />
            </Form.Group>
            <Button type="submit" className="my-2" variant="primary" >
                continue
            </Button>
        </Form>
        {shippingAddressLoading && <Loader />}
    </FormContainer>
  )
}

export default ShippingScreen