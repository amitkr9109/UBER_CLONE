import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userDataContext } from '../context/UserContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const UserLogin = () => {

  const navigate = useNavigate();
  const {user, setUser} = useContext(userDataContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    const newUser = {
      email: email,
      password: password,
    }
    try {
      
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, newUser);
      if(response.status === 200) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem("token", data.token);
        navigate("/user-home");
        toast.success("User login successfully");
      }

    } catch (err) {
      if(err.response && err.response.data) {
        if(Array.isArray(err.response.data.errors)) {
          const validationMessages = err.response.data.errors.map(e => e.msg);
          setError(validationMessages);
          validationMessages.forEach(msg => toast.error(msg));
        }
        else if(err.response.data.message) {
          setError([err.response.data.message]);
          toast.error(err.response.data.message);
        }
        else {
          setError(["something went wrong"]);
          toast.error("something went wrong");
        }
      }
      else{
        setError(["Server not responding"]);
        toast.error("Server not responding");
      }
    }
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <main className='w-full h-screen p-5 flex flex-col justify-between'>
        <div className="form-div">
          <img className='w-25 mb-5' src="https://www.logo.wine/a/logo/Uber/Uber-Logo.wine.svg" alt="" />
          <form onSubmit={submitHandler}>
            <h3 className='font-semibold text-xl'>What's your email</h3>
            <input
              required 
              type="email"
              placeholder='Enter email' 
              value={email}
              onChange={(e) => {setEmail(e.target.value)}}
              className='font-medium bg-[#eeeeee] text-lg px-4 py-3 w-full border-none rounded mt-2 placeholder:text-base' 
            />
            <h3 className='font-semibold text-xl pt-5'>What's your password</h3>
            <input
              required
              type="password" 
              placeholder='Enter password' 
              value={password}
              onChange={(e) => {setPassword(e.target.value)}}
              className='font-medium bg-[#eeeeee] text-lg px-4 py-3 w-full border-none rounded mt-2 placeholder:text-base' 
            />

            {error.length > 0 && (
              <div className="text-red-500 text-sm text-center mt-2">
                {error.map((errMsg, idx) => (
                  <div key={idx}>{errMsg}</div>
                ))}
              </div>
            )}

            <button className='flex items-center justify-center px-4 py-3 bg-blue-600 text-white w-full rounded-md mt-5 mb-5 font-medium text-xl cursor-pointer active:scale-95 hover:bg-blue-800 transition-all border-none'>Log in</button>
          </form>
          <p className='font-medium text-xl'>
            Don't have an account?   
            <Link to="/user-signup"><span className='text-blue-700 underline active:scale-95 text-lg'> Sign up user.</span></Link>
          </p>
        </div>
        <div className="link">
          <Link to="/captain-login" className='flex items-center justify-center px-4 py-3 bg-green-600 text-white w-full rounded-md mt-10 mb-5 font-medium text-xl cursor-pointer active:scale-95 hover:bg-green-800 transition-all border-none'>Sign in as captain</Link>
        </div>
      </main>
    </>
  )
}

export default UserLogin;