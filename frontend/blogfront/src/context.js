import React,{useContext} from 'react'
import axios from 'axios'
import {useState,useEffect} from 'react'

// import { useParams } from 'react-router-dom'



const appContext=React.createContext()



const AppProvider=({children})=>{
  const blogurl='http://localhost:5000/blog'
  const [blogs, setblogs]= useState()
  const [single,setSingle]=useState()
  const [path,setPath]=useState('')
  const [user,setUser]=useState(null)
    
  useEffect(()=>{
      const fetchdata=async ()=>{
        try{
          const response =await axios.get(blogurl)
          if(response){
            // console.log(response)
            setblogs(response.data)
            
          }
      }
      catch(error){
          console.log(error)
      }
      }
      fetchdata()
    },[])
    useEffect(()=>{
        const fetchSingleData= async()=>{
            try {
                const data=await axios(`http://localhost:5000/blog/${path}`)
                // console.log(data)
                setSingle(data.data)

            } catch (error) {
                console.log(error)
            }
        }
       if(path) fetchSingleData()
    },[path])

    // useEffect(()=>{
    //     const deleteSingleData= async()=>{
    //         try {
    //             const data=await axios.delete(`http://localhost:5000/blog/${path}`)
    //             console.log(data)
    //             // setSingle(data.data)

    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    //    if(path) deleteSingleData()
    // },[path])
    //     console.log(single)
        axios.defaults.withCredentials=true
        useEffect(()=>{
            
            const profileFunc=async()=>{
                const response=await axios.get('http://localhost:5000/profile')
                if(response.status===200){
                    console.log(response)
                    setUser(response.data)
                }
            }
              
                
           
            profileFunc()
        },[])
    return(
        <appContext.Provider value={{blogs,single,user,setPath}}>
            {children}
        </appContext.Provider>
    )
}

export const useGlobalContext=()=>{
    return(
        useContext(appContext)
    )
}
export {appContext,AppProvider}