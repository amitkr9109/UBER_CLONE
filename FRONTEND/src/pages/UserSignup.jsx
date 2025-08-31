import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userDataContext } from '../context/UserContext';
import axios from "axios";
import { toast } from "react-toastify"

const UserSignup = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { user, setUser } = useContext(userDataContext);


  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password
    }

    try {

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);
      if(response.status === 200) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem("token", data.token);
        navigate("/user-home");
        toast.success("User register successfully");
      }

    } catch (err) {
      if(err.response && err.response.data) {
        if(Array.isArray(err.response.data.errors)) {
          const validationMessages = err.response.data.errors.map(u => u.msg);
          setError(validationMessages);
          validationMessages.forEach(msg => toast.error(msg));
        }
        else if(err.response.data.message) {
          setError([err.response.data.message]);
          toast.error(err.response.data.message);
        }
        else{
          setError(["Something went wrong"]);
          toast.error("Something went wrong");
        }
      }
      else{
        setError(["Server not responding"]);
        toast.error("Server not responding");
      }
    }   
    
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <main className='w-full h-screen p-5 flex flex-col justify-between'>
        <div className="form-div">
          <img className='w-25 mb-5' src="https://www.logo.wine/a/logo/Uber/Uber-Logo.wine.svg" alt="" />
          <form onSubmit={submitHandler}>
            <h3 className='font-semibold text-xl'>What's your name</h3>
            <div className="first-lastname flex items-center gap-5">
            <input
              required 
              type="text"
              placeholder='First name' 
              value={firstName}
              onChange={(e) => {setFirstName(e.target.value)}}
              className='font-medium bg-[#eeeeee] w-1/2 text-lg px-4 py-3 border-none rounded mt-2 placeholder:text-base' 
            />
            <input
              type="text"
              placeholder='Last name' 
              value={lastName}
              onChange={(e) => {setLastName(e.target.value)}}
              className='font-medium bg-[#eeeeee] w-1/2 text-lg px-4 py-3 border-none rounded mt-2 placeholder:text-base' 
            />
            </div>
            <h3 className='font-semibold text-xl pt-5'>What's your email</h3>
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
              <div className="text-red-500 text-lg text-center mt-2">
                {error.map((errmsg, idx) => (
                  <div key={idx}>{errmsg}</div>
                ))}
              </div>
            )}

            <button className='flex items-center justify-center px-4 py-3 bg-[#1e1d1d] text-white w-full rounded-md mt-5 mb-5 font-medium text-xl cursor-pointer active:scale-95 hover:bg-[#000000] transition-all border-none'>Create user account</button>
          </form>
          <p className='font-medium text-xl'>
            Already have an account?   
            <Link to="/user-login"><span className='text-blue-700 underline active:scale-95 text-lg'> Log in user.</span></Link>
          </p>
        </div>
        <p className='text-sm'>By procedding, you consent to get calls, whatsApp or SMS messages, including by automated means, from uber and its affiliates to the number provided.</p>
      </main>
    </>
  )
}

export default UserSignup;