import axios from 'axios';
import React, {  useRef, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


// import Validationcheck from '../validations/validation.js'

function SignUp() {
    const [userValue,setUserValue]=useState({
        username:'',
        email:'',
        password:'',
        repassword:''
    })
    const [message,setMessage]=useState(null)
    const [errors,setErrors]=useState({})
    console.log(message)
    const change=(e)=>{
        setUserValue({...userValue,[e.target.name]:e.target.value})
        setErrors(Validationcheck(userValue))
        console.log(userValue)
    }
    const Validationcheck=(userValue)=>{
        let error={}
        
        let email_pattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/
        let password_pattern=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

        if(userValue.username===''){
            error.username='Username field cannot be empty'
        }
        else if(userValue.username.length<=4){
            error.username='Username too short'
        }
        if(userValue.email === ''){
            error.email='Email field cannot be empty'
        }
         else if(!email_pattern.test(userValue.email)){
            error.email='Email entered is not correct'
        }
        if(userValue.password===''){
            error.password='Password field cannot be empty'
        }
        else if(!password_pattern.test(userValue.password)){
            error.password='Password enter do not matched'
        }
    
        if(userValue.repassword===''||userValue.repassword!==userValue.password){
            error.repassword='Password entered do not matched'
        }
        return error
    }
    // const navigate=useNavigate()
    const form = useRef(null)
    const submitform=async(e)=>{
        e.preventDefault()
        setErrors(Validationcheck(userValue))
        const formdata=new FormData(form.current)
           
        
        
        console.log(formdata)
        console.log(userValue)

        try {
            const response=await axios.post('http://localhost:5000/blog/newuser',{userValue})
            
            if(response){
                console.log(response)
                setUserValue({
                    username:'',
                    email:'',
                    password:'',
                    repassword:''
                })
                setMessage(response.data)

                
                
            }else{
                // console.log(response.data.response)
                setMessage(response.data)
            }
        } catch (error) {
            console.log(error)
        }
        
        
        

    }
   

    return (
        <div className='articledetails'>
            <div className='form-box'>
            <h3>Signup</h3>
                <form ref={form} id="formEle" className='loginform' onSubmit={submitform}>
                    <label htmlFor='username'>Username:</label>
                    <input type='text'
                         placeholder='Enter Username...' 
                         name='username'
                         value={userValue.username}
                         onChange={change} 
                    />
                    {errors.username && <p className='error'>{errors.username}</p>}
                    <p>Min :6 and Max:10</p>
                    <label htmlFor='username'>Email:</label>
                    <input type='email'
                         placeholder='Enter Username...' 
                         name='email'
                         value={userValue.email}
                         onChange={change}
                         
                    />
                    {errors.email && <p className='error'>{errors.email}</p>}
                    

                    <label htmlFor='password'>Password:</label>
                    <input type='password' 
                        placeholder='password'
                        name='password'
                        value={userValue.password}
                        onChange={change}
                     />
                     {errors.password && <p className='error'>{errors.password}</p>}
                     <p>password must contains at least a number</p>
                     <p>password must contains cap letters</p>
                     
                     <label htmlFor='re-password'>Re-Password:</label>
                    <input type='password' 
                        placeholder='password'
                        name='repassword'
                        value={userValue.repassword}
                        onChange={change}
                     />
                     {errors.repassword && <p className='error'>{errors.repassword}</p>}
                    <button onSubmit={submitform}>Signup</button>

                </form>
                {message && <h6 className='mes'>{message}</h6>}
                <h6>Already have an account <Link to={'/login'}>Login</Link> </h6>
            </div>
            
        </div>
    );
}

export default SignUp;