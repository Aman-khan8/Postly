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
            <button className='w-[10%] bg-indigo-700 text-white rounded-r-2xl '>Search</button>
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
      <div className='w-full mt-3 flex justify-center items-center '>
        <div className='sm:w-[45%] w-[60%] flex'>
          <Input
  placeholder="Search"
  type="text"
  className="rounded-l-2xl"
  value={searchQuery}
  onChange={(e) => {setSearchQuery(e.target.value)
    setSearchStatus(true);
  }}
/>
<button
  onClick={handleSearch}
  className="sm:p-2 p-3 bg-indigo-700 text-white rounded-r-2xl"
>
  <Search/>
</button>

        </div>

      </div>
     <div className='flex flex-wrap w-full min-h-full ml-7 sm:ml-8 gap-8 p-7 '>
  {
post.map((p)=>{
        return(
        <div key={p.$id} className='sm:w-[20%] w-[80%] h-full flex-shrink-0  '>
            <BlogsCard title={p.title} $id={p.$id} featuredPic={p.Picture}/>
        </div>)
    })
  }     
     </div>
    </div>
    </>
    
  ):
  (<>
  {navigate('/login')}
  </>)
}

export default Allpost