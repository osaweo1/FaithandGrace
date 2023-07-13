import React, { useEffect, useMemo, useRef, useState } from "react"
import JoditEditor from 'jodit-react'
import { useParams } from "react-router-dom";
import axios from "axios";
import parse from 'html-react-parser'




const EditBlog=()=>{
    const {id}=useParams()
    console.log(id)
    const editor = useRef(null);
    const form =useRef()
   
    const [postTitle,setPostTitle]=useState('')
    console.log(postTitle)
    const [postContent,setPostContent]=useState('')
    console.log(postContent)
    // const [postTitle,setPostTitle]=useState('')



    // const entercontent=(data)=>{
    //     setPostContent({'content':data})
    // }
    const postvalue=(e)=>{
        setPostTitle( e.target.value)
        console.log(e.target.value)
    }
    // axios.defaults.withCredentials=true
    useEffect(()=>{
        const fetchSingleData= async()=>{
            try {
                const postInfo=await axios(`http://localhost:5000/blog/${id}`)
                console.log(postInfo)
                if(postInfo){
                    const content=postInfo.data.content
                  
                    setPostContent(content)
                    setPostTitle(postInfo.data.title)
                    // setPostContent(content)
                }

            } catch (error) {
                console.log(error)
            }
        }
       if(id) fetchSingleData()
    },[id])
 


    
    const config = useMemo(()=>(
		{
			readonly: false, // all options from https://xdsoft.net/jodit/docs/,
			
		}),
		[]
	);
    axios.defaults.withCredentials=true
    const updatePost=async(e)=>{
        e.preventDefault()
        const formdata=new FormData(form.current)
        
        console.log(formdata)
        try {
            const response=await axios.put('http://localhost:5000/blog/article',{postTitle,postContent,id})
            if(response.status===200){
                console.log(response)
                window.location.href=`/blog/${id}`
            }else{
                console.log('error')
            }
        } catch (error) {
            console.log(error)
        }

    }
    return(
         <div className="articledetail">
            <div className="articledetailsub">
                <form ref={form} className='blogForm' id="formEle" onSubmit={updatePost}>
                    
                    <label htmlFor="title">Article Title:</label>
                    <input 
                        type="text"
                        placeholder="Enter Blog Title"
                        value={postTitle}
                        onChange={postvalue}
                        id="blogtitle"
                        className="titleclass"
                        name="title"
                    
                    />
                     <label htmlFor="content">Article Content:</label>
                   <JoditEditor
                        ref={editor}
                        value={postContent}
                        config={config}
                        tabIndex={1} // tabIndex of textarea
                         // preferred to use only this option to update the content for performance reasons
                        onChange={newContent => setPostContent(postContent)}
                        name='content'
                        className="editor"
                        // onBlur={newContent => setPostContent(newContent.target.innerHTML)}
		            />
                    
                   
                   
                    
                    <button className="subButton" onSubmit={updatePost}>Update Article</button>
                </form>
            </div>
        </div>
    )
}

export default EditBlog