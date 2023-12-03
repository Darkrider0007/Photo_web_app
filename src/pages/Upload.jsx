/* eslint-disable no-unused-vars */
import React from 'react'
import { LeftSideBar, UploadPhoto } from '../components'

function Upload() {

  
  return (
    <>
        <div className='min-h-full flex flex-row '>
        <div className='block'>
          <LeftSideBar />
        </div>
        <div className='w-full'>
          <UploadPhoto/>
        </div>
        </div>
    </>
  )
}

export default Upload