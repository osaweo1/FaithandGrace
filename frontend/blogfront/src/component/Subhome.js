import { useEffect, useRef, useState } from "react"
import { appContext, useGlobalContext } from "../context"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import parse from 'html-react-parser'
import {format}from 'date-fns'



const Subhome=()=>{
    const {blogs,setPath}=useGlobalContext(appContext)
    const {id}=useParams()
    // console.log(id)
    // const [fix , setfix]= useState(false)
   


   useEffect(()=>{
        setPath(id)
   },[id,setPath])
    // console.log(blogs)
    // const [fixMostComented,setFixMostComented]=useState({})
    // const [loc ,setLoc]=useState(false)
       

   

    
    // const mostConectedFun=()=>{
        
    //         setFixMostComented(comms && comms.current? comms.current.getBoundingClientRect():{}) 
    //         if(fixMostComented.y > 200 ){
                
    //                 console.log(fixMostComented.y)
    //             setLoc(true)
                
    //         }else{
                
    //         }setLoc(false)  
           
            
    // }
    // window.addEventListener('scroll',mostConectedFun)
    return(
        <div className="subhome">
            <div className="article-list">
                
                <h2  className={"heading1"}>Latest Article</h2>
                <div className="article-lists">
                    
                    {blogs?.map(blog=> (
                        
                        <div className="check" key={blog._id}>
                        
                            <div><img className="blogimage" src={`${blog.image}`} alt=""/></div>
                        {/* {console.log(blog._id)} */}
                        <div className="blog-article">  
                            <h2><Link className="bloglinks" to={`/blog/${blog._id}`} >{blog.title}</Link></h2>
                            {<p>{parse(blog.content.slice(0,300))}</p>}
                            <div className="com-details">
                           
                                
                                <p className="p"><img src= 'icon/person.png' className="logo3" alt=""/><span>{blog?.createdBy?.username}</span></p>
                                <p className="p"><img src="icon/calender.png" className="logo3" alt=""/><span>{format(new Date(blog.date),'d LLL,yyy')}</span></p>
                                
                                <p className="p"><img src="icon/comment.png" className="logo3" alt=""/><span> {blog?.comments.length} comments</span></p>
                                
                            
                            </div>
                            
                        </div>
                    </div>
                    ))}
                  
                    
                   
                        
                   

                </div>
            </div>
            <div  className={'most-commented'}>
                <h2 className="heading">Most Commented Article</h2>
               <div className="most-commented-article">
                    <div className="check" >
                        <img src="images/image1.jpg" alt=""/>
                        <div className="blog-article">  
                            <h2>Blog Tiltle</h2>
                            <p >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                                ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                            </p>
                            <div className="com-details">
                                <p className="p"><img src="icon/person.png" className="logo3" alt=""/><span>Osawe Osamudiamen</span></p>
                                <p className="p"><img src="icon/calender.png" className="logo3" alt=""/><span>6/3/2023</span></p>
                                <p className="p"><img src="icon/comment.png" className="logo3" alt=""/><span>6 </span></p>
                            </div>
                            
                            </div>
                    </div>
                    
                </div>
                <div></div>
            </div>
        </div>
    )

}

export default Subhome