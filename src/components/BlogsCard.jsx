import React from 'react'
import { Link } from 'react-router-dom'
import userdatabase from '../appwriteservices/databaseConfig'


function BlogsCard({$id,title='tittle',featuredPic=null ,className=''}) {

  const Url=userdatabase.getFilePreview(featuredPic)
  return (
    <>
    <Link to={`/post/${$id}`}>
   
   <div className={`w-[100%] h-[100%]  bg-white rounded-xl  p-4 ${className}`}>
            <div className='w-full justify-center mb-1 h-[300px]'>
              
                <img src={Url} alt={title}
              
                className='rounded-xl w-[100%] h-[90%] ' />     

            </div>
            <h2 className='font-bold flex justify-center'>{title}</h2>
            
        </div>
    </Link>


  
    </>
  )
}

export default BlogsCard