import { Button, Card, Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import {MdProductionQuantityLimits} from "react-icons/md"
import {TbCategory} from "react-icons/tb"
import {BsBorderStyle} from "react-icons/bs"
import {FaUsers} from "react-icons/fa"
import DashboardCardView from "../../components/DashboardCardView"
const AdminHome=()=>{
    return(
        <Container>
            <Row>
                <Col md={
                    {
                        span:6,
                        offset:3
                    }
                }>
                <Card className="shadow-sm">
                    <Card.Body className="text-center">
                        <h3 className="text-center">Welcome To Admin Dashboard</h3>
                        <p className="text-muted">You can Now ADD, EDIT, UPDATE AND DELETE Products and Categories also manage Orders and Users from here.</p>
                    <Container className="d-grid gap-3">
                    <Button variant="secondary" as={Link} to={'/admin/products'}>Manage Products</Button>
                    <Button variant="success" className="ms-2" as={Link} to={'/admin/categories'}>Manage Categories</Button>
                    <Button variant="warning" className="ms-2" as={Link} to={'/admin/orders'}>Manage Orders</Button>
                    <Button variant="danger" className="ms-2" as={Link} to={'/admin/users'}>Manage Users</Button>
                    </Container>


                    </Card.Body>
                </Card>
                </Col>
            </Row>
            <Row className="mt-5">
                <Col md={6}>
                <DashboardCardView
                      icon={<MdProductionQuantityLimits size={80}/>}
                      text={'No.of Products'}
                      number={23423} 
                    />

                   
                </Col>
                <Col md={6}>
                    
                    <DashboardCardView
                      icon={<TbCategory size={80}/>}
                      text={'No.of Categories'}
                      number={15} 
                    />
                </Col>
                <Col md={6} className="mt-3">
                <DashboardCardView
                      icon={<BsBorderStyle size={80}/>}
                      text={'No.of Orders'}
                      number={4545} 
                    />
                </Col>
                <Col md={6} className="mt-3">
                    <DashboardCardView
                      icon={<FaUsers size={80}/>}
                      text={'No.of Users'}
                      number={50} 
                    />
                   
                </Col>
            </Row>
          
        </Container>
    )
}

export default AdminHome