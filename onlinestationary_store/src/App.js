
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Index from "./pages/index";
import About from "./pages/about";
import Services from './pages/services';
import Cart from './pages/cart';
import Dashboard from "./pages/users/dashboard";
import Profile from './pages/users/Profile';
import AboutUser from './pages/users/AboutUser';
import CustomNavbar from './components/Navbar';
import Contact from './pages/contact';
import { ToastContainer, Zoom, toast } from 'react-toastify';
import Register from './pages/register';
import Login from './pages/login';
import Home from './pages/users/home';
import UserProvider from './context/UserProvider';
import Order from './pages/users/order';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminHome from './pages/admin/AdminHome';
import AddProduct from "./pages/admin/AddProduct";
import ViewProducts from './pages/admin/ViewProducts';
import ViewCategories from './pages/admin/ViewCategories';
import AdminOrders from './pages/admin/AdminOrders';
import AdminUsers from './pages/admin/AdminUsers';
import AddCategory from './pages/admin/AddCategory';
import StorePage from './pages/users/StorePage';
import ProductView from './pages/users/ProductView';
import CategoryStorePage from './pages/users/CategoryStorePage';
import CartProvider from './context/CartProvider';
import Loading from './components/Loading';
import useLoader from './hooks/useLoader';




function App() {
 const loading = useLoader();
 
 
 //jsx-syntax extension of  jsx
  return (
    //setting up routes
    <UserProvider>
      <CartProvider>
    <BrowserRouter>
      <ToastContainer position="bottom-center" theme="dark" draggable transition={Zoom}/>
    <CustomNavbar/>
    <Loading show={loading} />
      <Routes>
        <Route path="/" element={<Index />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/services" element={<Services />}/>
        <Route path="/contact" element={<Contact />}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/store" element={<StorePage/>}/>
        <Route path="store/products/:productId" element={<ProductView/>}/>
        <Route
        path="store/:categoryId/:categoryTitle"
        element={<CategoryStorePage/>}
        />


        <Route path="/users" element={<Dashboard/>}>
        <Route path="home" element={<Home/>}/>
        <Route path="profile/:userId" element={<Profile/>}/>
        <Route path="about" element={<AboutUser/>}/>
        <Route path="orders" element={<Order/>}/>
        

        </Route>

        <Route path="/admin" element={<AdminDashboard />}>
        <Route path='home' element={<AdminHome />}/>
        <Route path='add-product' element={<AddProduct />}/>
        <Route path="add-category" element={<AddCategory />}/>
        <Route path="categories" element={<ViewCategories />}/>
        <Route path="products" element={<ViewProducts />}/>
        <Route path="orders" element={<AdminOrders />}/>
        <Route path="users" element={<AdminUsers />}/>


        </Route>
      </Routes>

    </BrowserRouter>
    </CartProvider>
    </UserProvider>
  );
}


export default App;