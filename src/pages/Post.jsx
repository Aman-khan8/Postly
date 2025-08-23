import React, { useEffect, useState } from 'react'
import userdatabase from '../appwriteservices/databaseConfig'
import { useSelector } from 'react-redux'
import userAuthenication from '../appwriteservices/Auth'
import { Link,useNavigate,useParams } from 'react-router-dom'
import parse from "html-react-parser";
import Button from '../components/Button';
import Loader from '../components/Spinner'


function PostPage() {
   const [post,setPost]=useState(null)
    const {slug} =useParams();
    const navigate=useNavigate();

    const userData=useSelector((state)=>state.userData)
    const isAuthor=post  ? post.userId === userData.$id:false;
     const [user,setuser]=useState({})
 
   useEffect(()=>{
              if(slug){
                userdatabase.getPost(slug).then((p)=>{
                    if(p)
                    setPost(p);
                else
                    navigate("/");
                })
              }
              else{
                navigate('/');
              }

    },[slug])
    function deletePost(){
        const delPost=userdatabase.DeletePost(post.$id)
        if(delPost){
            userdatabase.DeleteFile(post.Picture);
            navigate('/');
        }
        else{
            return(<>
            <h4 className='text-gray-400'>Cannot Find this post in our DataBase</h4></>)
        }
    }
    const url=post?userdatabase.getFilePreview(post.Picture):null;
   
  return post? (
           <>
            <div className="py-1 flex justify-center ">   
            <div className='w-[150vh] min-h-full sm:p-10 pt-10 flex'>
                <div className='w-[50%]'> 
                <div className="w-[80%] flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={url}
                        alt={post.title}
                        className="rounded-xl w-[100%] h-[100%] object-cover"
                    />
                </div>
                {isAuthor && (
                        <div className=" flex sm:ml-[5vh]  mr-[2vh] w-[100%]  gap-2" >
                            <Link to={`/editpost/${post.$id}`}
                             className='py-3 px-5 bg-emerald-500  text-white flex justify-center items-center rounded-2xl'>
                            <div> 
                                Edit
                                </div>
                            </Link>
                            
                            <div   className='w-[30%] h-[100%] '>
                                <Button bgColor='bg-red-500' textColor='text-white' onClick={()=>{userdatabase.DeletePost(post.$id)
                                    navigate('/');
                                }}>   
                            Delete
                            </Button>
                            </div>
                        </div>
                    )}
                    </div>

                <div className='w-[100%] sm:w-[80%] '> 
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="">
                    {parse(post.content?post.content:'')}
                    </div>

              </div>
            </div>
        </div>
           </>    
  ):
  (
    <>
    <div className='w-full h-[60vh] bg-white flex justify-center items-center'>
 <Loader/>
    </div>
    </>
  )
}

export default PostPage