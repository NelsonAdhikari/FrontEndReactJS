import { Button, Card, Col, Container, Row, Table } from "react-bootstrap"
import { formatDate } from "../services/helper.service"
import { Link } from "react-router-dom"
import KhaltiConfig from "./khalti/KhaltiConfig";



const SingleOrderView=({
    order,
    openViewOrderModal,
    openEditOrderModal
})=>{

  
    
    return(
        <Card className="border border-0 shadow-sm mb-5">
            <Card.Body>
                <Row>
                    <Col>
                    <b>Order ID:</b>{order.orderId}
                    </Col>
                    <Col>
                   <b>Ordered By:</b><Link className="ms-2" to={`/users/profile/${order.user.userId}`}>{order.user.name}</Link>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                    <Table bordered striped className={order.paymentStatus == 'PAID'?'table-success':'table-danger'}>
                        <tbody>
                            <tr>
                                <td>Billing Name</td>
                                <td className="fw-bold">{order.billingName}</td>
                            </tr>
                            <tr>
                                <td>Billing Phone</td>
                                <td className="fw-bold">{order.billingPhone}</td>
                            </tr>
                            <tr>
                                <td>Items</td>
                                <td className="fw-bold">{order.orderItems.length}</td>
                            </tr>
                            <tr className={ order.paymentStatus==='NOTPAID'?'table-danger' : 'table-success' }>
                                <td>Payment Status</td>
                                <td className="fw-bold">{order.paymentStatus}</td>
                            </tr>
                            <tr>
                                <td>Order Status</td>
                                <td className="fw-bold">{order.orderStatus}</td>
                            </tr>
                            <tr>
                                <td>Ordered Date</td>
                                <td className="fw-bold">{formatDate(order.orderedDate)}</td>
                            </tr>
                        </tbody>
                    </Table>
                    </Col>
                </Row>
                <Container className="text-center">
                   {openEditOrderModal && <Button onClick={(event)=>openEditOrderModal(event,order)} variant="danger" size='sm' className="me-2">Update</Button> }
                   {(!openEditOrderModal && order.paymentStatus=='NOTPAID') && <Button onClick={() => KhaltiConfig(1,200,'product_name')} variant="success" size='sm' className="me-2">Pay to Complete Order</Button> }
                   
                    <Button onClick={(event)=>{
                            openViewOrderModal(event,order)
                    }} size="sm" variant="info">Order Details</Button>
                </Container>
            </Card.Body>
        </Card>
    )
}
export default SingleOrderView