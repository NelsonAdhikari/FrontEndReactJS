import { useContext } from "react";
import { NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { Card, Container, Row ,Col, Button} from "react-bootstrap";
import { isLoggedIn } from "../../auth/HelperAuth";
import useJwtTokenExpiration from "../../hooks/useJwtTokenExpiration";


const Dashboard=()=>{
    useJwtTokenExpiration()
    const userContext=useContext(UserContext);

    // const redirect = useNavigate()

    //private dashboard view

    const dashboardView=()=>{
        return (<div>
            {/* <h1>This is User Dashboard</h1> */}
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
        (isLoggedIn()) ? dashboardView() : <Navigate to="/login" />
     )
} 


export default Dashboard