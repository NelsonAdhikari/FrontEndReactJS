import { useState } from "react"
import { Card, Container, FormGroup, Form, Button, Spinner} from "react-bootstrap"
import { toast } from "react-toastify"
import { addCategory } from "../../services/CategoryService"


const AddCategory=()=>{
    const [category,setCategory]=useState({
        title:'',
        description: '',
        coverImage: ''
    })
    const [loading,setLoading]=useState(false)
    const handleFieldChange=(event,property)=>{
        event.preventDefault()
        setCategory({
            ...category,
            [property]:event.target.value
        })

    }

    const handleFormSubmit=(event)=>{
        event.preventDefault()
        console.log(category)
        if(category.title==undefined || category.title.trim()===''){
            toast.error("Category Title Required !!!")
            return

        }
        if(category.description==undefined || category.description.trim()===''){
            toast.error("Category Description Required !!!")
            return

        }
        //call server api to app category
        setLoading(true)
        addCategory(category)
        .then((data)=>{
            //success
            toast.success("Category Added Successfully")
            console.log(data)
            setCategory({
                title:'',
                description: '',
                coverImage: ''
            })
        })
        .catch(error=>{
            console.log(error)
            toast.error("Error in Category Adding!")
        })
            .finally(()=>{
                setLoading(false)
            })

    }
    const clearForm=(event)=>{
        event.preventDefault()
        setCategory({
            title:'',
            description:'',
            coverImage: ''
        })
    }
    return(
        <>
            <Container fluid>

                <Card className="border border-0 shadow">

                    {/* {JSON.stringify(category)} */}
                    <Card.Body>
                        <h5>Add Category</h5>

                        <Form onSubmit={handleFormSubmit}>
                            <FormGroup className="mt-3">
                                <Form.Label>Category Title</Form.Label>
                                <Form.Control type="text"
                                placeholder="Enter Here"
                                onChange={(event)=>handleFieldChange(event,'title')}
                                value={category.title}
                                />  
                            </FormGroup>
                            <FormGroup className="mt-3">
                                <Form.Label>Category Description</Form.Label>
                                <Form.Control rows={6} as={'textarea'}
                                placeholder="Enter description Here"
                                onChange={(event)=>handleFieldChange(event,'description')}
                                value={category.description}
                                />
                            </FormGroup>
                            <FormGroup className="mt-3">
                                <Form.Label>Category Cover Image Url</Form.Label>
                                <Form.Control type="text"
                                placeholder="Enter Here"
                                onChange={(event)=>handleFieldChange(event,'coverImage')}
                                value={category.coverImage}
                                />  
                            </FormGroup>
                            <Container className="text-center mt-2">
                                <Button type="submit" variant="success mt-2" size="sm"
                                disabled={loading}
                                >
                                    <Spinner 
                                     variant={'border'}
                                     size={'sm'}
                                     className='me-2'
                                     hidden={!loading}
                                    />
                                    <span hidden={!loading}>Please Wait!!</span>
                                    <span hidden={loading}>Add Category</span>
                                    </Button>
                                <Button onClick={clearForm} variant="danger ms-2 mt-2" size="sm">Clear</Button>


                            </Container>
                        </Form>
                    </Card.Body> 
                </Card>

            </Container>
        </>
    )
}

export default AddCategory