import { useContext } from "react";
import UserContext from "../../context/UserContext";

const Home=()=>{
        const userContext=useContext(UserContext);
return(
    <div>
        {console.log(userContext)}
        {/* {JSON.stringify(userContext)} */}
        {console.log(userContext)}
        <h1 className="text-center mt-5">Welcome {userContext.userData?.user?.name}</h1>
        {/* <h1 >user is logged in - {userContext.isLogin + ''}</h1> */}
        <p className="text-center">Go to Store to make purchase</p>

       
    </div>
      
    
)
}

export default Home