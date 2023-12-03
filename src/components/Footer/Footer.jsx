/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='w-full bg-black/10'>
      <div className='flex flex-col items-center justify-center py-4'>
        <p className='text-gray-500'>© 2023 Rohan Gope. All rights reserved.</p>
       <Link to='https://github.com/Darkrider0007/Photo_web_app' className='text-gray-500 hover:text-gray-600 transition duration-300 cursor-pointer'>git hub repo</Link>
      </div>
    </div>
  );
}

export default Footer;
