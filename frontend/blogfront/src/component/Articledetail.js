import { useEffect, useState } from "react"
import { appContext, useGlobalContext } from "../context"
import parse from 'html-react-parser'
import axios from "axios"
import { Link, useNavigate, useParams } from "react-router-dom"
import {format} from 'date-fns'


const Articledetail=()=>{
    const {id}=useParams()
    // console.log(id)
    const navigate=useNavigate()
    const {single:singleBlog,user,setPath}=useGlobalContext(appContext)
    const [chechEdit,setCheckEdit]=useState(false)
    // console.log(singleBlog)
    // console.log(user)
    const [comments,setComments]=useState({
        comment:''
    })
    console.log(comments)

    const commentFunc=(e)=>{
        setComments({[e.target.name]:e.target.value})
    }

    useEffect(()=>{
        const createuser=singleBlog?.createdBy?._id
        // const createusername=singleBlog?.createdBy?.username
        const userId=user?.id
        console.log(createuser)
        console.log(userId)
        if(JSON.stringify(createuser)===JSON.stringify(userId)){
            setCheckEdit(true)
            console.log(singleBlog)
        }else{
            setCheckEdit(false)
        }
        
    },[user,singleBlog])
    axios.defaults.withCredentials=true
    const oncomment=async(e)=>{
        e.preventDefault()
        const response=await axios.post(`http://localhost:5000/blog/${id}/newComment`,comments)
        if(response.status===200){
            
            window.location.href=`/blog/${id}`
        }
        else{
            navigate('/login')
        }
    }
   
    // axios.defaults.withCredentials=true
    const deleteSingleData= async()=>{
        
        try {
            console.log(id)
            const response=await axios.delete('http://localhost:5000/blog/'+id)
            console.log(response)
            if(response.status===200){
                window.location.href='/'
            }

        } catch (error) {
            console.log(error)
        }
    }
    // const deleteArticle=(e)=>{
    //     e.preventDefault()
    //     setPath(id)
    // }
    return(
        <div className="articledetail">
        {singleBlog?
            <div className="articledetailsub">
                <div className="imagebox">
                    <img className="articledetailimage" src={`${singleBlog.image}`} alt=""/>

                </div>
                <div className="articledetails">
                    <div className="editdelete">
                        <h3>{singleBlog.title}</h3>
                        {chechEdit &&
                        <div className="edit">
                        <Link to={`/blog/${singleBlog._id}/edit`} className="editButton">Edit Article</Link>
                        <button className="deleteButton" onClick={deleteSingleData}>delete Article</button>
                        </div>
                        }
                    </div>
                    
                    <p className="nameDate"><span> Create By:{singleBlog.createdBy.username}</span>, Created At :{format (new Date(singleBlog.date),'d LLL,yyy')}</p>
                    {parse(`${singleBlog.content}`)}
                </div>
                <h3 className="h3">Comments:</h3>
                <div className="commentall">
                    
                        {singleBlog.comments &&
                        
                            
                            singleBlog.comments.map(comment=>(
                                
                                <div className="singleComment" key={comment._id}>
                                    <p>{comment.author}: <span>{comment.commentText}</span>,<span>{format (new Date(comment.date),'d LLL,yyy')}</span></p>
                                    
                                </div>
                                

                            ))
                            
                        }
                        
                </div>

            </div>:''
        }
            <div className=' articledetailsub'>
                <div className="comment-area">
                    <form className="comment-form" onSubmit={oncomment}>
                    <label htmlFor="comment">Comment:</label>
                    <textarea className="comment-input"
                        name="comment"
                        placeholder={user?'Make Your Comments':"login to make comments"}
                        value={comments.comment}
                        onChange={commentFunc}
                    >
                    </textarea>
                    
                    <button>
                        Comment
                    </button>
                    </form>
                </div>
            
            </div>
        </div>
    )
}


export default Articledetail