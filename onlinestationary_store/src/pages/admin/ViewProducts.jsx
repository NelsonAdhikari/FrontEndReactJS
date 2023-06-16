import { useEffect } from "react"
import { useState } from "react"
import {  Card, Col, Container, Form, Pagination, Row, Table } from "react-bootstrap"
import { getAllProducts } from "../../services/product.service"
import { toast } from "react-toastify"
import SingleProductView from "../../components/admin/SingleProductView"

const ViewProducts=()=>{
    const [products,setProducts]=useState(undefined)

    useEffect(()=>{
        getProducts(0,10,'addedDate','desc')
    },[])

    const getProducts=(
        pageNumber=0,
        pageSize=10,
        sortBy='addedDate',
        sortDir="asc"
        )=>{
            //all product function of service

            getAllProducts(pageNumber,pageSize,sortBy,sortDir)
            .then(data=>{
                console.log(data);
                setProducts({
                    ...data
                })
            })
                .catch(error=>{
                    console.log(error)
                    toast.error("Error in load products")
                
            })
    }
    //products view
    const productsView=()=>{
            return(
                <Card className="shadow-sm">
                <Card.Body>
                    <h5 className="mb-3">View Products</h5>
                    <Form.Group className="mb-2">
                        <Form.Label>Search Product</Form.Label>
                        <Form.Control type="text" placeholder="Search here" />
                    
                    </Form.Group>
                <Table className="text-center" bordered striped  hover variant="secondary"  responsive size="sm" >
                    <thead>
                        <tr>
                        <th className="px-2 small">SN</th>
                        <th className="px-2 small">Title</th>
                        <th className="px-2 small">Quantity</th>
                        <th className="px-2 small">Price</th>
                        <th className="px-2 small">Discount</th>
                        <th className="px-2 small">Live</th>
                        <th className="px-2 small">Stock</th>
                        <th className="px-2 small">Category</th>
                        <th className="px-2 small">Date</th>
                        <th className="px-2 small">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.content.map((product,index)=>(
                                <SingleProductView key={index} index={index} product={product} />
                            ))
                        }
                    </tbody>
                </Table>
                <Container className="d-flex justify-content-center">
                    
                    <Pagination>
                        <Pagination.Prev></Pagination.Prev>
                        <Pagination.Item>2</Pagination.Item>
                        <Pagination.Item>3</Pagination.Item>
                        <Pagination.Next></Pagination.Next>

                    </Pagination>
                    
                </Container>
                </Card.Body>

                </Card> 
            )
    }
    return(
        <>
            <Container>
                <Row>
                    <Col>

                   { products ? productsView() : '' }
                   
                    </Col>

                </Row>
            </Container>
        </>
    )
}

export default ViewProducts