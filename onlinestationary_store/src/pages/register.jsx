import { Container, Row ,Col, Card, Button} from "react-bootstrap";
import Base from "../components/Base"
import { Form } from "react-bootstrap";
import logo from "../assets/StationaryLogo.png";
import { useState } from "react";
const Register=()=>{
 let[data,setData]=useState({
      name:'',
      email:'',
      password:'',
      confirmPassword:'',
      about:'',
      gender:'', 
 })

 const handleChange=(event,property)=>{
  // console.log(event)
  // console.log(property)
  setData({
    ...data,
    [property]:event.target.value
  })
 }

  const registerForm=()=>{
    return (
      <Container>
      
        <Row>
          {JSON.stringify(data)}
       
          <Col sm={{span:8,offset:2}} >
            <Card className="my-3 border-0 shadow p-4">
              <Card.Body>
                <Container className="text-center mb-3">
                <img src={logo} alt="Store logo" width={80} height={80} />
                </Container>
                <h3 className="mb-4 text-center text-uppercase">StationeryStore SignUp Here</h3>
                <Form>
                  <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Enter your Name</Form.Label>
                  <Form.Control 
                  type="text" 
                  placeholder="Enter your Name here"
                  onChange={(event)=>handleChange(event,'name')}
                  />
                 
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Enter your Email</Form.Label>
                  <Form.Control
                   type="email" 
                   placeholder="Enter your Email address"
                   onChange={(event)=>handleChange(event,'email')}
                   />
                 
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Enter new password</Form.Label>
                  <Form.Control 
                  type="password" 
                  placeholder="Enter your password" 
                  onChange={(event)=>handleChange(event,'password')}
                  />
                 
                  </Form.Group>
                    {/* confirm password */}
                  <Form.Group className="mb-3" controlId="formConfirmPassword">
                  <Form.Label>Re-Enter your password</Form.Label>
                  <Form.Control 
                  type="password" 
                  placeholder="Re-Enter your password"
                  onChange={(event)=>handleChange(event,'confirmPassword')}

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
                     onChange={(event)=>handleChange(event,'gender')}

          />
                 <Form.Check
                     inline
                     name="gender" 
                     label="Female"                   
                     type={'radio'}
                     id={`gender`}
                     onChange={(event)=>handleChange(event,'gender')}

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
                      
                      />
                  </Form.Group>
                </Form>
                <Container>
                  <p className="text-center">Already register ! <a href="">Login</a></p>
                </Container>
                <Container className="text-center">
                  <Button className="text-uppercase"  variant="success">Register</Button>
                  <Button className="ms-2 text-uppercase" variant="danger">Reset</Button>

                </Container>
              </Card.Body>
            </Card>
          </Col>
        
        </Row>
      </Container>
    );
  }
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