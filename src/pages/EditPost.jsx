import React,{useEffect, useState} from 'react'
import userdatabase from '../appwriteservices/databaseConfig';
import { useNavigate,useParams } from 'react-router-dom'
import PostForm from '../components/Post-Form';
function EditPost() {
const [post,setPost]=useState([]);
const {slug}=useParams();
const navigate=useNavigate();

useEffect(()=>{
    if(slug){
     userdatabase.getPost(slug).then((p)=>{
        setPost(p);
     });
     
     
    }
    else{
        navigate("/");
    }
})
  return (
    post?
    <>
     <div className='w-full text-2xl font-bold p-3 flex justify-center items-center text-indigo-700'><h1>
      Edit post
      </h1></div>
    <PostForm post={post}/>
    </>
    :
    <>
    <div className=' w-full h-[60vh] bg-white flex justify-center items-center'>
              <h3 className='text-gray-400 hover:text-gray-700'> No Post with this ID in Database </h3>
             
        </div>
        </>
  )
}

export default EditPost