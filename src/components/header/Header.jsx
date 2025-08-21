import React from 'react'
import Logo from '../Logo'
import { Link,useNavigate } from 'react-router-dom'
import NavButton from './NavButton'
function Header() {
 
  const navItems=[{
    name:"Home",
   path:'/',
  },
{
  name:"All Posts",
  path:'/allpost',
  
},
{
name:"Add Post",
path:'/addpost',
}
]
const navigate=useNavigate();
  return (
    <>
    <div className='min-w-full h-[10vh] bg-white shadow-md sticky top-0 z-50 flex py-[0.2%] px-[2%] '>
          
          <div className='w-[4%] h-full'>
            <Logo/>
          </div>

<div className='text-base  text-gray-700 gap-2 flex  h-[100%] w-[85%] justify-center items-center list-none'>
 { navItems.map((item)=>{
  const isActive= location.pathname===item.path
  return(
    <li key={item.name} className='h-[50%] w-[10%]'>

      <button className={` text-gray-700 hover:text-indigo-700  w-[100%] h-[100%] p-0.5 rounded-3xl ${isActive?' text-indigo-700':null}`} onClick={()=>navigate(item.path)}>{item.name}</button>
    </li>
  )

 })}
 
</div>

    <div className='w-[12%] h-[100%] flex '>
      <NavButton/>
    
    </div>

    </div>
    
    </>
  )
}

export default Header
