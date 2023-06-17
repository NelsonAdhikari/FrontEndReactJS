import { useEffect } from "react"
import { useState } from "react"
import {  Card, Col, Container, Form, Pagination, Row, Table } from "react-bootstrap"
import { getAllProducts } from "../../services/product.service"
import { toast } from "react-toastify"
import SingleProductView from "../../components/admin/SingleProductView"
import { PRODUCT_PAGE_SIZE } from "../../services/helper.service"
import Swal from "sweetalert2"

const ViewProducts=()=>{
    const [products,setProducts]=useState(undefined)

    useEffect(()=>{
        getProducts(0,PRODUCT_PAGE_SIZE,'addedDate','desc')
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
    //
    const updateProductList=(productId)=>{
       const newArray= products.content.filter(p=>p.productId!=productId)
        setProducts({
            ...products,
            content:newArray
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
                                <SingleProductView key={index} index={index} product={product} updateProductList={updateProductList} />
                            ))
                        }
                    </tbody>
                </Table>
                <Container className="d-flex justify-content-center">
                    
                    <Pagination>
                        <Pagination.Prev onClick={(event)=>{
                            if((products.pageNumber-1)<0)
                            return
                            getProducts(products.pageNumber-1,PRODUCT_PAGE_SIZE,'addedDate','desc')
                        }} />
                      {/* 0 -- total pages-1   */}
                     {
                       [...Array(products.totalPages)].map((ob,i)=>i).map(item=>{
                         return products.pageNumber==item ? <Pagination.Item active key={item}>{item+1}</Pagination.Item> :<Pagination.Item onClick={(event)=>{
                            getProducts(item,PRODUCT_PAGE_SIZE,'addedDate','desc')
                         }} key={item}>{item+1}</Pagination.Item>
                        }
                        )
                     }
                     <Pagination.Next onClick={(event)=>{
                        if(products.lastPage)
                        return
                        getProducts(products.pageNumber+1,PRODUCT_PAGE_SIZE,'addedDate','desc')
                     }} />
                      
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