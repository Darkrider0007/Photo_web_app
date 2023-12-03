/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { authLogin } from "../store/authSlice";
import authService from "../firebase/auth.firebase";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

function Login() {
	const [errors, setErrors] = useState("");
	const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();
	const { register, handleSubmit } = useForm();

	const navigate = useNavigate();

	const onSubmit = async (data) => {
		setLoading(true);
		setErrors("");
		try {			
			const user = await authService.login(data.email, data.password);
			if (user) {
				const data = {
					uid: user.uid,
					email: user.email,
				};
				dispatch(authLogin(data));
				navigate("/");
			}
		} catch (error) {
			setLoading(false);
			setErrors(error.code);
		}
	};

	if (loading) {
		return <Loader />;
	}
	return (
		<div>
			{/* Error Field */}
			{errors && <p className="text-red-600 font-bold text-center">{errors}</p>}
			<form onSubmit={handleSubmit(onSubmit)}>
				{/* Email Input */}
				<div className="mb-4">
					<label
						htmlFor="email"
						className="block text-sm font-medium text-white/60"
					>
						Email
					</label>
					<input
						className="mt-1 p-2 w-full border rounded-md text-black"
						label="Email: "
						placeholder="Enter your email"
						type="email"
						{...register("email", {
							required: true,
							validate: {
								matchPatern: (value) =>
									/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
									"Email address must be a valid address",
							},
						})}
					/>
				</div>

				{/* Password Input */}
				<div className="mb-6">
					<label
						htmlFor="password"
						className="block text-sm font-medium text-white/60"
					>
						Password
					</label>
					<input
						label="Password: "
						type="password"
						placeholder="Enter your password"
						{...register("password", {
							required: true,
						})}
						className="mt-1 p-2 w-full border rounded-md text-black"
					/>
				</div>

				{/* Submit Button */}
				<button
					type="submit"
					className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md w-full"
				>
					Login
				</button>
			</form>
		</div>
	);
}

export default Login;
