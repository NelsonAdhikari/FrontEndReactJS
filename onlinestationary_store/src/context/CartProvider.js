import React from 'react'
import CartContext from './CartContext'
import { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import UserContext from './UserContext'
import { addItemToCart, getCart, removeItemFromCart } from '../services/CartService'
import { toast } from 'react-toastify'

const CartProvider = ({children}) => {
    const {isLogin,userData}= useContext(UserContext);
    const [cart,setCart]=useState(null);
    const [heading,setHeading]=useState("Initial heads");

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
      }  
    },[isLogin])

    //add item to cart
    const addItem=async(quantity,productId,next)=>{
      try {
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