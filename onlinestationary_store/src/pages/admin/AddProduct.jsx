import { useState } from "react"
import { Card, Container, FormGroup, Form, Button} from "react-bootstrap"
import { toast } from "react-toastify"


const AddProduct=()=>{
    const [product,setProduct]=useState({
        title:'',
        description: '',
        coverImage: ''
    })
    const handleFieldChange=(event,property)=>{
        event.preventDefault()
        setProduct({
            ...product,
            [property]:event.target.value
        })

    }

    const handleFormSubmit=(event)=>{
        event.preventDefault()
        console.log(product)
        if(product.title==undefined || product.title.trim()===''){
            toast.error("Product Title Required !!!")
            return

        }
        if(product.description==undefined || product.description.trim()===''){
            toast.error("Product Description Required !!!")
            return

        }
        //call server api to app category


    }

    return(
        <>
        <Container fluid>

            <Card className="border border-0 shadow">

                {/* {JSON.stringify(product)} */}
                <Card.Body>
                    <h5>Add Product</h5>

                    <Form onSubmit={handleFormSubmit}>
                        <FormGroup className="mt-3">
                            <Form.Label>Product Title</Form.Label>
                            <Form.Control type="text"
                            placeholder="Enter Here"
                            onChange={(event)=>handleFieldChange(event,'title')}
                            value={product.title}
                            />  
                        </FormGroup>
                        <FormGroup className="mt-3">
                            <Form.Label>Product Description</Form.Label>
                            <Form.Control rows={6} as={'textarea'}
                            placeholder="Enter description Here"
                            onChange={(event)=>handleFieldChange(event,'description')}
                            value={product.description}
                            />
                        </FormGroup>
                        <FormGroup className="mt-3">
                            <Form.Label>Product Cover Image Url</Form.Label>
                            <Form.Control type="text"
                            placeholder="Enter Here"
                            onChange={(event)=>handleFieldChange(event,'coverImage')}
                            value={product.coverImage}
                            />  
                        </FormGroup>
                        <Container className="text-center mt-2">
                            <Button type="submit" variant="success mt-2" size="sm">Add Product</Button>
                            <Button variant="danger ms-2 mt-2" size="sm">Clear</Button>


                        </Container>
                    </Form>
                </Card.Body>
            </Card>

        </Container>
    </>
    )
}

export default AddProduct ; 