import { Button, Toast } from "react-bootstrap";
import Base from "../components/Base";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";
import { infoWithImageInRightSection, infoWithImageInLeftSection, contactForm } from "./HomePageComponents";
import TrendingProducts from "./HomePageComponents";
import React, {useState, useEffect} from "react";


function Index(){
    // const [products,setProducts]=useState([
    //     {
    //         addedDate: "2023-07-13T04:40:49.646Z",
    //         category: {
    //           categoryId: "string",
    //           coverImage: "string",
    //           description: "string",
    //           title: "Stock"
    //         },
    //         description: "string",
    //         discountedPrice: 500,
    //         live: true,
    //         price: 600,
    //         productId: "string",
    //         productImageName: "string",
    //         quantity: 0,
    //         stock: true,
    //         title: "Product Title"
    //       },
    //       {
    //         addedDate: "2023-07-13T04:40:49.646Z",
    //         category: {
    //           categoryId: "string",
    //           coverImage: "string",
    //           description: "string",
    //           title: "Nelson"
    //         },
    //         description: "string",
    //         discountedPrice: 500,
    //         live: true,
    //         price: 600,
    //         productId: "string",
    //         productImageName: "string",
    //         quantity: 0,
    //         stock: true,
    //         title: "Product Title"
    //       },
    //       {
    //         addedDate: "2023-07-13T04:40:49.646Z",
    //         category: {
    //           categoryId: "string",
    //           coverImage: "string",
    //           description: "string",
    //           title: "Nelson"
    //         },
    //         description: "string",
    //         discountedPrice: 500,
    //         live: true,
    //         price: 600,
    //         productId: "string",
    //         productImageName: "string",
    //         quantity: 0,
    //         stock: true,
    //         title: "Product Title"
    //       }

    // ])

    // const [products, setProducts] = useState([])

    let product = [];

    // const FeatureProducts = async () => {
    //   const response = await axios.post(`http://localhost:9090/products/featureProducts`,
    //   {},
    //   {
    //     headers:{
    //       common:{
    //         "Access-Control-Allow-Origin":"*",
    //         "Content-Type":"application/json",
    //       }
    //     }
    //   })
    //   const res = response;
    //   product = res.response;
    // }

    // useEffect(()=>{
    //     FeatureProducts()
    // },[])

    // const userData = localStorage.getItem("userData")

    return (
        <Base 
        title="Your friendly stationary" 
        description={
            "Welcome to our Stationary Store, We will inspire your writing."
        }
        buttonEnabled={true}
        buttonText="Shop Now"
        buttonType="primary"
        buttonLink="/store"
        > 
       <div className="my-4">{TrendingProducts(product)}</div>
       <div style={{margin:"100px 0px"}}>{infoWithImageInRightSection("https://source.unsplash.com/random/200x200?sig=1","Wanna Know More About Us?","Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium voluptates atque tempore dolorem tenetur.")}</div>
       <div style={{margin:"100px 0px"}}>{infoWithImageInLeftSection("https://source.unsplash.com/random/200x200?sig=1","Our Products are available in the Store","Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium voluptates atque tempore dolorem tenetur.")}</div>
        <div className="my-4">{contactForm()}</div>
        <div style={{margin:"100px 0px"}}>{infoWithImageInRightSection("https://source.unsplash.com/random/200x200?sig=1","Fill Free to Fill Above Form","Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium voluptates atque tempore dolorem tenetur.")}</div>

        </Base>
    ); 
}


export default Index;