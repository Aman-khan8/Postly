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
<button className={` py-3 px-4 ${textColor} ${bgColor} ${className} cursor-pointer rounded-2xl` }
type={type}
{...props}   >{children}</button>

</>
  )
}

export default Button