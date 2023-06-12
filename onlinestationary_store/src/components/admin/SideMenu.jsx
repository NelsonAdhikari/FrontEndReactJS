import { Badge, ListGroup } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import {FaHome } from "react-icons/fa"
import {BiCategory } from 'react-icons/bi'
import {MdCategory } from 'react-icons/md'
import {MdAddBox} from 'react-icons/md'
import {MdOutlineViewWeek} from 'react-icons/md'
import {FaCartPlus} from 'react-icons/fa'
import {FaUserAlt} from 'react-icons/fa'
import {MdDashboard} from 'react-icons/md'
import {MdOutlineLogout} from 'react-icons/md'





const SideMenu=()=>{
    return(
        <>
            <ListGroup variant="flush" >
                <ListGroup.Item as={NavLink} to="/admin/home" action>
                   <FaHome size={20}/>
                    <span className="ms-2">Home</span>
                    </ListGroup.Item>
                <ListGroup.Item as={NavLink} to="/admin/add-category" action>
                   <BiCategory size={20} />
                    <span className="ms-2">Add Category</span>
                    </ListGroup.Item>
                <ListGroup.Item as={NavLink} to="/admin/categories" action>
                    <MdCategory size={20} />
                    <span className="ms-1">View Category</span>
                    </ListGroup.Item>
                <ListGroup.Item as={NavLink} to="/admin/add-product" action>
                    <MdAddBox size={20} />
                    <span className="ms-2">Add Product</span>
                    </ListGroup.Item>
                <ListGroup.Item as={NavLink} to="/admin/products" action>
                    <MdOutlineViewWeek size={20} />
                    <span className="ms-2">View Products</span>
                    </ListGroup.Item>
                <ListGroup.Item as={NavLink} to="/admin/orders" action>
                    <FaCartPlus size={20}/>
                    <span className="ms-2">Orders</span>
                    </ListGroup.Item>
                <ListGroup.Item as={NavLink} to="/admin/users" className="d-flex justify-content-between align-items-start" action>
                <div>
                <FaUserAlt size={20}/>
                    <span className="ms-2">Users</span>
                    </div>
                    <Badge bg="danger" pill>
                        New
                    </Badge>
                    </ListGroup.Item>
                <ListGroup.Item as={NavLink} to="/users/home" action>
                    <MdDashboard size={20}/>
                    <span className="ms-2">Dashboard</span>
                    </ListGroup.Item>
                <ListGroup.Item action>
                    <MdOutlineLogout size={20}/>
                    <span className="ms-2">Logout</span>
                    </ListGroup.Item>



            </ListGroup>
        </>
    )
}

export default SideMenu