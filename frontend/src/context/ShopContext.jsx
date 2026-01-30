import { ShopContext } from "./ShopContext.js";
import { useEffect, useState } from "react";
// import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const ShopContextProvider = (props) => {
  // Step 2: Define global values you want to share
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products,setProducts]=useState([]);
  const [token,setToken]=useState('');
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true'
  );
  const navigate= useNavigate();

  const addToCart = async (itemId, size) => {
    //    copy object without reference
    let cartData = structuredClone(cartItems);

    if (!size) {
      toast.error("Select Product Size");
      return;
    }
    //    obj[varName] → used when the property name is stored in a variable.
    //    cartData[itemId][size] is how you access a nested object property when the keys are stored in variables.
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);

    if(token){
      try {
        await axios.post(backendUrl+'/api/cart/add',{itemId,size},{headers:{token}});
        
      }catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getCartCount= ()=>{
    let totalCount=0;
    for (const items in cartItems) {
        for (const item in cartItems[items]) {
           // console.log(cartItems[items][item]);// it is tell me only item Value.
            try {
              if(cartItems[items][item] > 0){
                totalCount+=cartItems[items][item];
              }
            } catch (error) {
              console.log(error);
            }
            }
        }
        return totalCount;
    }

    const updateQuantity= async(itemId,size,quantity)=>{
      let cartData = structuredClone(cartItems);

      cartData[itemId][size]=quantity;
      setCartItems(cartData);
      if (token) {
        try {
          await axios.post(backendUrl+'/api/cart/update',{itemId,size,quantity},{headers:{token}});
        } catch (error) {
          console.log(error);
          toast.error({success:false,message:error.message});
        }
      }
    }

    const getCartAmount=()=>{
          let totalAmount=0;
          for(const items in cartItems){
            let itemInfo=products.find((product)=> product._id===items);
            for(const item in cartItems[items]){
              try{
                  if(cartItems[items][item] > 0){
                    totalAmount += itemInfo.price * cartItems[items][item];
                  }
              }catch(error){
                  console.log(error);
              }
            }
          }
        return totalAmount;
    }

    const getProductsData=async()=>{
      try {
        const response=await axios.get(backendUrl+'/api/product/list');
        if(response.data.success){
          setProducts(response.data.products);
        }else{
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }

    const getUserCart=async(token)=>{
      try {
        const response=await axios.post(backendUrl+'/api/cart/get',{},{headers:{token}});
        if (response.data.success) {
          setCartItems(response.data.cartData);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }

useEffect(()=>{
  if (!token && localStorage.getItem('token')){
    setToken(localStorage.getItem('token'));
    getUserCart(localStorage.getItem('token'));
  }
},[]);

useEffect(()=>{
    getProductsData();
},[]);

useEffect(() => {
  localStorage.setItem('darkMode', darkMode);
  if (darkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}, [darkMode]);




  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken,
    setCartItems,
    darkMode,
    toggleDarkMode
  };
  // Step 3: Wrap children inside Provider
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;