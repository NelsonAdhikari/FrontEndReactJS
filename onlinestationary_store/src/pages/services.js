import { Card, Col, Container, Row } from "react-bootstrap";
import Base from "../components/Base";
import Consumables from "../assets/Consumables.jpg"
import DesktopOrganisers from "../assets/DesktopOrganizers.jpg"
import DrawingIn from "../assets/DrawIn.jpg"
import Filing from "../assets/Filing.jpg"
function Services(){
    return (
        <Base
        title="Services We offer"
        description="A Pencil A Day Helps You Work, Rest And Play."
        buttonEnabled={true}
        buttonLink="/"
        buttonType="warning"
        buttonText="Home"
        >
            <h1 className="text-center mt-2">Service Page</h1>
            <p className="text-center">We offer some best deal for best service.</p>
            <div className="row aboutsus ">
            <div className="col-md-3">
        <Card className="mt-3 ms-5">
            <Card.Body>
            <img src={Consumables} style={{width:"100%"}} />
            <h4 className="text-center mt-2">Consumables</h4>
            </Card.Body>
          </Card>
          </div>   
          <div className="col-md-3">
        <Card className="mt-3 ms-5">
            <Card.Body>
            <img src={DesktopOrganisers} style={{width:"100%"}} />
            <h4 className="text-center mt-4">Desktop Organisers</h4>
            </Card.Body>
          </Card>
          </div>    
          <div className="col-md-3">
        <Card className="mt-3 ms-5">
            <Card.Body>
            <img src={Filing} style={{width:"100%"}} />
            <h4 className="text-center mt-4">Filing and Storage</h4>
            </Card.Body>
          </Card>
          </div>  
          <div className="col-md-3">
        <Card className="mt-3 ms-5 me-3">
            <Card.Body>
            <img src={DrawingIn} style={{width:"100%"}} />
            <h4 className="text-center mt-4">Draw Instruments</h4>
            </Card.Body>
          </Card>
          </div>  
            </div>
          <br />
          <br />
          <br />
          <br />
          <br />


        </Base>
    );
  
}
export default Services;