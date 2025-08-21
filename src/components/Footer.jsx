import React from 'react'
import Logo from './logo'
import { Link } from 'react-router-dom'
function Footer() {
  return (
    <>
    
    <div className='min-w-full bg-gray-100 shadow-md bottom-0 h-[50vh] overflow-hidden  p-[2%] flex '>

      <div className='h-full w-[45%] flex flex-wrap '>
      <div className=''> 
      <div className='w-[6.3rem] h-[6.3rem] mb-[40%] '> 
        <Logo/>
      </div>
      <div>
             <p className="text-sm w-[100%] text-gray-700 ">
           &copy; Copyright 2023. All Rights Reserved by DevUI.
        </p>
         </div>
       </div>
      </div>
          <div className='w-[100%] h-full p-[2%] flex'>
           <div className='w-[33%] h-full text-sm text-gray-600 ml-[6%] mt-[1.5%]'>
              <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-indigo-700">
                                Company
                            </h3>
                <ul>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-gray-900 hover:text-gray-500"
                                        to="/"
                                    >
                                        Features
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-gray-900 hover:text-gray-500"
                                        to="/"
                                    >
                                        Pricing
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-gray-900 hover:text-gray-500"
                                        to="/"
                                    >
                                        Affiliate Program
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className=" text-base font-medium text-gray-900 hover:text-gray-500"
                                        to="/"
                                    >
                                        Press Kit
                                    </Link>
                                </li>
                            </ul>
           </div>

        <div className='w-[33%] h-full text-sm text-gray-600 ml-[6%] mt-[1.5%] '>
              <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-indigo-700">
                                Support
                            </h3>
                <ul>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-gray-900 hover:text-gray-500"
                                        to="/"
                                    >
                                        Account
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-gray-900 hover:text-gray-500"
                                        to="/"
                                    >
                                        Help
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-gray-900 hover:text-gray-500"
                                        to="/"
                                    >
                                        Contact Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className=" text-base font-medium text-gray-900 hover:text-gray-500"
                                        to="/"
                                    >
                                        Customer Support
                                    </Link>
                                </li>
                            </ul>
           </div>

          <div className='w-[33%] h-full text-sm text-gray-600 ml-[6%] mt-[1.5%] '>
              <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-indigo-700">
                                Legals
                            </h3>
                <ul>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-gray-900 hover:text-gray-500"
                                        to="/"
                                    >Terms & Conditions
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-gray-900 hover:text-gray-500"
                                        to="/"
                                    >
                                      Privacy Policy
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-gray-900 hover:text-gray-500"
                                        to="/"
                                    >
                                        Licensing
                                    </Link>
                                </li>
                               
                            </ul>
           </div>


          </div>
    </div>
    </>
  )
}

export default Footer