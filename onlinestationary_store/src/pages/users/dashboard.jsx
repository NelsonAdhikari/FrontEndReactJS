import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import UserContext from "../../context/user.context";
import { Card, Container, Row ,Col, Button} from "react-bootstrap";

const Dashboard=()=>{
    const userContext=useContext(UserContext);

    //private dashboard view

    const dashboardView=()=>{
        return (<div>
            <h1>This is User Dashboard</h1>
            <Outlet/>
        </div>)
      
    
    }
    //not logged in  view
    const notLoggedInView=()=>{
        return(
            <Container>
                <Row>
                    <Col md={{
                        span:8,
                        offset:2
                    }}>
                        <Card className="border-0 shadow mt-3">
                            <Card.Body className="text-center">
                                <h3>You are not Logged In !!</h3>
                                <p>Please Login to access the page</p>
                                <Button as={NavLink} to="/login" variant="success">Login Now</Button>

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }

    // {/*nested route components */}


    return(
        (userContext.isLogin) ? dashboardView() : notLoggedInView()
     )
} 


export default Dashboard