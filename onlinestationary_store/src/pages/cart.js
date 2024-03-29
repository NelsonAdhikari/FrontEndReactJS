import { useContext } from "react";
import CartContext from "../context/CartContext";
import { Alert, Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import SingleCartItemView from "../components/users/SingleCartItemView";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import UserContext from "../context/UserContext"
import {createOrder} from "../services/OrderService"
import { ORDER_STATUS, PAYMENT_STATUS } from "../services/helper.service";
import useJwtTokenExpiration from "../hooks/useJwtTokenExpiration";



function Cart(){
  const flag =  useJwtTokenExpiration();
    const [orderPlacedClicked,setOrderPlacedClicked]=useState(false)
   const {cart,setCart,addItem,removeItem,clearCart}=useContext(CartContext);
   const {userData,isLogin}=useContext(UserContext)

   const [orderDetails,setOrderDetails]=useState({
        billingAddress: '',
        billingName: '',
        billingPhone: '',
        cartId: '',
        orderStatus: '',
        paymentStatus: '',
        userId: ''
   })

   const getTotalCartAmount=()=>{
    let amount=0;
    cart.items.forEach((item)=>{
        amount+=item.totalPrice;
    })
    return amount;
   }
  // create order
   const handleOrderCreation=async()=>{
        
    if(orderDetails.billingName.trim()===""){
        toast.info("Billing Name Required",{
            position:"top-left"
        })
        return;
    }
        if(orderDetails.billingPhone.trim()===""){
        toast.info("Billing Phone Required",{
            position:"top-left"
        })
        return;
    }
    if(orderDetails.billingAddress.trim()===""){
        toast.info("Billing Address Required",{
            position:"top-left"
        })
        return;
    }
        //set required other details
        orderDetails.cartId=cart.cartId;
        orderDetails.orderStatus=ORDER_STATUS;
        orderDetails.paymentStatus=PAYMENT_STATUS;
        orderDetails.userId=userData.user.userId;


        console.log(orderDetails);

        try {
           const result = await createOrder(orderDetails);
           console.log(result)
           toast.success("order created proceed for payment ")
           setCart({
            ...cart,
            items: [],
           })
        } catch (error) {
            console.log(error)
            toast.error("Error in creating product ")
        }
    }

   const orderFormView=()=>{
    return ( 
    <Form>
        {/* billing name */}
        <Form.Group className="mt-3">
            <Form.Label>Billing Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your name" value={orderDetails.billingName} 
            onChange={(event)=>{
                setOrderDetails({
                    ...orderDetails,
                    billingName: event.target.value,
            })
            }}
            />
        </Form.Group>
         {/* billing phone */}
        <Form.Group className="mt-3">
            <Form.Label>Billing Phone</Form.Label>
            <Form.Control type="number" placeholder="Enter your phoneNo" value={orderDetails.billingPhone} 
            onChange={(event)=>{
                setOrderDetails({
                    ...orderDetails,
                    billingPhone: event.target.value,
            })
            }} />
        </Form.Group>
         {/* billing Address */}
        <Form.Group className="mt-3">
            <Form.Label>Billing Address</Form.Label>
            <Form.Control rows={6} as={'textarea'} placeholder="Enter your address" value={orderDetails.billingAddress} 
            onChange={(event)=>{
                setOrderDetails({
                    ...orderDetails,
                    billingAddress: event.target.value,
            })
            }} />
        </Form.Group>
        <Container className="mt-3 text-center">
            <Button variant="success" size="sm"  onClick={(event) => {
              handleOrderCreation();
              }} >Go to Order and Proceed to Pay</Button>
        </Container>
    </Form>
   )
}

   const cartView=()=>{
    return(<>
        <Card className="mt-3 shadow-sm">
            <Card.Body>
                <Row className="px-5">
                    <Col>
                    <h3>Cart</h3>
                    </Col>
                    <Col className="text-end">
                    <h3>{cart.items.length}Items</h3>
                    </Col>
                </Row>
                <Row className="px-5 mt-3">
                    <Col>
                        {
                            cart.items.map((item)=>(
                                <SingleCartItemView key={item.cartItemId} item={item}  />
                            ))
                        }
                    </Col>
                </Row>
                <Container className="px-5">
    <h3 className="text-end px-5">Total Amount: Rs.{getTotalCartAmount()}</h3>
</Container>
<Container className="text-center">
       { !orderPlacedClicked && <Button size="lg" onClick={event=>setOrderPlacedClicked(true)} >Place Order</Button> }
    </Container>
            </Card.Body>
        </Card>
    </>)
   }
    return ( 
    <div className="">
    <Container fluid={orderPlacedClicked} className="px-5">
        <Row>
            <Col md={orderPlacedClicked?8 : 12} className="animation">
            {cart && (cart.items.length>0 ? cartView():(<Alert variant="danger" className="mt-3 shadow-sm border border-0 text-center"><h3>No Items in Cart</h3>
            <p>Please go to Store to add some  products in the Card.</p>
            <Button as={Link} to="/store">Go to Store</Button>
            </Alert>))}
            {
                !cart && (
                <Alert variant="info" className="mt-3 shadow-sm border border-0 text-center"><h3>You are Not Logged In!!</h3>
                <p>In order to add item to cart do login</p>
                <Button as={Link} to="/login" variant="success">Login</Button>
                </Alert>
                )}
            </Col>
            {
                orderPlacedClicked && (
                <Col md={4}>
                <Card className="mt-3 shadow-sm">
                    <Card.Body>
                        <h4>Fill the form to complete order</h4>
                        {orderFormView()}
                    </Card.Body>
                </Card>
                </Col>
            )}
        </Row>
    </Container>
    

    </div>
    
    )
  
}
export default Cart;