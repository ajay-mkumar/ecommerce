import { useEffect, useState } from "react"
import FormContainer from "../component/FormContainer";
import Checkoutsteps from "../component/Checkoutsteps";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAddPaymentMethodMutation, useGetCartItemsQuery } from "../slice/cartSlice";

const PayementScreen = () => {
    const [paymentMethod,setPaymentMethod]=useState('PayPal');

    
    const navigate=useNavigate();
    const {data,isLoading}=useGetCartItemsQuery();
    const [addPaymentMethod]=useAddPaymentMethodMutation();



    useEffect(()=>{
        if(!isLoading && !data.shippingAddress){
            navigate('/shipping');
        }
    },[navigate,data,isLoading])

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
        await addPaymentMethod({paymentMethod}).unwrap();
        navigate('/placeorder')
    }catch(err){
        console.log(err)
    }
}

  return (
     <FormContainer>
        <Checkoutsteps step2 step3 />
        <h1>Payement Method</h1>
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label as={'legend'}>Select Method</Form.Label>
                <Form.Check type="radio"
                className="my-2"
                label='PayPal or credit card'
                name="paymentmethod"
                id="PayPal"
                value='PayPal'
                onChange={(e)=>setPaymentMethod(e.target.value)} />
            </Form.Group>
            <Button type="submit" variant="primary">continue</Button>
        </Form>
     </FormContainer>
  )
}

export default PayementScreen