/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Login } from "../components";
const LoginPage = () => {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-no-repeat bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1526289034009-0240ddb68ce3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZGFyayUyMGltYWdlfGVufDB8fDB8fHww')" }}>

			<div className="bg-white/25 p-10 rounded-xl">
				<div className="p-3">
          <h2 className="text-center text-2xl font-bold leading-tight text-white/80">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-base text-white/60">
            Don&apos;t have any account?&nbsp;
            <Link
              to="/register"
              className="font-medium text-primary transition-all duration-200 text-blue-400 hover:underline hover:text-blue-500"
            >
              Sign Up
            </Link>
          </p>
        </div>
				<Login/>
			</div>
		</div>
	);
};

export default LoginPage;
