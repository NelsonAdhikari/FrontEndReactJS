import { Navigate, Outlet } from "react-router-dom";
import { isAdminUser } from "../../auth/HelperAuth";
import { useContext } from "react";
import UserContext from "../../context/UserContext";

const AdminDashBoard=()=>{
     const userContext=useContext(UserContext)
    const dashboardView=()=>{
        return(
        <div>
            <h1>
                This is Admin Dashboard
            </h1>
         <Outlet />
        </div>
        )
    }
    return(
        (isAdminUser()) ? dashboardView() : <Navigate to="/users/home"/>
    )
}

export default AdminDashBoard;