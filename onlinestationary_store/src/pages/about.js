import { Card, Container } from "react-bootstrap";
import Base from "../components/Base";


function About(){
    return (
        <Base
        title="StationaryStore / About Us" description={null}>
            <h1 className=" text-center mt-2" > About Page </h1>
            <div className="row aboutsus ">
            <div className="col-md-4">
          <Card className="mt-4 ms-5">
            <Card.Body>
            <h3 className="text-center">WHO WE ARE</h3>
            <p>
                We are Newly Ecommerce Platform Online Stationary Store ready to serve you all kind of stationary items
                available for ur everyday use. We offer you best offer price and all details of products that are available 
                for purchase.
            </p>
            </Card.Body>
          </Card>
          </div>
          <div className="col-md-4">
          <Card className="mt-4 ms-5">
            <Card.Body>
            <h3 className="text-center" >OUR GOALS</h3>
            <p>
               We proudly ensure you the valuable products with valuable deals our main motive is to remove physical
               store and bulky supply of products and letting only to purchase if it is in stock and 24 hrs delivery
               service.
            </p>
            </Card.Body>
          </Card>
          </div>
          <div className="col-md-4">
          <Card className="mt-4 ms-5 me-4">
            <Card.Body>
            <h3 className="text-center" >OUR SERVICES</h3>
            <p>
               We have divide our services in various categories of products Desktop Organisers, Filing and Storage, 
               Consumables and Drawing Instruments for  product  to  purchase and satisfaction. 
            </p>
            </Card.Body>
          </Card>
          </div>
          </div>
        
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

        </Base>
    );
  
}
export default About;