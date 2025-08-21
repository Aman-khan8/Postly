import React, { forwardRef } from 'react'
import { useId } from 'react'
function InputFeild({
    label,
    type,
    className='',
    ...props
},ref) {
    const id=useId();
  return (
    <>
    <div className='w-[80%] h-[20%] '>
         {label && <label 
            className='inline-block mb-1 pl-1' 
            htmlFor={id}>
                {label}
            </label>
            }
        <input type={type}
        id={id}
        ref={ref}
        className={`px-3 py-2  bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        {...props} 
         />
    </div>
    </>
  )
}

export default forwardRef(InputFeild)