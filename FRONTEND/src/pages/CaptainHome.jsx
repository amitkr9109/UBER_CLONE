import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import CaptainDetails from '../components/CaptainDetails'
import CaptainPopUp from '../components/CaptainPopUp'
import CaptainRide from '../components/CaptainRide'
import { captainDataContext } from '../context/CaptainContext'
import { socketDataContext } from '../context/SocketContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import LiveTrackingHome from '../components/LiveTrackingHome'


const CaptainHome = () => {

  const [captainPopUpOpen, setCaptainPopUpOpen] = useState(false);
  const [captainConfirmRide, setCaptainConfirmRide] = useState(false);
  const [ride, setRide] = useState(null);

  const captainPopUpOpenRef = useRef(null);
  const CaptainConfirmRideRef = useRef(null);


  const { socket } = useContext(socketDataContext);
  const { captain } = useContext(captainDataContext);

  const navigate = useNavigate();

  const handleLogout = async () => {

    const confirm = window.confirm("Are you sure you want to logout captain?");
    if (!confirm) return;

    try {
      await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      localStorage.removeItem("token");
      toast.success("Captain Logout successfull!");
      navigate("/captain-login");
            
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    socket.emit("join", { userId: captain._id, userType: "captain" });

    const updateLocation = () => {
      
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          socket.emit("update-location-captain", {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude
            }
          })
        })
      }
    }

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();

  }, []);

  socket.on("new-ride", (data) => {
    setRide(data);
    setCaptainPopUpOpen(true)
  });

  async function confirmRide () {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
      rideId: ride._id,
      captainId: captain._id
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    toast.success("ride confirmed, please fill this OTP");
    setCaptainPopUpOpen(false)
    setCaptainConfirmRide(true)
    
  }

  useGSAP(() => {
    if(captainPopUpOpen) {
      gsap.to(captainPopUpOpenRef.current, {
        transform: "translateY(0)",
        height: "auto"
      })
    }
    else {
      gsap.to(captainPopUpOpenRef.current, {
        transform: "translateY(100%)",
        height: "0%"
      })
    }
  }, [captainPopUpOpen]);

  useGSAP(() => {
    if(captainConfirmRide) {
      gsap.to(CaptainConfirmRideRef.current, {
        transform: "translateY(0)",
        height: "auto",
      })
    }
    else{
      gsap.to(CaptainConfirmRideRef.current, {
        transform: "translateY(100%)",
        height: "0%"
      })
    }
  }, [captainConfirmRide]);

  return (
    <>
      <main className='w-full h-screen relative overflow-hidden'>
        <div className={`upper-logo-div fixed flex items-center justify-between w-full p-2 ${captainConfirmRide ? "opacity-0 pointer-events-none" : "opacity-100 z-50"}`}>
          <div className="logo-image w-16">
            <img className='w-full' src="https://pngimg.com/d/uber_PNG24.png" alt="" />
          </div>
          <button onClick={handleLogout} className='w-12 h-12 bg-white flex items-center justify-center rounded-full cursor-pointer text-2xl'><i className="ri-logout-box-line"></i></button>
        </div>
        <div className="image-div-upper h-full w-full">
          <LiveTrackingHome />
          
          <CaptainDetails setCaptainPopUpOpen={setCaptainPopUpOpen} />
          <div ref={captainPopUpOpenRef} className="bg-white fixed w-full z-10 bottom-0 translate-y-full rounded-t-xl">
            <CaptainPopUp 
              setCaptainPopUpOpen={setCaptainPopUpOpen} 
              setCaptainConfirmRide={setCaptainConfirmRide} 
              ride={ride}
              confirmRide={confirmRide}
            />
          </div>
          <div ref={CaptainConfirmRideRef} className="bg-white fixed w-full h-screen z-10 bottom-0 translate-y-full rounded-t-xl overflow-y-auto">
            <CaptainRide  
              setCaptainPopUpOpen={setCaptainPopUpOpen}
              setCaptainConfirmRide={setCaptainConfirmRide}
              ride={ride}
            />
          </div>
        </div>
      </main>
    </>
  )
}

export default CaptainHome
