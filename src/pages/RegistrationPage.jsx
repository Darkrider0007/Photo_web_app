/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Registration } from "../components";
import {useSelector} from 'react-redux'
import { useNavigate } from "react-router-dom";

const RegistrationPage = () => {
  const authStatus = useSelector((state) => state.auth.status)
  const navigation = useNavigate()
  if(authStatus){
    navigation('/')
  }else
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-no-repeat bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1513569771920-c9e1d31714af?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGRhcmslMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D')" }}>

			<div className="bg-white/25 p-10 rounded-xl">
				<div className="p-3">
          <h2 className="text-center text-2xl font-bold leading-tight text-white/80">
            Create your account
          </h2>
          <p className="mt-2 text-center text-base text-white/60">
            Already have any account?&nbsp;
            <Link
              to="/login"
              className="font-medium text-primary transition-all duration-200 text-blue-400 hover:underline hover:text-blue-500"
            >
              Login
            </Link>
          </p>
        </div>
				<Registration/>
			</div>
		</div>
	);
};

export default RegistrationPage;
