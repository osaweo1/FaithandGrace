import { useState,useRef,useMemo } from "react"
import JoditEditor from 'jodit-react';
import axios from 'axios'
// import { useNavigate } from "react-router-dom";
import { useGlobalContext ,appContext} from "../context"

const PostBlog=()=>{
    const {user}=useGlobalContext(appContext)
    const editor = useRef(null);
    
    const [postData,setPostData]=useState({
        title:'',
        categoty:'',
        content:'',
        users:user.username
        
    })
    const [postImage,setPostImage]=useState({
        image:'',
    })
    const placeholder='Enter Content'
    const config = useMemo(()=>(
		{
			readonly: false, // all options from https://xdsoft.net/jodit/docs/,
			placeholder: placeholder || 'Start typings...'
		}),
		[placeholder]
	);
    console.log(postData)
    const postvalue=(e)=>{
        setPostData({...postData,[e.target.name]: e.target.value})
        // console.log(e.target.value)
    }
    const entercontent=(data)=>{
        setPostData({...postData,'content':data})
    }
    const onchangefield=(e)=>{
        setPostImage({'image':e.target.files})
    }
    const form = useRef(null)
    axios.defaults.withCredentials=true
    const submitpost=async(e)=>{
        e.preventDefault()
        const formdata=new FormData(form.current)
        console.log(formdata)
        formdata.append('image', postImage.image)
        console.log(formdata)
        try {
            const response=await axios.post('http://localhost:5000/blog/article',formdata)
            if(response){
                // console.log(response)
                window.location.href='/'
            }
        } catch (error) {
            console.log(error)
        }
        

    }

    return(
        <div className="articledetail">
            <div className="articledetailsub">
                <form ref={form} className='blogForm' id="formEle" onSubmit={submitpost}>
                    
                    <label htmlFor="title">Article Title:</label>
                    <input 
                        type="text"
                        placeholder="Enter Blog Title"
                        value={postData.title}
                        onChange={postvalue}
                        id="blogtitle"
                        className="titleclass"
                        name="title"
                    
                    />
                     <label htmlFor="content">Article Content:</label>
                   <JoditEditor
                        ref={editor}
                        value={postData.content}
                        config={config}
                        // tabIndex={1} 
                        onChange={entercontent}
                        name='content'
                        className="editor"
		            />
                    <label htmlFor="upload">Upload Image:</label>
                    <input
                        type="file"
                        name="image"
                        id='uploadFile'
                        onChange={onchangefield}
                    />
                    <input
                        type="hidden"
                        value={postData.users}
                        name="users"
                    
                    />
                    
                    <button className="subButton" onSubmit={submitpost}>Post Article</button>
                </form>
            </div>
        </div>
    )

}




export default PostBlog