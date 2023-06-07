import { Alert, Col, Container, Row , Modal,Button, Card, Table,Form, Spinner} from "react-bootstrap";
import UserProfileView from "../../components/users/UserProfileView";
import UserContext from "../../context/UserContext";
import { useContext, useEffect, useState } from "react";
import { getUser, updateUser, updateUserProfilePicture } from "../../services/user.service";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import defaultImage from '../../assets/default_profile.jpg';



const Profile=()=>{
    const userContext = useContext(UserContext)
    const { userId }=useParams()
    const [user,setUser]=useState(null)

    //state to handle image
        const [image,setImage] = useState({
            placeholder:defaultImage,
            file: null
        })

    //modals state
    const [show, setShow] = useState(false);

    const [updateLoading,setUpdateLoading]=useState(false);

    const handleClose = () => setShow(false);
    const handleShowModal = () => 
    {
        console.log("modal display");
        setShow(true)
    };
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

    const updateFieldHandler=(event,property)=>{
        setUser({
            ...user,
            [property]:event.target.value
        })
    }
    //update user data by calling API

    const updateUserData=()=>{
        console.log("update check of user data")
        if(user.name===undefined || user.name.trim()===''){
            toast.error("username required !!")
            return
        }  
      
        if(user.about===undefined || user.about.trim()===''){
            toast.error("about required !!")
            return
        }  
        setUpdateLoading(true)

        updateUser(user).then(updatedUser=>{
            console.log(updatedUser)
            toast.success("User details Updated!!")
            //update image:
            if(image.file==null){
                setUpdateLoading(false)
                handleClose()
                return
            }
            updateUserProfilePicture(image.file,user.userId)
            .then(data=>{
                console.log(data)
                toast.success(data.message)
                handleClose()
                
            })
            .catch(error=>{
                console.log(error);
                toast.error("Image not Uploaded!!")
            })
            .finally(()=>{
                setUpdateLoading(false)
            })

            // handleClose()
        })
        .catch(error=>{
            console.log(error)
            toast.error("Error! Update Failed")
            setUpdateLoading(false)
        })
       
    }

    //function for image change 
     const handleProfileImageChange=(event)=>{
        // const localfile=event.target.files[0]
        console.log(event.target.files[0])
        if(event.target.files[0].type==='image/png'|| event.target.files[0].type==='image/jpeg'){
            //preview show
            const reader = new FileReader()
            reader.onload = (r)=>{
                setImage({
                    placeholder:r.target.result,
                    file:event.target.files[0]
                })
                console.log(r.target.result)
                
            }
            reader.readAsDataURL(event.target.files[0])
        }else{
            toast.error("Invalid File Type!!")
            image.file= null
        }

     }

    //update view
    const updateViewModal = () => {
        return (
            <div>
                <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update your Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                 <Card className="m-3 border-0 shadow-sm ">
                            <Card.Body>
                            <Table className="text-center" responsive striped bordered hover variant="info" >
                            <tbody>
                                <tr>
                                    <td>
                                        Profile Image
                                    </td>
                                    <td>
                                        {/* {image tag for preview} */}
                                      <Container className="text-center mb-3">
                                      <img style={{objectFit:'cover'}} height={200} width={200} src={image.placeholder} alt="" />
                                      </Container>
                                        <Form.Control type='file' onChange={handleProfileImageChange} />
                                        <p className="text-center mt-2 ">Select your image Here!</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Name</td>
                                    <td>
                                        <Form.Control 
                                        className="text-center" type="text" 
                                        value={user.name}
                                        onChange={(event)=>updateFieldHandler(event,'name')}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>{user.email}</td>
                                </tr>
                                <tr>
                                    <td>New Password</td>
                                    <td>
                                        <Form.Control
                                         placeholder="Enter new Password" 
                                         type="password"
                                         onChange={(event)=>updateFieldHandler(event,'password')}
                                         />  
                                         <p>Leave blank for same password</p>  
                                    </td>
                                </tr>
                                <tr>
                                    <td>Gender</td>
                                    <td>{user.gender}</td>
                                </tr>
                                <tr>
                                    <td>About</td>
                                    <td>
                                        <Form.Control as={'textarea'} value={user.about} rows={8}
                                            onChange={(event)=>updateFieldHandler(event,'about')}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Roles</td>
                                    <td>{user.roles.map(role=><div key={role.roleId}>{role.roleName}</div>)}</td>
                                </tr>
                            </tbody>
                        </Table>
                            </Card.Body>
                        </Card>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updateUserData} disabled={updateLoading}>
            <Spinner 
            size="sm"
            hidden={!updateLoading}
            className={'me-2'}
            />
            <span hidden={!updateLoading}>Checking!!</span>
           <span hidden={updateLoading}> Save Changes</span>
          </Button>
        </Modal.Footer>
      </Modal>
            </div>
        )
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
                        <>
                         
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
                       handleShowModal={handleShowModal}
                    />
                        { updateViewModal() }
                     </>
                        
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