import { Button, Card, Col, Container, Form, Pagination, Row, Table } from "react-bootstrap"

const ViewProducts=()=>{
    return(
        <>
            <Container>
                <Row>
                    <Col>

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
                            <th>#SN</th>
                            <th>Title</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Discounted Price</th>
                            <th>Live</th>
                            <th>Stock</th>
                            <th>Category</th>
                            <th>Added Date</th>
                            <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>#1</td>
                                <td>A4</td>
                                <td>12</td>
                                <td>600</td>
                                <td>550</td>
                                <td>True</td>
                                <td>True</td>
                                <td>Consumables</td>
                                <td>26 Jun</td>
                                <td>
                                    <Button  variant="danger"  size="sm">Delete</Button>
                                    <Button className=" ms-2" variant="warning" size="sm">View</Button>
                                    <Button className="ms-2" variant="success" size="sm">Update</Button>
                                </td>
                            </tr>   
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
                   
                    </Col>

                </Row>
            </Container>
        </>
    )
}

export default ViewProducts