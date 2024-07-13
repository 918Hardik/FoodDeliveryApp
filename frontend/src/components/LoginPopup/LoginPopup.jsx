import React, { useContext, useEffect, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from "axios"

const LoginPopup = ({ setShowlogin }) => {
    //accessing backend url from store contextfile
    const {url,setToken} = useContext(StoreContext);

    const [currState, setCurrState] = useState('Sign Up');
    //for backend fetching
    const[data,setData]=useState({
        name:"",
        email:"",
        password:"",
    })
    //ek data set data bnaya jisme hum set krenge value jese ki name:name uss jgh ka naam name h mtlb ki
    //usne name ki value set kri fir dusre ka name email vo email ki  value set krega
    //onchangeHandler krega  ye values set ok
    const onChangeHandler=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        setData(data=>({...data,[name]:value}))
    }

    // useEffect(()=>{
    //     console.log(data);

    // },[data])

    // onlogin krega api  call onsubmit pr
    const onLogin = async(event)=>{
        event.preventDefault();
        let newUrl = url;
        if(currState==="Login"){
            newUrl+="/api/user/login"
        }
        else{
            newUrl+="/api/user/register"
        }
        const response=await axios.post(newUrl,data);
        if(response.data.success){
            setToken(response.data.token);
            localStorage.setItem("token",response.data.token);
            setShowlogin(false);
        }
        else{
            alert(response.data.message);
        }
    }

    return (

        <div className='login-popup'>
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowlogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Login" ? <></> : <input name="name" onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required />}

                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
                    <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Enter Password' required />

                </div>
                <button type='submit'>{currState === "Sign Up" ? "Create account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <em>By continuing,i agree to terms of use & privacy policy</em>
                </div>
                {currState === "Login" ? 
                <strong>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click here</span></strong> 
                : 
                <strong>Already have an account?<span onClick={()=>setCurrState("Login")}>Login here</span></strong>}


            </form>

        </div>
    );
};

export default LoginPopup;
