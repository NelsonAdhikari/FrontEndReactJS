import { useState , useEffect} from "react"
import { Button, Card, Col, Container, Form, FormGroup, InputGroup, Row } from "react-bootstrap"
import { toast } from "react-toastify"
import { addProductImage, createProductWithoutCategory } from "../../services/product.service"
import {getCategories} from '../../services/CategoryService'

const AddProduct=()=>{

    const [product,setProduct]=useState({
        title: '',
        description:'',
        price: 0,
        discountedPrice: 0,
        quantity: 1,
        live:false,
        stock:true,
        image:undefined,
        imagePreviw:undefined
    })

    const [categories,setCategories]=useState(undefined)
    const [selectedCategoryId,setSelectedCategoryId]=useState("none")

    useEffect(()=>{
        getCategories(0,1000).then(data=>{
            console.log(data)
            setCategories(data)
        })
        .catch((error)=>{
            console.log(error)
            toast.error("Failed to load category!!")
        })

    },[]) 
   

    const handleFileChange=(event)=>{
        if(event.target.files[0].type==='image/png'|| event.target.files[0].type==='image/jpeg'){
            //preview show
            const reader = new FileReader()
            reader.onload = (r)=>{
                setProduct({
                    ...product,
                    imagePreviw:r.target.result,
                    image:event.target.files[0]
                })
               
                
                
            }
            reader.readAsDataURL(event.target.files[0])
        }else{
            toast.error("Invalid File Type!!")
            setProduct({
                ...product,
                image:undefined,
                imagePreviw:undefined
            })
        }
    }
    //submit add product form
    const submitAddProductForm=(event)=>{
        event.preventDefault()

        if(product.title===undefined || product.title.trim()===''){
            toast.error("Title is required")
            return
        }
        if(product.description===undefined || product.description.trim()===''){
            toast.error("Description is required")
            return
        }
        if(product.price <= 0){
            toast.error("Invalid Price")
            return
        }

        if(product.discountedPrice <= 0 || product.discountedPrice>=product.price){
            toast.error("Invalid discounted Price")
            return
        }
        //validate

        //create product without category
        createProductWithoutCategory(product)
        .then(data=>{
            console.log(data);

            //image upload
            addProductImage(product.image,data.productId)
            .then(data=>{
                console.log(data)
                toast.success("Image Saved!!")
                setProduct({
                    title: '',
                    description:'',
                    price:0,
                    discountedPrice:0,
                    quantity:1,
                    live:false,
                    stock:true,
                    image:undefined,
                    imagePreviw:undefined
                })
    
            })
            .catch(error=>{
                console.log(error)
                toast.error("Error in upload Image!!")
            })

            toast.success("Product Created")
           
        })
        .catch(error=>{
            console.log(error)
            toast.error("Product add Failed!!")
        })

    }


 const formView=()=>{
    return (
        <>
        <Card className="border border-0 shadow">
            {/* {JSON.stringify(product)} */}
            <Card.Body>
                <h5>Add Product Here</h5>
               <Form onSubmit={submitAddProductForm}>
                {/* {product Title} */}
                <FormGroup className="mt-3">
                    <Form.Label>Product Title</Form.Label>
                    <Form.Control 
                    type="text"
                    placeholder="Enter Here"
                    onChange={(event)=>setProduct({
                        ...product,
                        title:event.target.value
                    })}
                    value={product.title}
                    />
                    {/* {product Description} */}
                <Form.Group className="mt-3">
                    <Form.Label>Product Description</Form.Label>
                    <Form.Control 
                       as={'textarea'}
                       rows={6} 
                       placeholder="Enter here"
                       onChange={(event)=>setProduct({
                        ...product,
                        description:event.target.value
                    })}
                    value={product.description}
                    />
                </Form.Group>       
                </FormGroup>
                <Row>
                    <Col>
                      {/* {product price} */}
                    <FormGroup className="mt-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control 
                    type="number"
                    placeholder="Enter Here"
                    onChange={(event)=>setProduct({
                        ...product,
                        price:event.target.value
                    })}
                    value={product.price}
                    />
                    </FormGroup>
                    </Col>
                    
                    <Col>

                     {/* {discounted price} */}
                    <FormGroup className="mt-3">
                    <Form.Label>Discounted Price</Form.Label>
                    <Form.Control 
                    type="number"
                    value={product.discountedPrice}
                    placeholder="Enter Here"
                    onChange={(event)=>{
                        if(event.target.value>product.price){
                            toast.error("Invalid Discount Value")
                            return
                        }
                        setProduct({
                        ...product,
                        discountedPrice:event.target.value
                       
                    })
                    
                    }}
                    
                    />
                    </FormGroup>
                    </Col>
                </Row>
                {/* {product Quantity} */}
                <Form.Group className="mt-3">
                    <Form.Label>Product Quantity</Form.Label>
                    <Form.Control
                     type="number"
                     placeholder="Enter here"
                     value={product.quantity}
                     onChange={(event) => 
                        setProduct({
                            ...product,
                            quantity: event.target.value
                        })}

                     
                     />
                </Form.Group>
                <Row className="mt-3 px-1">
                   <Col>
                   {/* {product live} */}
                   <Form.Check
                   type="switch"
                   label={"Live"}
                   checked={product.live}
                   onChange={(event)=>{
                    setProduct({
                        ...product,
                        live:!product.live
                    })

                   }}
                   />
                   
                   </Col>
                   <Col>
                   {/* {product stock} */}
                    <Form.Check
                   type="switch"
                   label={"Stock"}
                    checked={product.stock}
                   onChange={(event)=>{
                    setProduct({
                        ...product,
                        stock:!product.stock
                    })

                   }}
                   />
                   </Col>
                </Row>
                {/* {product image} */}
                <Form.Group className="mt-3">
                    <Container hidden={!product.imagePreviw} className="text-center py-4 border border-2">
                        <p className="text-muted">Image Preview</p>
                        <img 
                        className="img-fluid" 
                        style={{
                            maxHeight:'250px'
                        }}
                        src={product.imagePreviw} 
                        alt="" 
                        />
                    </Container>
                    <Form.Label>Select product Image</Form.Label>
                    <InputGroup>
                    <Form.Control type={'file'}
                    onChange={(event)=>handleFileChange(event)}
                    />   
                    <Button onClick={(event)=>{
                            setProduct({
                                ...product,
                                image:undefined,
                                imagePreviw:undefined,
                            })
                    }} 
                    variant="outline-warning">Clear</Button>
                    </InputGroup> 
                </Form.Group >
                <Form.Group className="mt-3">
                    <Form.Label>Select Category</Form.Label>
                      <Form.Select value={setSelectedCategoryId} onChange={(event)=>setSelectedCategoryId(event.target.value)}>
                        <option value="none">None</option>
                          {
                            (categories) ? <>
                            
                            {
                                categories.content.map(cat=><option key={cat.categoryId} value={cat.categoryId}>{cat.title}</option>)
                            }
                            </> : ''
                          }

                      </Form.Select>
                </Form.Group>
                <Container className="text-center mt-3">
                <Button type="submit" variant="success" size="sm">Add Product</Button>
                <Button className="ms-2" variant="danger" size="sm">Clear</Button>
                </Container>

                </Form>
            </Card.Body>
        </Card>
        </>
    )
 }
return(<div>
      {  
        formView()
      }
    </div>)
}
    

export default AddProduct 