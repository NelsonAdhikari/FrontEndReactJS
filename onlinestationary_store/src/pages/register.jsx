import { Container, Row ,Col, Card, Button, Spinner} from "react-bootstrap";
import Base from "../components/Base"
import { Form } from "react-bootstrap";
import logo from "../assets/StationaryLogo.png";
import { useState } from "react";
import { toast } from "react-toastify";
import { registerUser } from "../services/user.service";
import { useNavigate } from "react-router-dom";


const Register=()=>{
 let[data,setData]=useState({
      name:'',
      email:'',
      password:'',
      confirmPassword:'',
      about:'',
      gender:'', 
 })

 const navigate = useNavigate();

 const handleChange=(event,property)=>{
  // console.log(event)
  // console.log(property)
  setData({
    ...data,
    [property]:event.target.value
  });
 };
 const [Loading,setLoading]=useState(false)

 const [errorData,setErrorData]=useState({
  isError:false,
  errorData:null
})
console.log(data);

 const clearData=()=>{
    setData({
        name:'',
        email:'',
        password:'',
        confirmPassword:'',
        about:'',
        gender:'', 
    })
    setErrorData({
      errorData:null,
      isError:false
    })

 }

 
// do signup function
 const submitForm=(event)=>{
        event.preventDefault();
        console.log(data)

        // validate client side
        if(data.name==undefined || data.name.trim()=='' ){
          toast.error("Name is required !!")
          return 
        }

        if(data.email==undefined || data.email.trim()=='' ){
          toast.error("Email is required !!")
          return 
        }

        if(data.password==undefined || data.password.trim()=='' ){
          toast.error("Password is required !!")
          return 
        }

        if(data.confirmPassword==undefined || data.confirmPassword.trim()=='' ){
          toast.error("Confirm Password is required !!")
          return 
        }
        if(data.password!=data.confirmPassword){
          toast.error("Password and Confirm Password not matched !!")
          return
        }

        //all right
        // call api
        setLoading(true)
        registerUser(data)
        .then(userData=>{
          // success handler
              console.log(userData)
              toast.success("Registration Successful !!");
              navigate("/login");
              clearData();
        })
        .catch(error=>{
          // error handler
          console.log(error);
          setErrorData({
            isError:true,
            errorData:error
          })
              toast.error("Registration Failed !!")
        })
        .finally(()=>{
          setLoading(false)
 })
 
 }
  const registerForm=()=>{
    return (
      <Container className="">
      
        <Row>
          {/* {JSON.stringify(data)} */}
       
          <Col sm={{span:8,offset:2}} >
            <Card className="my-3 border-0 shadow p-4">
              <Card.Body>
                <Container className="text-center mb-3">
                <img src={logo} alt="Store logo" width={80} height={80} />
                </Container>
                <h3 className="mb-4 text-center text-uppercase">StationeryStore SignUp Here</h3>
                
                <Form noValidate onSubmit={submitForm}>
                  <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Enter your Name</Form.Label>
                  <Form.Control 
                  type="text" 
                  placeholder="Enter your Name here"
                  onChange={(event)=>handleChange(event,'name')}
                  value={data.name}
                  isInvalid={errorData.errorData?.response?.data?.name}
                  />
                  <Form.Control.Feedback type="invalid">{errorData.errorData?.response?.data?.name}</Form.Control.Feedback>
                 
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Enter your Email</Form.Label>
                  <Form.Control
                   type="email" 
                   placeholder="Enter your Email address"
                   onChange={(event)=>handleChange(event,'email')}
                  value={data.email}
                  isInvalid={errorData.errorData?.response?.data?.email}

                   />
                    <Form.Control.Feedback type="invalid">{errorData.errorData?.response?.data?.email}</Form.Control.Feedback>
                 
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Enter new password</Form.Label>
                  <Form.Control 
                  type="password" 
                  placeholder="Enter your password" 
                  onChange={(event)=>handleChange(event,'password')}
                  value={data.password}
                  isInvalid={errorData.errorData?.response?.data?.password}

                  />
                  <Form.Control.Feedback type="invalid">{errorData.errorData?.response?.data?.password}</Form.Control.Feedback>

                  </Form.Group>
                    {/* confirm password */}
                  <Form.Group className="mb-3" controlId="formConfirmPassword">
                  <Form.Label>Re-Enter your password</Form.Label>
                  <Form.Control 
                  type="password" 
                  placeholder="Re-Enter your password"
                  onChange={(event)=>handleChange(event,'confirmPassword')}
                  value={data.confirmPassword}

                   />
                 
                  </Form.Group>
                  {/* gender radio buttons */}
                  <Form.Group className="mb-3">
                    <Form.Label>Select Gender</Form.Label>
                 <div>
                 <Form.Check
                     inline
                     name="gender" 
                     label="Male"                     
                     type={'radio'}
                     id={`gender`}
                     value={'male'}
                     onChange={(event)=>handleChange(event,'gender')}
                    checked={data.gender=='male'}
                     

          />
                 <Form.Check
                     inline
                     name="gender" 
                     label="Female"                   
                     type={'radio'}
                     id={`gender`}
                     value={'female'}
                     onChange={(event)=>handleChange(event,'gender')}
                     checked={data.gender=='female'}


          />
                 </div>
                  </Form.Group>
                  {/* about field */}
                  <Form.Group className="mb-2">
                    <Form.Label>Write something about yourself?</Form.Label>
                      <Form.Control 
                      as={'textarea'}
                      rows="6" 
                      placeholder="Write something here"
                      onChange={(event)=>handleChange(event,'about')}
                      value={data.about}
                      isInvalid={errorData.errorData?.response?.data?.about}
                      
                      />

                  <Form.Control.Feedback type="invalid">{errorData.errorData?.response?.data?.about}</Form.Control.Feedback>


                  </Form.Group>
               
                <Container>
                  <p className="text-center">Already register ! <a href="/login">Login</a></p>
                </Container>
                <Container className="text-center">
                  <Button 
                  type="submit" 
                  className="text-uppercase"  
                  variant="success"
                  disabled={Loading}
                  >
                    
                    <Spinner
                    animation="border"
                    size="sm"
                    className="me-2"
                    hidden={!Loading}
                    />
                   <span hidden={!Loading}>Loading!!!</span>
                   <span hidden={Loading} >Register</span> 
                   
                    
                    </Button>
                  <Button className="ms-2 text-uppercase" variant="danger" onClick={clearData}>Reset</Button>

                </Container>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        
        </Row>
      </Container>
    );
  };
    return (
           <Base
           title="StationeryStore / Signup"
           description="Fill the form below to be a member of our store! Get Access to all product checkout."
           >
              {registerForm()}
           </Base>
    );
}

export default Register;