import { useContext } from "react";
import CartContext from "../context/CartContext";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import SingleCartItemView from "../components/users/SingleCartItemView";

function Cart(){
   const {cart,setCart,addItem,removeItem,clearCart}=useContext(CartContext);

   const getTotalCartAmount=()=>{
    let amount=0;
    cart.items.forEach((item)=>{
        amount+=item.totalPrice;
    })
    return amount;
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
                                <SingleCartItemView item={item}  />
                            ))
                        }
                    </Col>
                </Row>
                <Container className="px-5">
    <h3 className="text-end px-5">Total Amount: Rs.{getTotalCartAmount()}</h3>
</Container>
<Container className="text-center">
        <Button size="lg" >Place Order</Button>
    </Container>
            </Card.Body>
        </Card>
    </>)
   }
    return ( 
    <div className="">
    <Container>
        <Row>
            <Col>
            {cart && cartView()}
            </Col>
        </Row>
    </Container>
    

    </div>
    
    )
  
}
export default Cart;