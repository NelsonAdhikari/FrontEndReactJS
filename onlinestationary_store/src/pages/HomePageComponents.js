import {
  Card,
  Col,
  Container,
  Row,
  Badge,
  Button,
  Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import SingleProductCard from "../components/users/SingleProductCard";
import axios from "axios";

//  const trendingProducts = () => {
//   const [product, setProd] = useState([]);
//   useEffect(() => {
//     (async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:9090/products/featureProducts"
//         );
//         setProd(response.data);
//       } catch (error) {
//         console.log(error);
//       }
//     })();
//   }, []);

//   console.log(product);

//   return (
//     <Container>
//       <Row>
//         <h3 className="text-center">Trending Products List</h3>
//         {product?.map((product) => (
//           <Col md={4}>
//             <SingleProductCard product={product} />
//           </Col>
//         ))}
//       </Row>
//     </Container>
//   );
// };


const TrendingProducts = () => {
    const [prod, setProd] = useState([]);
  
    useEffect(() => {
      const fetchTrendingProducts = async () => {
        try {
          const response = await axios.post(
            "http://localhost:9090/products/featureProducts"
          );
          setProd(response.data.response);
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchTrendingProducts();
    }, []);
  
    return (
      <Container>
        <Row>
          <h3 className="text-center">Trending Products List</h3>
          {prod?.map((pro) => (
            <Col md={4} key={pro.id}>
              <SingleProductCard product={pro} />
            </Col>
          ))}
        </Row>
      </Container>
    );
  };
  
  export default TrendingProducts;

export const infoWithImageInRightSection = (image, title, text) => {
  return (
    <Container>
      <Row>
        <Col style={{}} className="text-center">
          <h3>{title}</h3>
          <p>{text}</p>
          <Button as={Link} to="./about">
            About
          </Button>
        </Col>
        <Col className="text-center">
          <img src={image} alt="" />
        </Col>
      </Row>
    </Container>
  );
};
export const infoWithImageInLeftSection = (image, title, text) => {
  return (
    <Container>
      <Row>
        <Col style={{}} className="text-center">
          <img src={image} alt="" />
        </Col>
        <Col className="text-center">
          <h3>{title}</h3>
          <p>{text}</p>
          <Button as={Link} to="./store">
            Store
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export const contactForm = () => {
  return (
    <Container>
      <Card>
        <Card.Body>
          <div className="text-center">
            <h3>Contact Us</h3>
          </div>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" as={Link} to={"/contact"} type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};