import React from 'react'



function Button({
    children,
    type='button',
    textColor='text-white',
    bgColor='bg-indigo-700',
    className='',
    ...props
}) 


{
 

  return (
<>
<button className={`w-[100%] h-[100%] p-2 ${textColor} ${bgColor} ${className} rounded-2xl` }
type={type}
{...props}   >{children}</button>

</>
  )
}

export default Button