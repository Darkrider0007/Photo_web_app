/* eslint-disable no-unused-vars */
import React from 'react'
import authService from '../../firebase/auth.firebase'
import { useDispatch } from 'react-redux'
import { authLogout } from '../../store/authSlice'
import { useNavigate } from 'react-router-dom'

function Logout() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            await authService.logout()
            dispatch(authLogout())
            navigate('/')
        }
        catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
        <button 
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded flex flex-row items-center justify-between">
            Logout &nbsp;
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 13L16 11 7 11 7 8 2 12 7 16 7 13z"></path><path d="M20,3h-9C9.897,3,9,3.897,9,5v4h2V5h9v14h-9v-4H9v4c0,1.103,0.897,2,2,2h9c1.103,0,2-0.897,2-2V5C22,3.897,21.103,3,20,3z"></path></svg>
        </button>
    </div>
  )
}

export default Logout