
import { Link ,useNavigate} from "react-router-dom"
// import { useGlobalContext } from "../context"
import {  useState, } from "react"
// import Cookies from 'js-cookie';
import axios from "axios";
import { useGlobalContext ,appContext} from "../context"


const Nav=()=>{
    const navigate=useNavigate()
    // const [users,setUsers]=useState(null)
    // const {blogs}=useGlobalContext()
    const [fix , setfix]= useState(false)
    // const [login,setLogin]=useState(false)
    // console.log(login)
    const {user}=useGlobalContext(appContext)
    // console.log(user)
    // const auth=Cookies.get('token')
        
    
  
    
    const setFixedNavbar=()=>{
        if(window.scrollY>=65){
            setfix(true)
        }else{
            setfix(false)
        }

    }
    window.addEventListener('scroll',setFixedNavbar)
    axios.defaults.withCredentials=true
    const logout=async ()=>{
       const response=await axios.get('http://localhost:5000/logout')
    //    console.log(response)
       if(response.status===200){
        
       window.location.href='/login'
        // navigate('/login')
        }
    }
   
    return(
        <nav className={fix ? 'nav fixed':'nav'}>
            <div className="navigation">
                <ul>
                    <li><Link className="a" to='/'>Home</Link></li> 
                    <li><Link className="a" to='/about'>About</Link></li>
                    <li><Link className="a" to='/contact'>Contact</Link></li>
                    { user &&
                    <li><Link className="a" to='/postarticle'>Post Article</Link></li> 
                    
                    }

                    
                    
                </ul>
                
            </div>
            
            <div className="navigation authentication-div">
                <ul>
                    
                    { user ?
                        <div className="check-auth">
                        {user&&<li className="b">@{user.username}</li>}
                        <li className="a" onClick={logout}> Logout</li> 
                        </div>
                        :
                        <div className="check-auth">
                        <li><Link className="a" to='/Login'>Login</Link></li> 
                        <li><Link className="a" to='/SignUp'>Sign Up</Link></li>
                        </div>
                   
                    }
                    
                </ul>
            </div>
            <div className="search">
                <input type="text" placeholder="Search Blog.." />
                <button><img className="search-logo" src="icon\search.png" alt=""/></button>
            </div>
            
            
        </nav>
    )
}


export default Nav