import React from 'react'
import PostForm from '../components/Post-Form'

function AddPost() {
  return (
    <> 
    <div className='w-full text-2xl font-bold p-3 flex justify-center items-center text-indigo-700'><h1>
      Add post
      </h1></div>
    <div className='w-full min-h-full bg-white mb-3'>
     <PostForm/>
    </div>
    </>
  )
}

export default AddPost