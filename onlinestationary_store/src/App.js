
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Index from "./pages";
import About from "./pages/about";
import Services from './pages/services';
import Store from './pages/store';
import Cart from './pages/cart';
import Dashboard from './pages/users/dashboard';
import Profile from './pages/users/Profile';
import AboutUser from './pages/users/AboutUser';
import CustomNavbar from './components/Navbar';
import Contact from './pages/contact';
import { ToastContainer, Zoom } from 'react-toastify';
import Register from './pages/register';
import Login from './pages/login';
import Home from './pages/users/home';
import UserProvider from './context/UserProvider';



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
        </Route>
      </Routes>

    </BrowserRouter>
    </UserProvider>
  );
}

export default App;
