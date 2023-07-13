import { Link} from "react-router-dom"
import { useGlobalContext ,appContext} from "../context"
import { useEffect, } from "react"
import { useParams } from "react-router-dom"
import {format} from 'date-fns'

const Home =()=>{
    const {blogs,setPath}=useGlobalContext(appContext)
    const {id}=useParams()
   
    useEffect(()=>{
        setPath(id)
    },[id,setPath])
   
    // const randomIndex = (blogs?.length)
    const randomIndex2 = Math.floor(Math.random() * blogs?.length)
    const randomIndex3 = Math.floor(Math.random() * blogs?.length)
    // console.log(randomIndex)
    return(
        <div className="container">
        
            <div className="small-container">
                <div className="first-pic">
                    {blogs?(
                    <div className="details">
                        <img className="homeblogimage" src={`${blogs[0].image}`} alt=""/>
                        <h1><Link className='bloglink'to={`/blog/${blogs[0]._id}`}>{blogs[0].title}</Link></h1>
                        
                        <div className="com-details">
                            <p><img src="icon/person.png" className="logo3" alt=""/><span>{blogs[0].createdBy?.username}</span></p>
                            <p><img src="icon/calender.png" className="logo3" alt=""/><span>{format(new Date(blogs[0].date),'d LLL,yyy')}</span></p>
                            <p><img src="icon/comment.png" className="logo3" alt=""/><span>{blogs[0].comments.length} comments</span></p>
                        </div>
                                          
                    </div>
                    ):('')}
                </div>
                <div className="second-pic">
                    
                    <div className="small-image1">
                        {blogs?(
                        <div className="sm-details">
                            <img className="homeblogimage" src={`${blogs[randomIndex2].image}`} alt=""/>
                            <h1><Link className='bloglink' to={`/blog/${blogs[randomIndex2]._id}`}>{blogs[randomIndex2].title}</Link></h1>
                            <div className="com-details">
                                <p><img src="icon/person.png" className="logo3" alt=""/><span>{blogs[randomIndex2].createdBy?.username}</span></p>
                                <p><img src="icon/calender.png" className="logo3" alt=""/><span>{format(new Date(blogs[randomIndex2].date),'d LLL,yyy')}</span></p>
                                <p><img src="icon/comment.png" className="logo3" alt=""/><span> {blogs[randomIndex2].comments.length} comments</span></p>
                            </div>
                        </div>
                        ):('')}
                    </div>

                    <div className="small-image">
                        {blogs?(
                        <div className="sm-details">
                            <img className="homeblogimage" src={`${blogs[randomIndex3].image}`} alt=""/>
                            <h1><Link className='bloglink' to={`/blog/${blogs[randomIndex3]._id}`}>{blogs[randomIndex3].title}</Link></h1>
                            <div className="com-details">
                                <p><img src="icon/person.png" className="logo3" alt=""/><span>{blogs[randomIndex3].createdBy?.username}</span></p>
                                <p><img src="icon/calender.png" className="logo3" alt=""/><span>{format(new Date(blogs[randomIndex3].date),'d LLL,yyy')}</span></p>
                                <p><img src="icon/comment.png" className="logo3" alt=""/><span> {blogs[randomIndex3].comments.length} comments</span></p>
                            </div>
                        </div>
                        ):('')}
                    </div>
                </div>
            </div>
        
        </div>
    )
}


export default Home