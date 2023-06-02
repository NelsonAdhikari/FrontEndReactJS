import React, { useState, useContext } from 'react';
import { Alert, Button, Card, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { NavLink, redirect, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser } from '../services/user.service';
import UserContext from '../context/UserContext';
import Base from '../components/Base';
import logo from '../assets/StationaryLogo.png';




const Login = () => {
  let redirect= useNavigate();
  const userContext=useContext(UserContext);

  const [data, setData] = useState({
    email: '',
    password: ''
  });

  let [error, setError] = useState({
    errorData: null,
    isError: false
  });

  
 const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleChange = (event, property) => {
    setData({
      ...data,
      [property]: event.target.value
    });
  };

  const handleReset = () => {
    setData({
      email: '',
      password: ''
    });

    setError({
      errorData: null,
      isError: false
    });

    setLoading(false);
  };

  const submitForm = (event) => {
    event.preventDefault();
    console.log(data)

    //client side validations

    if (data.email === undefined || data.email.trim() === '') {
      toast.error('Email Required!!');
      return;
    }

    if (data.password === undefined || data.password.trim() === '') {
      toast.error('Password Required!!');
      return;
    }

    //login api 

    setLoading(true)
    loginUser(data)
      .then((data) => {
        console.log(data)
        toast.success("Logged In")
        navigate("/users/home");
        setError({
          errorData: null,
          isError: false
        })

        userContext.isLogin(true)
        userContext.setUserData(data)
        redirect("/users/home")
      })
      .catch((error) => {
        console.log(error);
        // toast.error(error.response.data.message)
        
        setError({
          errorData: error,
          isError: true
        });
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const loginForm = () => {
    return (
      <Container>
       
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <Card className="my-3 border-0 shadow">
              <Card.Body>
              {/* {JSON.stringify(UserContext)} */}
                <Container className="text-center mb-3">
                  <img src={logo} alt="Store logo" width={80} height={80} />
                </Container>
                <h3 className="text-center text-uppercase">StationaryStore Login</h3>

                <Alert
                  onClose={() =>
                    setError({
                      isError: false,
                      errorData: null
                    })
                  }
                  dismissible
                  variant="danger"
                  show={error.isError}
                >
                  <p>{error.errorData?.response?.data?.message}</p>
                </Alert>

                <Form noValidate onSubmit={submitForm}>
                  <Form.Group className="mb-3">
                    <Form.Label>Enter your Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your Email here"
                      onChange={(event) => handleChange(event, 'email')}
                      value={data.email}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Enter your Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your Password"
                      onChange={(event) => handleChange(event, 'password')}
                      value={data.password}
                    />
                  </Form.Group>

                  <Container className="text-center">
                    <p>If not registered! <NavLink to="/register">SignUp</NavLink></p>
                  </Container>

                  <Container className="text-center">
                    <Button type="submit" className="" variant="success" disabled={loading}>
                      <Spinner
                        animation="border"
                        size="sm"
                        hidden={!loading}
                        className={"me-2"}
                      />
                      <span hidden={!loading}>Please wait...</span>
                      <span hidden={loading}>Login</span>
                    </Button>
                    <Button onClick={handleReset} className="ms-2" variant="danger">
                      Reset
                    </Button>
                  </Container>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }

  return (
    <Base title="StationeryStore / Login" description="Login for purchasing products.">
      {loginForm()}
    </Base>
  )
}

export default Login;
