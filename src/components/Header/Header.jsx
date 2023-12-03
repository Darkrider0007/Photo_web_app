/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className='bg-white/10 items-center flex flex-row'>
      <div className='px-3'>
        <Link to='/'>
         <img src="/logo.png" alt="logo" className="w-14 h-14" />
        </Link>        
      </div>
      <div className='w-full flex items-center justify-center text-3xl font-bold py-4 text-[#3EB7B8]'>
        <h1>Photo Web App</h1>
      </div>
    </div>
  )
}

export default Header