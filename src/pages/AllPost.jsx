import React, { useState,useEffect } from 'react'
import BlogsCard from '../components/BlogsCard'
import userdatabase from '../appwriteservices/databaseConfig'
import { useNavigate } from 'react-router-dom'
import Input from '../components/Input'
import Loader from '../components/Spinner'
import { Search } from 'lucide-react'
import { useSelector } from 'react-redux'


function Allpost() {
  const [post,setpost]=useState([])
 const navigate=useNavigate();
const [searchQuery, setSearchQuery] = useState("");
const userStatus=useSelector((state)=>state.userCurrentState)
const [searchStatus, setSearchStatus]=useState(false);
 useEffect(()=>{
   userdatabase.getPosts().then((posts)=>{
    if(posts){
        setpost(posts.documents)
    }
   })

 },[])

   async function handleSearch() {
  if (!searchQuery.trim()) {
    const posts = await userdatabase.getPosts();
    if (posts) setpost(posts.documents);
    return;
  }

  const result = await userdatabase.searchPost(searchQuery);
  if (result) {
    setpost(result.documents);
  
  } else {
    setpost([]);
  }
}


useEffect(()=>{
  if(searchQuery.trim()===''&&searchStatus){
    userdatabase.getPosts().then((posts)=>{
    if(posts){
        setpost(posts.documents)
    }
   })
    navigate('/allpost')
    
  }
},[searchQuery])

if(post.length==0){

    return(<>
    <div className=' w-full flex justify-center'> 
     <div className='w-[45%] flex justify-center mt-2'>
            <Input  placeholder={'Search'} type={'text'} className='rounded-l-2xl'/>
 <button className=' px-2 bg-indigo-700 flex justify-center items-center text-white rounded-r-2xl'> <Search/></button>
        </div>
        </div>
        <div className=' w-full h-[60vh] bg-white flex justify-center items-center'>
          
          <div className='w-full mt-3 flex justify-center items-center '>
       <Loader/>
      </div>
            <div > 
              
              </div>
        </div>
    
    </>)
}
  return userStatus?(
    <>
    <div className='min-h-full bg-white w-full  '>
      <div className='w-full mt-3  flex justify-center items-center '>
        <div className='sm:w-[40%] w-[60%] flex' >
          <Input
  placeholder="Search"
  type="text"
  className="rounded-l-2xl"
  value={searchQuery}
  onChange={(e) => {setSearchQuery(e.target.value)
    setSearchStatus(true);
  }}
/>

 <button className=' sm:px-4
  px-2 bg-indigo-700 flex justify-center items-center text-white rounded-r-2xl'  onClick={handleSearch} > <Search/></button>
        </div>

      </div>
    <div className="flex flex-wrap mt-4
     sm:ml-3 w-full min-h-full gap-8 px-7 overflow-x-hidden">
  {post.map((p) => (
    <div key={p.$id} className="sm:w-[20%] w-full h-full">
      <BlogsCard title={p.title} $id={p.$id} featuredPic={p.Picture} />
    </div>
  ))}
</div>
    </div>
    </>
    
  ):
  (<>
  {navigate('/login')}
  </>)
}

export default Allpost