import React from 'react'
import Logo from '../Logo'
import { useNavigate } from 'react-router-dom'
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
    <div className='min-w-full h-[10vh] bg-white shadow-md  sticky top-0 z-50 flex px-4 justify-between items-center '>
          
        <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 ">
            <Logo/>
          </div>

<div className='flex-1 text-base text-gray-700 gap-4 flex justify-center items-center list-none sm:text-base'>
 { navItems.map((item)=>{
  const isActive= location.pathname===item.path
  return(
    <li key={item.name} className=''>

      <button className={`sm:px-4 text-gray-700 hover:text-indigo-700 ${isActive?' text-indigo-700':null}`} onClick={()=>navigate(item.path)}>{item.name}</button>
    </li>
  )

 })}
 
</div>

    <div className=''>
      <NavButton/>
    
    </div>

    </div>
    
    </>
  )
}

export default Header
