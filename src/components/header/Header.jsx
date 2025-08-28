import React, { useState } from 'react'
import Logo from '../Logo'
import { Menu,X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import NavButton from './NavButton'


function Header() {
 const [isOpen,setOpen]=useState(false);
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
    <div className='min-w-full h-[10vh] bg-white shadow-md  sticky top-0 z-50 flex px-4 justify-between items-center '>
          
        <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 cursor-pointer" onClick={()=>{navigate('/')}}>
            <Logo/>
          </div>

<div className='sm:flex hidden  text-base text-gray-700 gap-4 justify-center items-center list-none sm:text-base'>
 { navItems.map((item)=>{
  const isActive= location.pathname===item.path
  return(
    <li key={item.name} className=''>

      <button className={`sm:px-4 text-gray-700 cursor-pointer hover:text-indigo-700 ${isActive?' text-indigo-700':null}`} onClick={()=>navigate(item.path)}>{item.name}</button>
    </li>
  )

 })}
 
</div>
     

    <div className='sm:flex hidden '>
      <NavButton/>
    
    </div>
<div className='sm:hidden flex justify-center item center' onClick={()=>{setOpen(!isOpen)}}>
  <p>{isOpen ?<X /> :<Menu/>}</p>
</div>

{isOpen && (
  <div className="absolute top-[10vh] right-0 bg-white shadow-md flex flex-col space-y-3 w-[50%] p-4 z-40">
    {navItems.map((item) => {
      const isActive = location.pathname === item.path;
      return (
        <li key={item.name} className="list-none">
          <button
            className={`px-4 text-gray-700 cursor-pointer hover:text-indigo-700 ${
              isActive ? "text-indigo-700 font-medium" : ""
            }`}
            onClick={() => {
              navigate(item.path);
              setOpen(false); 
            }}
          >
            {item.name}
          </button>
        </li>
      );
    })}

    <div className=" w-full pt-4">
      <NavButton w='w-full' />
    </div>
  </div>
)}
    </div>

 

    
    </>
  )
}

export default Header
