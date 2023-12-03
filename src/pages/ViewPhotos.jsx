/* eslint-disable no-unused-vars */
import React from 'react'
import { LeftSideBar, Photos } from '../components'

function ViewPhotos() {
  return (
    <>
        <div className='min-h-full flex flex-row '>
        <div className='block'>
          <LeftSideBar />
        </div>
        <div className='w-full'>
          <Photos/>
        </div>
        </div>
    </>
  )
}

export default ViewPhotos