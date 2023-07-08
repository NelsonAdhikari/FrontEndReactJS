import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProduct } from '../../services/product.service'
import { Badge, Button, Card, Col, Container, Row } from 'react-bootstrap'
import ShowHtml from '../../components/ShowHtml'
import { getProductImageUrl } from '../../services/helper.service'
import defaultImage from "../../assets/default_profile.jpg"
import CartContext from '../../context/CartContext'
import { toast } from 'react-toastify';

function ProductView () {

    const {cart,addItem}=useContext(CartContext)

    const [product,setProduct]=useState(null)

    const {productId} = useParams()

    useEffect(()=>{
        loadUser(productId)
    },[])

    const loadUser=(productId)=>{
        getProduct(productId).then(data=>setProduct(data)).catch(error=>console.log(error))
    }

    const handleAddItem=(productId,quantity)=>{
        addItem(quantity,productId,()=>{
            toast.success("Product is added to cart")
        })
    }

    const productView=()=>{
        return(
            <Container>
                <Row>
                    <Col>
                   <Card className='mt-4 border border-0 shadow-sm'>
                    <Card.Body>
                        <Container className=' my-4'>
                           <Row>
                            <Col>
                             <img src={getProductImageUrl(product.productId)} alt=""
                            style={{width:"300px"}}
                            onError={(event)=>{
                                event.currentTarget.setAttribute('src',defaultImage)
                            }}
                            />
                            </Col>
                            <Col>
                            <Container>
                            <h4 className='mt-2 text-center'>{product.title}</h4>
                            <p className="text-muted SortDescription">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, repellendus!</p>
                            <Badge pill bg='info'>{product.category?.title}</Badge>
                            <Badge className='ms-2' pill bg={product.stock?'success':'danger'}>{product.stock ? 'In Stock': 'Out of Stock'}</Badge>
                            </Container >
                            <Container className='text-end'>
                            <b><span className='h1 text-muted'><s>Rs.{product.price}</s></span></b>
                            <b><span className='h2 ms-2'>Rs.{product.discountedPrice}</span></b>
                            </Container>
                            <Container className='d-grid mt-4'>
                            <Button  variant='danger' size='sm'
                            onClick={event=>handleAddItem(product.productId,1)}
                            >Add to Cart</Button>
                            <Button as={Link} to={'/store'}  variant='warning' className='mt-2' size='sm'>Go to Store</Button>

                            </Container>
                            </Col>
                           </Row>
                        </Container>

                        <div className='mt-5'>
                            <ShowHtml htmlText={product.description} />
                        </div>
                    </Card.Body>
                    </Card> 
                    </Col>
                </Row>
            </Container>
        )
    }
  return (
    product && productView()
  )
}

export default ProductView