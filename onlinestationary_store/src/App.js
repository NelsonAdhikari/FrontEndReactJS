
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Index from "./pages/Index";
import About from "./pages/About";
import Services from './pages/Services';
import Store from './pages/Store';
import Cart from './pages/Cart';
import Dashboard from "./pages/users/Dashboard";
import Profile from './pages/users/Profile';
import AboutUser from './pages/users/AboutUser';
import CustomNavbar from './components/Navbar';
import Contact from './pages/Contact';
import { ToastContainer, Zoom } from 'react-toastify';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/users/Home';
import UserProvider from './context/UserProvider';
import Order from './pages/users/Order';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminHome from './pages/admin/AdminHome';
import AddProduct from "./pages/admin/AddProduct";



function App() {
 
 //jsx-syntax extension of  jsx
  return (
    //setting up routes
    <UserProvider>
    <BrowserRouter>
      <ToastContainer position="bottom-center" theme="dark" draggable transition={Zoom}/>
    <CustomNavbar/>
      <Routes>
        <Route path="/" element={<Index />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/services" element={<Services />}/>
        <Route path="/contact" element={<Contact />}/>
        <Route path="/store" element={<Store />}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>

        <Route path="/users" element={<Dashboard/>}>
        <Route path="home" element={<Home/>}/>
        <Route path="profile" element={<Profile/>}/>
        <Route path="about" element={<AboutUser/>}/>
        <Route path="orders" element={<Order/>}/>

        </Route>

        <Route path="/admin" element={<AdminDashboard />}>
        <Route path='home' element={<AdminHome />}/>
        <Route path='add-product' element={<AddProduct />}/>

        </Route>
      </Routes>

    </BrowserRouter>
    </UserProvider>
  );
}

export default App;
