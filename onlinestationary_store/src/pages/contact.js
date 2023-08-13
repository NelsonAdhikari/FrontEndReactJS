import Base from "../components/Base";
import { contactForm } from "./HomePageComponents";
import { BiMailSend, BiPhoneCall, BiSupport} from "react-icons/bi";
import {FaGithub} from "react-icons/fa"
import ContactUs from "../assets/Contact.jpeg"
import { Card } from "react-bootstrap";

const Contact=()=>{
    return (
       <Base
       title="StationeryStore / Contact Us" description={null}
       >
    <div className="row contactus ">
    <div className="col-md-5 ">
          <img className="mt-4 ms-4"
            src={ContactUs}
            style={{ width: "100%",height:"93%" }}
          />
        </div>
        <div className="col-md-6">
          <Card className="mt-4 ms-5">
            <Card.Body>
            <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
            <p className="text-justify mt-2">
            Any query about product info feel free to call anytime we are 24X7
            available
          </p>
          <p className="mt-3">
            <BiMailSend /> : adhikarinelson0@gmail.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : +977-9808490677
          </p>
          <p className="mt-3">
            <FaGithub /> : https://github.com/NelsonAdhikari
          </p>
          <p className="mt-3">
            <BiSupport /> : 1800-0000-0000 (toll free)
          </p>
            </Card.Body>
          </Card>
          </div>
    </div>
    <br />
    <br />
    <br />

      {/* <div className="my-5">{contactForm()}</div>       */}
       </Base>
    );
};

export default Contact;