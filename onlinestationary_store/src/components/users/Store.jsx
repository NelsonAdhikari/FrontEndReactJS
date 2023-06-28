import React, { useEffect, useState } from 'react'
import { Col, Container, ListGroup, Row } from 'react-bootstrap'
import {getCategories} from '../../services/CategoryService'
import defaultCategoryImage from '../../assets/default_profile.jpg'
import {getAllLive, getAllProducts} from '../../services/product.service'
import { toast } from 'react-toastify'
import SingleProductCard from './SingleProductCard'
import InfiniteScroll from 'react-infinite-scroll-component'



function Store() {
  const [categories,setCategories]=useState(null)
  const [products,setProducts]=useState(null)
  const [currentPage,setCurrentPage]=useState(0)


  useEffect(()=>{
    loadCategories(0, 100000)
    loadProducts(currentPage,9,'addedDate','desc')
  },[])

  useEffect(()=>{
    if(currentPage>0){
      loadProducts(currentPage,9,'addedDate','desc')

    }

  },[currentPage])

  //loading next page
  const loadNextPage=()=>{
    setCurrentPage(currentPage+1)
  }

 const loadCategories=(pageNumber,pageSize)=>{
        getCategories(pageNumber,pageSize).then(data=>{
          console.log(data)
            setCategories({...data})
        })
        .catch(error=>{
          console.log(error);
        })
  }

  const loadProducts=(pageNumber,pageSize,sortBy,sortDir)=>{
        getAllLive(pageNumber,pageSize,sortBy,sortDir)
        .then(data=>{
          console.log(data)
          setProducts({...data})
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
          toast.error("Failed to load Products")
        })
  }

  const categoryView=()=>{
    return categories && (

      <>
        <ListGroup variant='flush' className='sticky-top'>
                <ListGroup.Item   action> 
                <img className='rounded-circle' src={defaultCategoryImage} alt={'default category image'} style={{
                             width:'40px',
                             height:'40px',
                             objectFit:'cover'
                          }}
                          onError={event=>{
                            event.currentTarget.setAttribute('src',defaultCategoryImage)
                          }}
                          />
                    <span className="ms-2">All Products</span>
                    </ListGroup.Item>

                    {categories.content.map(cat=>(
                         <ListGroup.Item action key={cat.categoryId}>
                          <img className='rounded-circle' src={cat.coverImage} alt={cat.title} style={{
                             width:'40px',
                             height:'40px',
                             objectFit:'cover'
                          }}
                          onError={event=>{
                            event.currentTarget.setAttribute('src',defaultCategoryImage)
                          }}
                          /> 
                         <span className="ms-2">{cat.title}</span>
                         </ListGroup.Item>
                    ))}
        </ListGroup> 
      </>
    )
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
  return (
    <Container fluid className='px-5 pt-5'>
      <Row>
        <Col md={2}>
        {categoryView()}
        </Col>
        <Col md={10}>
          {productsView()}
        </Col>
      </Row>
    </Container>
  )
}

export default Store