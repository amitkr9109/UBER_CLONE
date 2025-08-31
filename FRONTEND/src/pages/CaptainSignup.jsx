import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { captainDataContext } from '../context/CaptainContext'
import axios from 'axios';
import { toast } from 'react-toastify';

const CaptainSignup = () => {

  const { captain, setCaptain } = useContext(captainDataContext);
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    const newData = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType
      }
    }
    try {
      
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, newData);
      if(response.status === 200) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem("token", data.token);
        navigate("/captain-home");
        toast.success("Captain register successfully");
      }

    } catch (err) {
      if(err.response && err.response.data) {
        if(Array.isArray(err.response.data.errors)) {
          const validationMessages = err.response.data.errors.map(c => c.msg);
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
    setVehicleColor("");
    setVehiclePlate("");
    setVehicleCapacity("");
    setVehicleType("");
  };


  return (
    <>
      <main className='w-full h-screen p-5 flex flex-col justify-between'>
        <div className="form-div">
          <img className='w-25 mb-5' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSVCO4w_adxK32rCXFeKq3_NbLcR9b_js14w&s" alt="" />
          <form onSubmit={submitHandler}>
            <h3 className='font-semibold text-xl'>What's our captain's name</h3>
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
            <h3 className='font-semibold text-xl mt-5'>What's our captain's email</h3>
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
            <h3 className='font-semibold text-xl pt-5'>Vehicle Information</h3>
            <div className="flex gap-4 mb-7">
              <input
                required
                type="text" 
                placeholder='Vehicle Color' 
                value={vehicleColor}
                onChange={(e) => {setVehicleColor(e.target.value)}}
                className='font-medium bg-[#eeeeee] w-1/2 text-lg px-4 py-3 border-none rounded mt-2 placeholder:text-base' 
              />
              <input
                required
                type="text" 
                placeholder='Vehicle Plate' 
                value={vehiclePlate}
                onChange={(e) => {setVehiclePlate(e.target.value)}}
                className='font-medium bg-[#eeeeee] w-1/2 text-lg px-4 py-3 border-none rounded mt-2 placeholder:text-base' 
              />
            </div>
            <div className="flex gap-4 mb-7">
              <input
                required
                type="number" 
                placeholder='Vehicle Capacity' 
                value={vehicleCapacity}
                onChange={(e) => {setVehicleCapacity(e.target.value)}}
                className='font-medium bg-[#eeeeee] w-1/2 text-lg px-4 py-3 border-none rounded mt-2 placeholder:text-base' 
              />
              <select
                required
                className='bg-[#eeeeee] w-1/2 text-sm px-4 py-3 border-none rounded mt-2 placeholder:text-base' 
                value={vehicleType}
                onChange={(e) => {setVehicleType(e.target.value)}}
              >
                <option value="" disabled>Select Vehicle Type</option>
                <option value="car">Car</option>
                <option value="auto">Auto</option>
                <option value="motorcycle">Moto</option>
              </select>
            </div>

            {error.length > 0 && (
              <div className="text-red-500 text-sm text-center">
                {error.map((errMsg, idx) => (
                  <div key={idx}>{errMsg}</div>
                ))}
              </div>
            )} 

            <button className='flex items-center justify-center px-4 py-3 bg-[#1e1d1d] text-white w-full rounded-md mt-10 mb-5 font-medium text-xl cursor-pointer active:scale-95 hover:bg-[#000000] transition-all border-none'>Create captain account</button>
          </form>
          <p className='font-medium text-xl'>
            Already have an account?   
            <Link to="/captain-login"><span className='text-blue-700 underline active:scale-95 text-lg'> Log in captain.</span></Link>
          </p>
        </div>
        <p className='text-sm'>This site is protected by reCAPTCHA and the <span className='underline text-blue-600 cursor-pointer'>Google Privacy Policy</span> and terms of Service apply.</p>
      </main>
    </>
  )
}

export default CaptainSignup;