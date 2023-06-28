import React from 'react'
import { Badge, Button, Card, Col, Container, Row } from 'react-bootstrap'
import { getProductImageUrl } from '../../services/helper.service'
import "../users/SingleProductCard.css"
import defaultImage from "../../assets/default_profile.jpg"
import { Link } from 'react-router-dom'

const SingleProductCard = ({product}) => {
  return (
    <Card className='m-1 shadow-sm'>
        <Card.Body>
            <Container className='text-center'>
            <img src={getProductImageUrl(product.productId)} 
            alt="" 
            className='product-image'
            onError={(event)=>{
                event.currentTarget.setAttribute('src',defaultImage)
            }}
            />
            </Container>
            <h6 className='mt-2 text-center'>{product.title}</h6>
            <p className="text-muted SortDescription">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, repellendus!</p>
           <Badge pill bg='info'>{product.category?.title}</Badge>
           <Badge className='ms-2' pill bg={product.stock?'success':'danger'}>{product.stock ? 'In Stock': 'Out of Stock'}</Badge>

           <Container >
           <b><span className='h3 text-muted'><s>Rs.{product.price}</s></span></b>
            <b><span className='h4 ms-2'>Rs.{product.discountedPrice}</span></b>
           </Container>
           <Container className='d-grid mt-4'>
            <Button as={Link} to={`/store/products/${product.productId}`} variant='success' size='sm'>View Products</Button>
           </Container>
        </Card.Body>
    </Card>
  )
}

export default SingleProductCard