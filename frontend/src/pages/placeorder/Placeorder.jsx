import React, { useContext,  useEffect,  useState } from 'react'
import './Placeorder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Placeorder = () => {
  const {getTotalCartAmount,token,food_list,cartItems,url}=useContext(StoreContext);
  const [data,setData]=useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
    })
    
  const onChangeHandler=(event)=>{
    const name=event.target.name;
    const value=event.target.value;
    setData(data=>({...data,[name]:value}));
  }

  const placeOrder=async(event)=>{
    event.preventDefault();
    let orderItems=[];
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo=item;
        itemInfo['quantity']=cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    let orderData={
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+2,
    }
    let response= await axios.post(url+"/api/order/place",orderData,{headers:{token}});
    if(response.data.success){
      const {session_url}=response.data;
      window.location.replace(session_url);
    }
    else{
      alert("Error")
    }
  }
  const navigate=useNavigate();
  
  useEffect(()=>{
    if(!token){
      navigate('/cart')
    }
    else if(getTotalCartAmount()===0){
      navigate('/cart')
    }
  },[token])

  // useEffect(()=>{
  //   console.log(data);
  // },[data])

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery information</p>
        <div className="multi-fields">
          <input name='firstName' required onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' />
          <input name='lastName' required onChange={onChangeHandler} value={data.lastName} type="text"placeholder='Last Name' />
        </div>
        <input name='email' required onChange={onChangeHandler} value={data.email} type="email"  id="" placeholder='Email address'/>
        <input name='street'required onChange={onChangeHandler} value={data.street} type="text"  id="" placeholder='street'/>
        <div className="multi-fields">
          <input name='city' required onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
          <input name='state' required onChange={onChangeHandler} value={data.state} type="text"placeholder='State' />
        </div>
        <div className="multi-fields">
          <input name='zipcode' required onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code' />
          <input name='country' required onChange={onChangeHandler} value={data.country} type="text"placeholder='Country' />
        </div>
        <input name='phone' required onChange={onChangeHandler} value={data.phone} type="tel" id="" placeholder='Phone' />
      </div>
      <div className="place-order-right">
      <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Sub Total</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fees</p>
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
            </div>
          </div>
          <button type='submit' >Proceed To Payment</button>
        </div>
      </div>
    </form>
  )
}

export default Placeorder