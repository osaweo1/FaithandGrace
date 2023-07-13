import { useState,useRef } from "react";
import React from 'react';
import { Link } from "react-router-dom";
import axios from 'axios'
// import Cookies from 'universal-cookie'

function Login() {
    // const navigate=useNavigate()
    // const navigate=useNavigate()
    const [userValue,setUserValue]=useState({
        username:'',
        password:'',

    })
    const form=useRef(null)

    const [view, setView]=useState(false)
    const [message,setMessage]=useState('')
//    console.log(message)
    const onChange=(e)=>{
        setUserValue({...userValue,[e.target.name]:e.target.value})
        
        // console.log(userValue)
        
    }
    const chaneview=()=>{
        setView(!view)
    }
    axios.defaults.withCredentials=true
    const loginFunction=async(e)=>{
        e.preventDefault()
        const response=await axios.post('http://localhost:5000/blog/login',userValue)
        console.log(response)
        if(response.status===200){
            window.location.href='/'
        //     // navigate('/')
            
        }else{
           setMessage(response.data.Error)
        }

    }

    return (
        <div className='articledetails'>
            <div className='form-box'>
            <h3>Login</h3>
                <form ref={form} className='loginform' onSubmit={loginFunction}>

                    <label htmlFor='username'>Username:</label>
                    <input type='text'
                         placeholder='Enter Username...' 
                         name='username'
                         value={userValue.username}
                         onChange={onChange}
                         
                    />
                    
                    <label htmlFor='password'>Password:</label>
                    <div className="pass">
                    <input type={view?'text':'password'} 
                        placeholder='password'
                        name='password'
                        value={userValue.password}
                        onChange={onChange}
                        
                     />
                     

                     <img src={view?`icon/eye2.png`:`icon/eye.png` }
                        className="eye" alt=""
                        onClick={chaneview}
                     />
                     </div>
                     
                    <button >Login</button>
                    {message && <h6 className='mes'>{message}</h6>}
                </form>
                <h6>Don't have an account <Link to={'/signUp'}>Sign Up</Link> </h6>
            </div>
            
        </div>
    );
}

export default Login;