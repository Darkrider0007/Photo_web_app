/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import {useSelector} from 'react-redux'
import Logout from "./Logout";

const LeftSideBar = () => {
    const authStatus = useSelector((state) => state.auth.status)
  return (
    <div className="bg-gray-800 text-white h-screen flex flex-col w-44  p-4">
      <nav>
        <ul className="space-y-2 gap-4">
          <li className="mb-2">
            <Link
              to="/"
              className="block py-3 px-4 text-xl rounded bg-gray-900/50 hover:bg-white/20 transition duration-300"
            >
              Home
            </Link>
          </li>
          {authStatus && <li className="mb-2">
            <Link
              to="/view-photos"
              className="block py-3 px-4 text-xl rounded bg-gray-900/50 hover:bg-white/20 transition duration-300"
            >
              View Photos
            </Link>
          </li>}
          {authStatus && <li className="mb-2">
            <Link
              to="/upload"
              className="block py-3 px-4 rounded text-xl bg-gray-900/50 hover:bg-white/20  transition duration-300"
            >
              Upload
            </Link>
          </li>}
        </ul>
      </nav>
      <div className="h-full flex">
        {!authStatus ? <div className="mt-auto mb-10 ">
          <Link to="/login" className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded flex flex-row items-center justify-between">
            Login &nbsp;
            <svg stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M15.4857 20H19.4857C20.5903 20 21.4857 19.1046 21.4857 18V6C21.4857 4.89543 20.5903 4 19.4857 4H15.4857V6H19.4857V18H15.4857V20Z" fill="currentColor"></path><path d="M10.1582 17.385L8.73801 15.9768L12.6572 12.0242L3.51428 12.0242C2.96199 12.0242 2.51428 11.5765 2.51428 11.0242C2.51429 10.4719 2.962 10.0242 3.51429 10.0242L12.6765 10.0242L8.69599 6.0774L10.1042 4.6572L16.4951 10.9941L10.1582 17.385Z" fill="currentColor"></path></svg>
          </Link>
        </div> :
        <div className="mt-auto mb-10 ">
          <Logout/>
        </div>}
      </div>
    </div>
  );
};

export default LeftSideBar;
