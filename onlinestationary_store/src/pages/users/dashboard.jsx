import { Outlet } from "react-router-dom";

const Dashboard=()=>{
    return (<div><h1>This is User Dashboard.</h1>

    {/*nested route components */}

<Outlet/>
</div>
    );
}

export default Dashboard;