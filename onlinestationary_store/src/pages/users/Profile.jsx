import { Alert, Col, Container, Row } from "react-bootstrap";
import UserProfileView from "../../components/users/UserProfileView";
import UserContext from "../../context/UserContext";
import { useContext, useEffect, useState } from "react";
import { getUser } from "../../services/user.service";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";



const Profile=()=>{
    const userContext = useContext(UserContext)

    const { userId }=useParams()

    const [user,setUser]=useState(null)

    useEffect(() => {
        // console.log("data from url userId" +userId )
        
        // if(userContext.userData){
        //    getUserDataFromServer()
        // }
        getUserDataFromServer()

    },[])

    const getUserDataFromServer = () =>{
        //api call

       console.log(userContext)
        
        getUser(userId)
            .then(data => {
                console.log(data)
                setUser(data)
        })
            .catch(error => {
                console.log(error)
                setUser(null)
                toast.error("Error loading info from server !")
        })

    }
    return (
        <div>
           <Container className="mt-3">
                <Row>
                    <Col md={
                        {
                            span:8,
                            offset:2
                        }
                    }>
                       { (user ? (
                            <UserProfileView 
                       user={
                        //  {
                        //     name:"Nelson Adhikari",
                        //     email:"adhikarinelson@gmail.com",
                        //     gender:'MALE',
                        //     about: "I am learning react JS",
                        //     roles:[{roleId:1,roleName:"Admin"},{roleId:2,roleName:'NORMAL'}]
                        //  } 
                        user
                       }
                    />
                        ):<Alert variant="danger"><h3 className="text-center text-uppercase m-2">User not loaded from server</h3></Alert>)
                    }
                     {/* {userContext.userData?.user?.userId} */}
                    </Col>
                </Row>
           </Container>
        </div>
    )
}

export default Profile