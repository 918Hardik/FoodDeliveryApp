import { createContext, useEffect, useState } from "react";
import axios from "axios"
// import { food_list } from "../assets/assets"; removed because now we will add from backend
//rather thaan only displaying to frontend


export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({})
    //backend url
    const url = "https://fooddeliveryapp-backend-9wcu.onrender.com"
    const [token, setToken] = useState("")
    //fetch food data from database to frontend
    const [food_list, setFoodList] = useState([])

    const addToCart = async(itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if(token){
            await axios.post(url+'/api/cart/add',{itemId},{headers:{token}});
        }
    }
    const removeFromCart = async(itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }

    // useEffect(()=>{
    //     console.log(cartItems);
    // },[cartItems])
    const getTotalCartAmount = () => {
        let TotalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                TotalAmount += itemInfo.price * cartItems[item];
            }
        }
        return TotalAmount;
    }

    //fetch
    const fetchFoodList=async()=>{
        const response = await axios.get(url+'/api/food/list')
        setFoodList(response.data.data);
    }

    const loadCartData=async(token)=>{
        const response=await axios.post(url+'/api/cart/get',{},{headers:{token}})
        setCartItems(response.data.cartData);
    }

    //storing token state so that we donnt getlogout while  re

    useEffect(() => {
        
        async function loadData(){
            fetchFoodList();
            //first we fetched food list then saved the user token in local storage
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();

    }, [])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url, //passing backend ulr to access
        token,
        setToken
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider;
