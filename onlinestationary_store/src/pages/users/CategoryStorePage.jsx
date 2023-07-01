import React from "react"
import { useEffect , useState } from "react"
import { Link, useParams } from "react-router-dom"
import { STORE_PAGE_PRODUCT_SIZE } from "../../services/helper.service"
import { getProductsOfCategories } from "../../services/product.service"
import { Breadcrumb, Col, Container, ListGroup, Row } from 'react-bootstrap'
import InfiniteScroll from "react-infinite-scroll-component"
import SingleProductCard from "../../components/users/SingleProductCard"
import CategoryView from "../../components/users/CategoryView"



const CategoryStorePage=()=>{
    const { categoryId, categoryTitle } = useParams()
    const [products,setProducts] = useState(null)
    const [currentPage,setCurrentPage]=useState(0)
    
    useEffect(()=>{
        loadProductsOfCategories(0,STORE_PAGE_PRODUCT_SIZE,'addedDate','desc')
    },[categoryId])

    useEffect(()=>{
        if(currentPage>0){
            loadProductsOfCategories(currentPage,STORE_PAGE_PRODUCT_SIZE,'addedDate','desc')
        }
    },[currentPage])

    const loadProductsOfCategories = (pageNumber, pageSize, sortBy, sortDir)=>{
        getProductsOfCategories(categoryId,pageNumber,pageSize,sortBy,sortDir)
        .then(data=>{
            console.log(data)
            if(currentPage>0){
                setProducts({
                  content:[...products.content,...data.content],
                  lastPage:data.lastPage,
                  pageNumber:data.pageNumber,
                  pageSize:data.pageSize,
                  totalElements:data.totalElements,
                  totalPages:data.totalPages
                })
            }else{
              setProducts({...data})
            }
        })
        .catch(error=>{
            console.log(error)
        })
    }

     //loading next page
  const loadNextPage=()=>{
    setCurrentPage(currentPage+1)
  }

  const  productsView = ()=>{
    return products && (
      
        <InfiniteScroll
         dataLength={products.content.length}
         next={loadNextPage}
         loader={<h3 className='text-center my-5'>Loading more products...</h3>}
         endMessage={<p className='my-5 text-center'>All Products loaded</p>}
         hasMore={!products.lastPage}
        
        >
          <Container>
          <Row>
        {
          products.content.map(p=>(
           <Col key={p.productId} md={4}>
            <SingleProductCard product={p} />
            </Col>
          ))
        }
        </Row>
        </Container>
        </InfiniteScroll>
      
    )
  }

    return products && (
        <>
       <Container fluid className="px-5 pt-5">
        <Row>    
            <Container>
            <Breadcrumb className="mx-5">
                <Breadcrumb.Item as={Link} to="/store">Store</Breadcrumb.Item>
                <Breadcrumb.Item>{categoryTitle}</Breadcrumb.Item>
            </Breadcrumb> 
            </Container>      
            <Col md={2}>
          <CategoryView/>
            </Col>
            <Col md={10}>
                {products.content.length>0?productsView():<h3 className="mt-5 text-center">No Items in this Category</h3>}
            </Col>
        </Row>
       </Container>
        </>
        
    )
}

export default CategoryStorePage