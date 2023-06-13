import { Button, Card, Col, Container, Row } from "react-bootstrap"
import image from "../assets/default_profile.jpg"

const CategoryView=({category,deleteCat})=>{
    const imageStyle={
        width:"100px",
        height:"100px",
        objectFit: "border"
    }
    const deleteCategory=(categoryId)=>{
        deleteCat(categoryId)

    }
    return(
        <div className="mb-3">
           <Card className="border border-bottom shadow-sm">
                <Card.Body>
                   <Row className="align-items-center">
                    <Col md={2} className="text-center">
                        <img src={(category.coverImage ? (category.coverImage.startsWith("http")?category.coverImage:image): image)}  className="rounded" style={imageStyle} alt="" />

                    </Col>
                    <Col md={10}>
                    <h5>{category.title}</h5>
                    <p>{category.description}</p>
                    <Container className="text-center ">
                        <Button size="sm" variant="warning">View</Button>
                        <Button size="sm" variant="success ms-2">Update</Button>
                        <Button size="sm" variant="danger ms-2" onClick={(event)=>deleteCategory(category.categoryId)}>Delete</Button>
                    </Container>
                    </Col>
                   </Row>
                </Card.Body>
            </Card>
        </div>
    )
}

export default CategoryView