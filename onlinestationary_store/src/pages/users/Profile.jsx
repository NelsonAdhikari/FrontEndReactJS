import { Col, Container, Row } from "react-bootstrap";
import UserProfileView from "../../components/users/UserProfileView";


const Profile=()=>{
    
    return (
        <div>
           <Container mt-3>
                <Row>
                    <Col md={
                        {
                            span:8,
                            offset:2
                        }
                    }>
                <UserProfileView 
                user={
                    {
                    name:"Nelson Adhikari",
                    email:"adhikarinelson@gmail.com",
                    gender:'MALE',
                    about: "I am learning react JS",
                    roles:[{roleName:"Admin"},{roleName:'NORMAL'}]
                }
            }
            />
                    </Col>
                </Row>
           </Container>
        </div>
    )
}

export default Profile;