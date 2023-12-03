/* eslint-disable no-unused-vars */
import React from "react";
import { LeftSideBar } from "../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Home() {
	const authStatus = useSelector((state) => state.auth.status);


	return (
		<>
			<div className="min-h-full flex flex-row ">
				<div className=" block">
					<LeftSideBar />
				</div>
				<div className="container mx-auto p-4 text-center w-full min-h-full flex items-center justify-center flex-col">
					<h1 className="text-4xl font-bold mb-6">Welcome to the Photo Web App!</h1>
					<Link to="/view-photos" className="text-blue-500 hover:underline text-lg">
						Explore Gallery
					</Link>
					{!authStatus && (
						<Link to="/login" className="text-blue-500 hover:underline text-lg">
							Login to Upload Photos
						</Link>
					)}
				</div>
			</div>
		</>
	);
}

export default Home;
