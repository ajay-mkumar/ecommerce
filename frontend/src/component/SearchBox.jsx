import { useState } from 'react';
import {Button, Form} from 'react-bootstrap';
import {useNavigate, useParams} from 'react-router-dom';

const SearchBox = () => {
    const navigate=useNavigate();
    const {keyword:urlkeyword}=useParams();

    const [keyword,setKeyword]=useState(urlkeyword || '');

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(keyword.trim()){
            setKeyword('');
            navigate(`/search/${keyword}`)
        }else{
            navigate('/')
        }
    }
  return (
    <Form onSubmit={handleSubmit} className='d-flex' >
        <Form.Control type='text' name='q'
        value={keyword} onChange={(e)=>setKeyword(e.target.value)}
        placeholder='Search Products...'
        className='mr-sm-2 ml-sm-5' />
        <Button type='submit' className='p-2 mx-2' variant='outline-light'>search</Button>
    </Form>
  )
}

export default SearchBox