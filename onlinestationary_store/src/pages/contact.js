import Base from "../components/Base";
import { contactForm } from "./HomePageComponents";

const Contact=()=>{
    return (
       <Base
       title="StationeryStore / Contact Us" description={null}
       >
      <div className="my-5">{contactForm()}</div>      
       </Base>
    );
};

export default Contact;