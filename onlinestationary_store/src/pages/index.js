import { Button, Toast } from "react-bootstrap";
import Base from "../components/Base";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";

function Index(){
    function showSuccessToast(){
        console.log("Toast added");
        // toast.success("Success Toast");
        toast.warn("Invalid!!");
           
        }

       const getDataFromServer=()=>{
        toast.info("Got data from server");

        axios.get("https://jsonplaceholder.typicode.com/posts").then((response)=>{
            console.log(response.data)
            toast.success("Request Completed")
        })
            .catch((error)=>{
                console.log(error)
                toast.error("Request Failed")
            })
           
       };
       

    return (
        <Base 
        title="Your friendly stationery" 
        description={
            "Welcome to our Stationary Store, We will inspire your writing."
        }
        buttonEnabled={true}
        buttonText="Shop Now"
        buttonType="primary"     
        > 
    
            <h1 className="text-center">Working on Home Page</h1>
            <p className="text-center">Progress left to construct</p>
          {/* <Button variant="success" onClick={showSuccessToast}>Toastify Success</Button> 
          <Button variant="primary" onClick={getDataFromServer}>Get Data from Fake API</Button>  */}
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
export default Index;