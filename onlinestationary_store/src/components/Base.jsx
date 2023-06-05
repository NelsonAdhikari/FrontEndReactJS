import { Button, Container} from "react-bootstrap";
import Footer from "./Footer";
import { NavLink } from "react-router-dom";


const Base=({
    title="Page Title", 
    description="Welcome to Dynamic store", 
    buttonEnabled=false,
    buttonText="Shop Now",
    buttonType='primary',
    buttonLink="/", 
    children})=>{
   
    let styleContainer={
       height:"200px"


    }
   
    return (
        <div>
            <Container fluid className="bg-danger p-5 text-white text-center d-flex justify-content-center align-items-center" style={styleContainer}>
                <div>
                <h3 className="text-center">{title}</h3>
                <p className="text-center">{description && description}</p>
               
               {buttonEnabled && <Button as={NavLink} to="/" variant={buttonType}>{buttonText}</Button>}
               </div>
            </Container>
            

            {children}

            <Footer /> 
        </div>
    )
}

export default Base