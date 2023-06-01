import { useContext } from "react";
import UserContext from "../../context/UserContext";

const Home=()=>{
        const userContext=useContext(UserContext);
return(
    <div>
        {JSON.stringify(userContext)}
        {console.log(userContext)}
        <h1>Welcome User DashBoard</h1>
    </div>
      
    
)
}

export default Home;