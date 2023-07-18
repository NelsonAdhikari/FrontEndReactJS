import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from "../assets/StationaryLogo.png";
import { NavLink } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { useContext } from 'react';
import CartContext from '../context/CartContext';


const CustomNavbar=()=>{
  const userContext=useContext(UserContext)
  const {cart,setCart}=useContext(CartContext)
  const doLogout=()=>{
    userContext.logout()
  }
    return (
        <Navbar className='bg-navbar-color' collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Container>
          <Navbar.Brand  as={NavLink} to="/">
            
            <img src={logo} alt="logo" height={25} width={25} />

            <span className='ms-1 mt-1'>StationeryStore</span> 
            
            </Navbar.Brand>


          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="m-auto">
              <Nav.Link as={NavLink} to="/services">Features</Nav.Link>
             
              
              {/* <NavDropdown title="Categories" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Desktop organisers</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                     Filing and storage
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Drawing Instruments</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                    Consumables
                </NavDropdown.Item>
              </NavDropdown> */}
              <Nav.Link as={NavLink} to="/about">About</Nav.Link>
              <Nav.Link as={NavLink} to="/contact">Contact Us</Nav.Link>
              
            </Nav>
            <Nav>
              <Nav.Link as={NavLink} to="/store">Store</Nav.Link>
              <Nav.Link as={NavLink} to="/cart">Cart {userContext.isLogin && cart && '(' + cart.items.length + ')'}</Nav.Link>

              {
               (userContext.isLogin) ? (
               <>

               {userContext.isAdminUser && (
                  <>
                    <Nav.Link as={NavLink} to="/admin/home">AdminDashboard</Nav.Link>

                  </>
               )}
               <Nav.Link as={NavLink} to={`/users/profile/${userContext.userData.user.userId}`}>{userContext.userData.user.name}</Nav.Link>
               <Nav.Link as={NavLink} to="/users/orders">Orders</Nav.Link>
               <Nav.Link onClick={doLogout}>Logout</Nav.Link>
              </>
              ) : (
                    <>
                      <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                      <Nav.Link as={NavLink} to="/register">SignUp</Nav.Link>
                    </>
               )
              }
              
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
           
      
    )
}

export default CustomNavbar;