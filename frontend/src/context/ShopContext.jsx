import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Step 1: Create a Context
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  // Step 2: Define global values you want to share
  const currency = "$";
  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
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

// useEffect(()=>{
//     getCartCount();
// },[cartItems]);


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
  };
  // Step 3: Wrap children inside Provider
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
