import React, { useContext, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import FinishRide from '../components/FinishRide';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import LiveTracking from '../components/LiveTracking';
import { captainDataContext } from '../context/CaptainContext';

const CaptainRiding = () => {

  const [captainCompleteRide, setCaptainCompleteRide] = useState(false);

  const captainCompleteRideRef = useRef(null);

  const location = useLocation();
  const rideData = location.state?.ride;

  const { captain } = useContext(captainDataContext);

  const ride = rideData &&! rideData.captain ? { ...rideData, captain: captain } : rideData; 

  useGSAP(() => {
    if(captainCompleteRide) {
      gsap.to(captainCompleteRideRef.current, {
        transform: "translateY(0)"
      })
    }
    else{
      gsap.to(captainCompleteRideRef.current, {
        transform: "translateY(100%)"
      })
    }
  }, [captainCompleteRide]);

  return (
    <>
      <main className='w-full h-screen'>
        <div className="upper-logo-div fixed flex items-center gap-44 w-full p-2 z-20">
          <div className="logo-image w-20">
            <img className='w-full' src="https://pngimg.com/d/uber_PNG24.png" alt="" />
          </div>
          <Link to="/captain-home" className='w-12 h-12 bg-white flex items-center justify-center rounded-full cursor-pointer text-2xl'><i className='ri-home-5-line'></i></Link>
        </div>
        <div className="map-image-div w-full h-4/5">
          <LiveTracking 
            pickup={ride?.pickup}
            destination={ride?.destination}
            userId={ride?.captain._id}
            userType="captain"
          />
        </div>
        <div className="down-part bg-amber-400 h-1/5 flex items-center justify-between p-5">
          <h1 className='font-semibold text-2xl'>4 Km Away</h1>
          <button onClick={() => {setCaptainCompleteRide(true)}} className='px-8 py-3 bg-green-600 text-white text-xl rounded-md cursor-pointer hover:bg-green-700 active:scale-95'>Finish Ride</button>
        </div>
        <div ref={captainCompleteRideRef} className="w-full bg-white fixed z-10 bottom-0 translate-y-full">
          <FinishRide 
            setCaptainCompleteRide={setCaptainCompleteRide} 
            rideData={rideData}
          />
        </div>
      </main>
    </>
  )
}

export default CaptainRiding;
