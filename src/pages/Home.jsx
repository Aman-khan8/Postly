import React, { useState, useEffect } from 'react'
import BlogsCard from '../components/BlogsCard'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'
import userdatabase from '../appwriteservices/databaseConfig'
import Loader from '../components/Spinner'

const i = { 1: '<', 2: '>' }

function Home() {
  const [post, setPost] = useState([])
  const [translateX, setTranslateX] = useState(0)

  const navigate = useNavigate()
  useEffect(() => {
    userdatabase.getPosts().then((posts) => {
      if (posts) setPost(posts.documents)
    })
   }, [])

  if (post.length === 0) {
    return (
      <div className="w-full h-[60vh] bg-white flex justify-center items-center">
        <div>
          <Loader/>       
        </div>
      </div>
    )
  }

 
  const slideLeft = () => setTranslateX((prev) => Math.min(prev + 300, 0))

  const slideRight = () => {
    const maxTranslate =
      -(post.length * 280 - window.innerWidth + 80) 
    setTranslateX((prev) => Math.max(prev - 300, maxTranslate))
  }

  return (
    <div className="min-h-full  w-full">
      <div className="w-full flex justify-center items-center mt-10 text-3xl font-bold text-indigo-700">
        <h1>Welcome home to your thoughts</h1>
      </div>


      <div className="relative w-full  mt-6 p-4 ">
        <div className='text-2xl mb-5 w-full pl-10 font-bold text-indigo-700  '> <h3>Recent Posts</h3></div>
  
        <div className="overflow-hidden ">
               <div className="absolute left-2 top-50 flex items-center z-10">
  <button
    onClick={slideLeft}
    className="bg-indigo-600 text-white shadow-md rounded-full w-10 h-10 text-xl flex justify-center items-center font-bold
               hover:bg-indigo-700 hover:scale-110 transition-transform duration-200"
  >
    {i[1]}
  </button>
</div>

<div className="absolute top-50 right-2 flex items-center z-10">
  <button
    onClick={slideRight}
    className="bg-indigo-600 text-white shadow-md rounded-full w-10 h-10 text-xl flex justify-center items-center font-bold
               hover:bg-indigo-700 hover:scale-110 transition-transform duration-200"
  >
    {i[2]}
  </button>
</div>
          <div
            className="flex gap-6 transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(${translateX}px)` }}
          >
            {post.map((p) => {
             
                return(
              <div
                key={p.$id}

                className="flex-shrink-0 w-[250px]" 
              >  
            
                <BlogsCard
                  title={p.title}
                  $id={p.$id}
                  featuredPic={p.Picture}
                
                  className={'hover:bg-gray-200  duration-200'}
                />
              </div>)
})}
          </div>
            <div className='w-[95%] h-[30vh] flex justify-end '>
          <div className='w-[10%] mt-[10px] h-[20%]'> 
          <Button children={'See All'} onClick={()=>{
            navigate('/allpost')

          }}/>
</div>
        </div>
        </div>
       
      </div>

     
    </div>
  )
}

export default Home
