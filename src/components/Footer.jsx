import React from 'react'
import Logo from './Logo'
import { Link } from 'react-router-dom'
function Footer() {
  return (
    <>
    
    <div className='min-w-full bg-gray-100 shadow-md bottom-0 h-[50vh] overflow-hidden  p-[2%] flex '>

      <div className='h-full w-[45%] flex flex-wrap '>
      <div className=''> 
      <div className='w-[6.3rem] h-[6.3rem]  mb-[40%] '> 
        <Logo/>
      </div>
      <div>
             <p className="sm:text-sm text-xs mt-[10%] w-[100%] text-gray-700 ">
           &copy; Copyright 2023. All Rights Reserved by DevUI.
        </p>
         </div>
       </div>
      </div>
         <div className="w-full h-full p-[2%] flex gap-x-8">
  
  <div className="flex-1 text-xs  text-gray-600 mt-[1.5%]">
    <h3 className="mb-6 font-semibold uppercase text-indigo-700  text-sm sm:text-xl">
      Company
    </h3>
    <ul>
      <li className="mb-3">
        <Link className="hover:text-gray-500" to="/">Features</Link>
      </li>
      <li className="mb-3">
        <Link className="hover:text-gray-500" to="/">Pricing</Link>
      </li>
      <li className="mb-3">
        <Link className="hover:text-gray-500" to="/">Affiliate Program</Link>
      </li>
      <li>
        <Link className="hover:text-gray-500" to="/">Press Kit</Link>
      </li>
    </ul>
  </div>

  {/* Column 2 */}
  <div className="flex-1 text-xs text-gray-600 mt-[1.5%]">
    <h3 className="mb-6 font-semibold uppercase text-indigo-700  text-sm sm:text-xl">
      Support
    </h3>
    <ul>
      <li className="mb-3"><Link className="hover:text-gray-500" to="/">Account</Link></li>
      <li className="mb-3"><Link className="hover:text-gray-500" to="/">Help</Link></li>
      <li className="mb-3"><Link className="hover:text-gray-500" to="/">Contact Us</Link></li>
      <li><Link className="hover:text-gray-500" to="/">Customer Support</Link></li>
    </ul>
  </div>

  {/* Column 3 */}
  <div className="flex-1 text-xs text-gray-600 mt-[1.5%]">
    <h3 className="mb-6 font-semibold uppercase text-indigo-700 text-sm sm:text-xl">
      Legals
    </h3>
    <ul>
      <li className="mb-3"><Link className="hover:text-gray-500" to="/">Terms & Conditions</Link></li>
      <li className="mb-3"><Link className="hover:text-gray-500" to="/">Privacy Policy</Link></li>
      <li className="mb-3"><Link className="hover:text-gray-500" to="/">Licensing</Link></li>
    </ul>
  </div>
</div>
    </div>
    </>
  )
}

export default Footer
