import React from 'react'
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <>
      <main className="main w-full h-screen flex flex-col justify-between bg-cover bg-center bg-[url(https://mir-s3-cdn-cf.behance.net/project_modules/max_3840_webp/c5310f182519763.652f3606b64b0.jpg)]">
          <img className='w-25 ml-5 mt-2' src="https://www.logo.wine/a/logo/Uber/Uber-Logo.wine.svg" alt="" />
          <div className="text bg-white px-4 py-2">
            <h2 className='font-semibold text-3xl'>Get Started with Uber</h2>
            <Link to="/user-login" className='flex items-center justify-between px-4 py-3 bg-[#1c1818] text-white w-full rounded-md mt-5 mb-5 font-medium text-2xl cursor-pointer active:scale-95 hover:bg-[#000000] transition-all border-none'>
              <span className='flex-1 text-center'>Continue</span>
              <i className="ri-arrow-right-long-line"></i>
            </Link>
          </div>
      </main>
    </>
  )
}

export default Start;
