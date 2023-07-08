import React from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import {getProductImageUrl} from '../../services/helper.service'
import defaultImage from "../../assets/default_profile.jpg"
import { useContext } from "react";
import CartContext from '../../context/CartContext';
import { toast } from 'react-toastify';




const SingleCartItemView = ({item}) => {

    const {cart,setCart,addItem,removeItem,clearCart}=useContext(CartContext);
   
  return (
    <Card className='shadow-sm mb-3' style={{backgroundColor:'e2e2e2'}}>
        <Card.Body>
<Row>
    <Col md={1} className='d-flex align-items-center justify-content-center'>
    
        <img src={getProductImageUrl(item.product.productId)} alt="" style={{
            width:"50px",
            height:"50px",
            objectFit:'contain'
        }}
        onError={(event)=>{
            event.currentTarget.setAttribute('src',defaultImage)
        }}
         />
   
    </Col>
    <Col md={9}>
    <h5>{item.product.title}</h5>
    <p className='text-muted'><span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, magni.</span></p>
        <Row>
            <Col>
           <p><b>{item.quantity}</b><span className='text-muted'>Quantity</span></p>
            </Col>
            <Col>
            <p><span className='text-muted'>Price</span> <b> Rs.{item.product.discountedPrice}</b></p>
            </Col>
            <Col>
            <p><span className='text-muted'>Total Price</span> <b> Rs.{item.totalPrice}</b></p>
            
            </Col>
        </Row>
    </Col>
    <Col md={2} className='d-flex align-items-center justify-content-center'>
        <div className='w-100'>
    <div className='d-grid'>
        <Button variant='danger' size='sm' onClick={event=>{
            removeItem(item.cartItemId)
        }}>Remove</Button>
    </div>
    <div className='mt-2'>
        <Row>
            <Col className='d-grid'>
            <Button onClick={event=>{
                const increasedQuantity=item.quantity+1         
                    addItem(increasedQuantity,item.product.productId,()=>{
                        toast.success("Quantity Increased by 1")
                    })
            }} variant='success' size='sm'>+</Button>
            </Col>
            <Col className='d-grid'>
            <Button onClick={event=>{
                const decreaseQuantity=item.quantity-1
                if(decreaseQuantity>0){
                    addItem(decreaseQuantity,item.product.productId,()=>{
                        toast.info("Quantity Decreased by 1")
                    })
                }else{
                    toast.warning("Quantity cannot be less than 1")
                }
            }} variant='warning' size='sm'>-</Button>
            </Col>
        </Row>
    </div>
</div>
    </Col>
</Row>

        </Card.Body>
    </Card>
  )
}

export default SingleCartItemView