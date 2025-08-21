import React from 'react';
import LogoPic from './logoPic.png'; // import relative path from Logo.js

function Logo() {
  return (
    <div className="h-[100%] w-[100%]">
      <img src={LogoPic} alt="logo" className='rounded-2xl' />
    </div>
  );
}

export default Logo;
