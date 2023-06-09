import React from 'react'
import CartContext from './CartContext'
import { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import UserContext from './UserContext'
import { addItemToCart, getCart, removeItemFromCart } from '../services/CartService'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Alert } from 'react-bootstrap'


const CartProvider = ({children}) => {
    const {isLogin,userData}= useContext(UserContext);
    const [cart,setCart]=useState(null);
    const [heading,setHeading]=useState("Initial heads");
    

    const mySwal =withReactContent(Swal)

    //load user cart initially
    const loadUserCart = async (userId) => {
      try{
       const cart = await getCart(userId);
       setCart({...cart});
       console.log(cart);
      } catch (error) {
        console.log(error);
        setCart({items:[]});
      }
    };
    useEffect(()=>{
     
      if(isLogin){
        //get user cart
        loadUserCart(userData.user.userId);
      }else{
        setCart(null)
      } 
    },[isLogin])

    //add item to cart
    const addItem=async(quantity,productId,next)=>{
      try {
        if(!isLogin){

         
            mySwal.fire({
              title: "Not Logged In",
              html: <>
              <Alert variant='danger' className='border border-0'>
              Please do login to add item to Cart
              </Alert>
              </>,
              icon: "error",
              
        }).then(()=>{  
        })
        return;
        }
      const result = await addItemToCart(
        userData.user.userId,
        productId,
        quantity
        );
        setCart({...result});
        next();
        // if(quantity>1){
        //   toast.success("Quantity Updated")
        // }else{
        //   toast.success("Item added to cart",{
        //     position:'top-right',
        //   })
        // }
        
      } catch (error) {
        console.log(error);
        toast.error("Error in adding product to cart");
      }
    }

    //removing item from cart
    const removeItem=async(itemId)=>{
      try {
       const result = await removeItemFromCart(userData.user.userId,itemId);
       const newCartItems= cart.items.filter((item)=>item.cartItemId !== itemId);
       console.log(newCartItems);
       setCart({
        ...cart,
        items: newCartItems,
       });
      } catch (error) {
        console.log(error);
        toast.error("Error in removing items form cart");
      }

    }

    //clear cart
    const clear = async ()=>{
      try {
        const result = await removeItemFromCart(userData.user.userId);
        console.log(result);
        setCart({
          ...cart,
          items: [],
        })
      } catch (error) {
        console.log(error);
        toast.error("Error in clearing cart");

      }
    }



  return (
  <CartContext.Provider
   value={{ cart,setCart, addItem, removeItem, clearCart:clear }}>
    {children}
  </CartContext.Provider>
  )
}

export default CartProvider