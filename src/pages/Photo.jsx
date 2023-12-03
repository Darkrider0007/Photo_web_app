/* eslint-disable no-unused-vars */
import React from 'react'
import { DisplayPhoto, LeftSideBar} from '../components'
import { useParams } from "react-router-dom";

function Photo() {
  const {name} = useParams();
  return (
    <div className='min-h-full flex flex-row '>
        <div className='block'>
          <LeftSideBar />
        </div>
        <div className='w-full h-full'>
          <DisplayPhoto name={name}/>
        </div>
        </div>
  )
}

export default Photo