import React, {  useState } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import { useCreateproductMutation,  useUploadproductimageMutation } from '../../slice/productApislice';
import FormContainer from '../../component/FormContainer';
import { Loader } from '../../component/Loader';
import { Message } from '../../component/Message';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

const AddproductScreen = () => {
  

    const [name,setName]=useState('');
    const [price,setPrice]=useState(0);
    const [image,setImage]=useState('');
    const [brand,setBrand]=useState('');
    const [category,setCategory]=useState('');
    const [countInStock,setCountInStock]=useState(0);
    const [description,setDescription]=useState('');


    const [createproduct,{isLoading,error}]=useCreateproductMutation();

    const [uploadproductimage,{isLoading:imageUploadLoading}]=useUploadproductimageMutation();

    const navigate=useNavigate();



    const uploadImageHandler=async(e)=>{
       
        const formdata=new FormData();
        formdata.append('image',e.target.files[0]);
        try {
            const res=await uploadproductimage(formdata).unwrap();
          
            toast.success(res.message)
            setImage(res.image)
            
        } catch (err) {
            toast.error(err?.data?.message || err.message)
        }
    }

    const submitHandler=async(e)=>{
        e.preventDefault();

        const  productdetails={
            name,
            image,
            brand,
            category,
            description,
            countInStock,
            price,
        }

        const res=await createproduct(productdetails);
        if(res.error){
            toast.error(res.error);
        }else{
            toast.success('product added');
            navigate('/admin/products');
        }
    }
  return (
    <>
    <Link to={'/admin/products'} className='btn btn-light my-3'>Go Back</Link>
    <FormContainer>
        <h2>Add Product</h2>

        {isLoading ? <Loader /> : error ? <Message>{error}</Message> : (
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name' className='my-2'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' placeholder='Enter Name'
                    value={name} onChange={(e)=>setName(e.target.value)} />
                </Form.Group>
                <Form.Group controlId='price' className='my-2'>
                    <Form.Label>Price</Form.Label>
                    <Form.Control type='number' placeholder='Enter Price'
                    value={price} onChange={(e)=>setPrice(e.target.value)} />
                </Form.Group>
                <Form.Group controlId='image' className='my-2'>
                    <Form.Label>Image</Form.Label>
                    <Form.Control type='text' placeholder='Image Url'
                    value={image}   onChange={(e) => setImage(e.target.value)} />
                    <Form.Control type='file' label='choose a file' onChange={uploadImageHandler}  />
                </Form.Group>
                {imageUploadLoading && <Loader />}
                <Form.Group controlId='brand' className='my-2'>
                    <Form.Label>Brand</Form.Label>
                    <Form.Control type='text' placeholder='Enter Brand'
                    value={brand} onChange={(e)=>setBrand(e.target.value)} />
                </Form.Group>
                <Form.Group controlId='category' className='my-2'>
                    <Form.Label>Caregory</Form.Label>
                    <Form.Control type='text' placeholder='Enter Caregory'
                    value={category} onChange={(e)=>setCategory(e.target.value)} />
                </Form.Group>
                <Form.Group controlId='countInStock' className='my-2'>
                    <Form.Label>Count In Stock</Form.Label>
                    <Form.Control type='number' placeholder='Enter Count In Stock'
                    value={countInStock} onChange={(e)=>setCountInStock(e.target.value)} />
                </Form.Group>
                <Form.Group controlId='description' className='my-2'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control type='text' placeholder='Enter Description'
                    value={description} onChange={(e)=>setDescription(e.target.value)} />
                </Form.Group>
                <Button type='submit' variant='primary' className='my-2'>Add Product</Button>
            
            </Form>
        )}
    </FormContainer>
    </>
  )
}

export default AddproductScreen