import React, { useEffect } from 'react'
import { logout } from '../slice/authSlice'
import {  useLogoutMutation } from '../slice/userSlice'
import {useDispatch, useSelector} from 'react-redux'
import { LinkContainer} from 'react-router-bootstrap'
import { Badge, Container, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import SearchBox from './SearchBox'
import { useGetCartItemsQuery } from '../slice/cartSlice'


const Header = () => {

  
  const {userinfo}=useSelector((state)=>state.auth);
  const {data,isLoading,error,refetch}=useGetCartItemsQuery( );

  useEffect(()=>{
    refetch()
  },[userinfo])

  const dispatch=useDispatch();
  const navigate=useNavigate();

  const [logoutUser]=useLogoutMutation();


  
  
  const logoutHandler=async()=>{
    try{
      await logoutUser().unwrap();
      dispatch(logout());
      navigate('/signin')
      
   }catch(err){
    console.log(err)
   }
  }
  return (
    <header>
            <Navbar bg="dark" variant="dark" expand="lg"  collapseOnSelect>
      <Container>
        <LinkContainer to={'/'}>
        <Navbar.Brand >Aj Shop</Navbar.Brand>  
        </LinkContainer>
        <SearchBox />
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
         
            {userinfo &&
            <LinkContainer to={'/cart'}>
            <Nav.Link ><i className='fas fa-shopping-cart px-1'></i>Cart
             {!isLoading && !error &&  data.cartItems.length >0 ?
            <Badge pill bg='success' style={{marginLeft:"5px"}}>
              {data.cartItems.reduce((a,c)=>a+c.qty,0)}
              </Badge> :null }  
              </Nav.Link>
              </LinkContainer> }

            {userinfo ? (<NavDropdown title={userinfo.name} id='username'>
           
           
              <LinkContainer to={'/profile'}>
                <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  logout
                </NavDropdown.Item>
            </NavDropdown>) : ( 
            <LinkContainer to={'/signin'}>
            <Nav.Link link="/signin"><i className='fas fa-user px-1'></i>Sign in</Nav.Link>
            </LinkContainer>)}
            {userinfo && userinfo.isAdmin && (
            <NavDropdown title='admin' id='adminmenu'>
               <LinkContainer to={'/admin/products'}>
                <NavDropdown.Item>Products</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to={'/admin/users'}>
                <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>
              <LinkContainer to={'/admin/orders'}>
                <NavDropdown.Item>Orders</NavDropdown.Item>
                </LinkContainer>
            </NavDropdown>) }
         
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    </header>
  )
}

export default Header