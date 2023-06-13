import { useEffect, useState } from "react"
import CategoryView from "../../components/CategoryView"
import {deleteCategory,getCategories, updateCategory} from "../../services/CategoryService"
import { toast } from "react-toastify"
import Swal from "sweetalert2"
import { Container, Spinner, Modal, Button, Form, FormGroup } from "react-bootstrap"

const ViewCategories=()=>{

    const [categories,setCategories]=useState({
        content:[]
    })

    const [selectedCategory,setSelectedCategory]=useState(undefined)

    const [loading,setLoading] = useState(false)
//view modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
//update modal
    const [showUpdate, setShowUpdate] = useState(false);
    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = () => setShowUpdate(true);


    useEffect(()=>{
        setLoading(true)
        getCategories()
        .then(data=>{
            console.log(data)
            setCategories(data)
        })
        .catch(error=>{
            console.log(error)
            toast.error("Error loading Category")
        })
        .finally(()=>{
            setLoading(false)
        })
    }, [])
        //delete category main function
        const deleteCategoryMain=(categoryId)=>{
            // alert(categoryId)
    

        //sweet alert:

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to see this category!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                //call api
              deleteCategory(categoryId)
              .then(data=>{
                //api call
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  )

                  const newArray=categories.content.filter((c)=>{
                    return c.categoryId!=categoryId
                  })
                  setCategories({
                    ...categories,
                    content: newArray
                  })
              })
              .catch(error=>{
                console.log(error)
                toast.error("Error in deleting category")
              })
            }
          })
        }

        //handle view  button of category
          const handleView =(category)=>{
                // alert("view button clicked")
                setSelectedCategory(category)
                handleShow()
          }
        //handle update of category
        const handleUpdate = (category)=>{
          setSelectedCategory(category)
               handleShowUpdate()
        }
          // update Category to server
        const updateCategoryClicked =(event)=>{
          event.preventDefault()
          if(selectedCategory.title==undefined ||selectedCategory.title.trim()==='')
          {
            toast.error("Title Required !!")
            return
          }
          if(selectedCategory.description==undefined ||selectedCategory.description.trim()==='')
          {
            toast.error("Description Required !!")
            return
          }
          if(selectedCategory.coverImage==undefined ||selectedCategory.coverImage.trim()==='')
          {
            toast.error("Image Url Required !!")
            return
          }
          updateCategory(selectedCategory)
          .then(data=>{
              console.log(data)
              toast.success("Category Updated")
          })
          .catch(error=>{
            console.log(error)
            toast.error("Failed to Update Category")
          })

        }

        // modal view: view and update
        const ModalView = ()=>{
          return (
            <>
            
      
            <Modal animation={false} show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                
                <Modal.Title>{selectedCategory.title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <Container>
                  <img style={{
                    width:'100%',
                    height: '250px',
                    objectFit:'contain'
                  }} src={selectedCategory.coverImage} alt="" />
                </Container>

                <div className="mt-3">{selectedCategory.description}</div>
                </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
               
              </Modal.Footer>
            </Modal>
          </>
          )
        }

        //update Modal
        const modalUpdate = ()=>{
          return (
            <>
            
      
            <Modal animation={false} show={showUpdate} onHide={handleCloseUpdate}>
              <Modal.Header closeButton>
                
                <Modal.Title>{selectedCategory.title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
           <Form>
            <FormGroup>
              <Form.Label>Category Title</Form.Label>
              <Form.Control 
              type="text" 
              placeholder="Enter here"
              value={selectedCategory.title}
              onChange={(event)=>setSelectedCategory({
                ...selectedCategory,
                title:event.target.value
              })}
              />
            </FormGroup>
            <FormGroup className="mt-3">
              <Form.Label>Category Description</Form.Label>
              <Form.Control as={'textarea'}
              
              value={selectedCategory.description}
              rows={6}
              onChange={(event)=>setSelectedCategory({
                ...selectedCategory,
                description:event.target.value
              })}
              />
            </FormGroup>
            <FormGroup>
              <Container className="py-3" >
                <img src={selectedCategory.coverImage} className="img-fluid" alt="" />
              </Container>
              <Form.Label>Category Cover Image Url</Form.Label>
              <Form.Control 
              type="text" 
              placeholder="Enter here"
              value={selectedCategory.coverImage}
              onChange={(event)=>setSelectedCategory({
                ...selectedCategory,
                coverImage:event.target.value
              })}
              />
            </FormGroup>
           </Form>
                </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseUpdate}>
                  Close
                </Button>
                <Button  variant="info" onClick={updateCategoryClicked}>
                  Save
                </Button>
               
              </Modal.Footer>
            </Modal>
          </>
          )
        }

    return (<div>

              {/* {loader} */}
              <Container className="text-center p-3" hidden={!loading}>
                <Spinner/>
                <div>
                 <h3>Loading...</h3> 
                  </div>
              </Container>
      {
        (categories.content.length>0 ?  
          (
          <>
          {
            categories.content.map((category)=>{
               return( 
               <CategoryView 
               viewCat={handleView}
               updateCat={handleUpdate}
               deleteCat={deleteCategoryMain} 
               category={category} 
               key={category.categoryId}
               /> )
            })
          }
        </>
          ) : <h5 className="text-center">No Category Found !!</h5>)
      }

      {
       selectedCategory ? ModalView() : ''
      }
      {
        selectedCategory ? modalUpdate() : '' 
      }
    </div>)
}

export default ViewCategories