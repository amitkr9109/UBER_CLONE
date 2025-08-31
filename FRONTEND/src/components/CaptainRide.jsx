import axios from 'axios';
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const CaptainRide = (props) => {

  const [otpFirst, setOTPFirst] = useState("");
  const [otpSecond, setOTPSecond] = useState("");
  const [otpThird, setOTPThird] = useState("");
  const [otpForth, setOTPForth] = useState("");

  const firstRef = useRef(null);
  const secondRef = useRef(null);
  const thirdRef = useRef(null);
  const forthRef = useRef(null);
  const [error, setError] = useState("");

  const navigate = useNavigate("");

  const handleInput = (e, setValue, nextRef) => {
    const val = e.target.value;
    if(/^[0-9]?$/.test(val)) {
      setValue(val);
      if(val && nextRef) {
        nextRef.current.focus();
      }
    }
  };

  const handleKeyDown = (e, setValue, prevRef) => {
    if(e.key === "Backspace" && !e.target.value && prevRef) {
      prevRef.current.focus();
      setValue("");
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const otp = otpFirst + otpSecond + otpThird + otpForth;
    setError("");

    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
        params: {
          rideId: props.ride._id, 
          otp: otp                  
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      if (response.status === 200) {
        props.setCaptainConfirmRide(false);
        props.setCaptainPopUpOpen(false);
        toast.success("ride started");
        navigate("/captain-ride", { state: { ride: props.ride } });
      }

      setOTPFirst("");
      setOTPSecond("");
      setOTPThird("");
      setOTPForth("");
      firstRef.current.focus();

    } catch (err) {
      if (err.response && err.response.data) {
        if(Array.isArray(err.response.data.errors)) {
          const validationMessage = err.response.data.errors.map(c => c.msg);
          setError(validationMessage);
          validationMessage.forEach(msg => toast.error(msg));
        }
        else if(err.response.data.message) {
          setError([err.response.data.message]);
          toast.error(err.response.data.message);
        }
        else{
          setError(["Something went wrong"]);
          toast.error("Something went wrong");
        }
      } else {
        setError(["Server not responding"]);
        toast.error("Server not responding");
      }
    }
  };


  return (
    <>
      <main className='w-full'>
        <div className="heading flex items-center justify-between px-5">
          <h1 className='font-semibold text-2xl my-2'>Confirm this ride to start</h1>
          <h4 onClick={() => {
            props.setCaptainConfirmRide(false)
          }} className='font-semibold text-2xl cursor-pointer active:scale-95'><i className="ri-arrow-down-wide-line"></i></h4>
        </div>
        <div className="upper-part flex items-center justify-between bg-[#eeee] p-5">
          <div className="flex items-center gap-3">
            <div className="image-part w-18 h-18">
              <img className='w-full h-full rounded-full object-cover' src="https://as2.ftcdn.net/v2/jpg/05/89/93/27/1000_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg" alt="" />
            </div>
            <div className="name-part">
              <h1 className='font-semibold text-2xl uppercase'>{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h1>
              <div className="flex gap-2 mt-1">
                <h5 className='font-thin bg-amber-300 px-4 py-0.5 rounded-full w-fit text-sm'>ApplePay</h5>
                <h5 className='font-thin bg-amber-300 px-4 py-0.5 rounded-full w-fit text-sm'>Discount</h5>
              </div>
            </div>
          </div>
          <div className="amount-part">
            <h1 className='font-semibold text-2xl'>${props.ride?.fare}</h1>
            <h5 className='font-medium opacity-70 flex justify-end'>2.2 km</h5>
          </div>
        </div>
        <div className="pickup-dropout-location-div p-5">
          <div className="left-right-container flex gap-5 my-4">
            <div className="left-side flex items-center gap-5 rounded-md">
              <h2 className="icon text-2xl"><i className="ri-map-pin-2-fill"></i></h2>
            </div>
            <div className="right-side flex flex-col">
              <h2 className='font-semibold text-2xl'>562/11-A</h2>
              <h4 className="text-lg font-thin">{props.ride?.pickup}</h4>
            </div>
          </div>
          <div className="line w-full h-[1px] bg-black"></div>
            <div className="left-right-container flex gap-5 my-4">
              <div className="left-side flex items-center gap-5 rounded-md">
                <h2 className="icon text-2xl"><i className="ri-checkbox-blank-fill"></i></h2>
              </div>
            <div className="right-side flex flex-col">
              <h2 className='font-semibold text-2xl'>362/10-B</h2>
              <h4 className="text-lg font-thin">{props.ride?.destination}</h4>
            </div>
          </div>
          <div className="line w-full h-[1px] bg-black"></div>
            <div className="payment flex items-center gap-5 my-4">
              <h2 className="icon font-semibold text-2xl"><i className="ri-layout-top-fill"></i></h2>
              <div className="right">
              <h1 className='font-semibold text-2xl'>₹{props.ride?.fare}</h1>
              <h2 className='font-thin text-xl'>Cash Cash</h2>
            </div>
          </div>
        </div>
        <div className="icon-container px-5 flex items-center justify-between">
          <div className="first-icon h-20 w-30 bg-green-300 flex flex-col items-center justify-center rounded-xl text-white">
            <i className="ri-phone-fill text-xl"></i>
            <h1 className='font-semibold text-xl'>Call</h1>
          </div>
          <div className="first-icon h-20 w-30 bg-blue-500 flex flex-col items-center justify-center rounded-xl text-white">
            <i className="ri-chat-1-fill text-xl"></i>
            <h1 className='font-semibold text-xl'>Message</h1>
          </div>
          <div className="first-icon h-20 w-30 bg-[#bebcbcee] flex flex-col items-center justify-center rounded-xl text-white">
            <i className="ri-delete-bin-6-fill text-xl"></i>
            <h1 className='font-semibold text-xl'>Cancel</h1>
          </div>
        </div>
        <div className="form-div-otp p-5">
          <form onSubmit={submitHandler}>
            <div className="input-container-div flex justify-between mt-10">
              <input
                type="number"
                required
                className='px-4 py-2 bg-[#eee] w-20 h-20 rounded-md'
                value={otpFirst}
                ref={firstRef}
                onChange={(e) => handleInput(e, setOTPFirst, secondRef)}
              />
              <input
                type="number"
                required
                className='px-4 py-2 bg-[#eee] w-20 h-20 rounded-md'
                value={otpSecond}
                ref={secondRef}
                onChange={(e) => handleInput(e, setOTPSecond, thirdRef)}
                onKeyDown={(e) => handleKeyDown(e, setOTPSecond, firstRef)}
              />
              <input
                type="number"
                required
                className='px-4 py-2 bg-[#eee] w-20 h-20 rounded-md'
                value={otpThird}
                ref={thirdRef}
                onChange={(e) => handleInput(e, setOTPThird, forthRef)}
                onKeyDown={(e) => handleKeyDown(e, setOTPThird, secondRef)}
              />
              <input
                type="number"
                required
                className='px-4 py-2 bg-[#eee] w-20 h-20 rounded-md'
                value={otpForth}
                ref={forthRef}
                onChange={(e) => handleInput(e, setOTPForth, null)}
                onKeyDown={(e) => handleKeyDown(e, setOTPForth, thirdRef)}
              />
            </div>
            <button className='flex justify-center font-semibold uppercase bg-amber-400 w-full py-5 rounded-md cursor-pointer text-xl active:scale-95 hover:bg-amber-500 transition-all mt-10'>go to pick up</button>
          </form>
        </div>
        <div className="btn-container flex flex-col gap-2 px-5 py-2">
          <button onClick={() => {
            props.setCaptainConfirmRide(false)
            props.setCaptainPopUpOpen(false)
          }} className='font-semibold uppercase bg-red-600 w-full py-5 rounded-md cursor-pointer text-xl active:scale-95 hover:bg-red-700 transition-all'>cancel ride</button>
        </div>
      </main>
    </>
  )
}

export default CaptainRide;
