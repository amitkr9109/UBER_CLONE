import React, { useContext, useEffect, useRef, useState } from 'react'
import {useGSAP} from "@gsap/react"
import gsap from 'gsap';
import LocationSearchPanel from '../components/LocationSearchPanel';
import AllVehicleShow from '../components/AllVehicleShow';
import VehicleSelectedConfirmRide from '../components/VehicleSelectedConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';
import { socketDataContext } from '../context/SocketContext';
import { userDataContext } from '../context/UserContext';
import LiveTrackingHome from '../components/LiveTrackingHome'

const UserHome = () => {

  const [pickUp, setPickUp] = useState("");
  const [destination, setDestination] = useState("");

  const [panelOpen, setPanelOpen] = useState(false);
  const [locationSelectPanel, setLocationSelectPanel] = useState(false);
  const [vehicleSelectRidePanel, setvehicleSelectRidePanel] = useState(false);
  const [vehicleLookingDriver, setVehicleLookingDriver] = useState(false);
  const [vehicleWaitingDriver, setVehicleWaitingDriver] = useState(false);

  const panelOpenRef = useRef(null);
  const panelCloseRef = useRef(null);
  const locationSelectPanelRef = useRef(null);
  const vehicleSelectRidePanelRef = useRef(null);
  const vehicleLookingDriverRef = useRef(null);
  const vehicleWaitingDriverRef = useRef(null);

  const [pickUpSuggestions, setPickUpSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [error, setError] = useState("");
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const [ride, setRide] = useState(null);


  const { socket } = useContext(socketDataContext);
  const { user } = useContext(userDataContext);

  const navigate = useNavigate();
  
  useEffect(() => {
    socket.emit("join", { userId: user._id, userType: "user" });
  }, [user]);

  socket.on("ride-confirmed", ride => {
    setVehicleLookingDriver(false)
    setVehicleWaitingDriver(true)
    setRide(ride)
  })

  socket.on("ride-started", ride => {
    setVehicleWaitingDriver(false);
    navigate("/user-ride", { state: { ride, vehicleType } });
  })
  

  const submitHandler = (e) => {
    e.preventDefault();
  }

  useGSAP(() => {
    if(panelOpen) {
      gsap.to(panelOpenRef.current, {
        height: "70%"
      })
      gsap.to(panelCloseRef.current, {
        opacity: 1,
      })
    }
    else {
      gsap.to(panelOpenRef.current, {
        height: "0%"
      })
      gsap.to(panelCloseRef.current, {
        opacity: 0
      })
    }
  }, [panelOpen]);

  useGSAP(() => {
    if(locationSelectPanel){
      gsap.to(locationSelectPanelRef.current, {
        transform: "translateY(0)"
      })
    }
    else{
      gsap.to(locationSelectPanelRef.current, {
        transform: "translateY(100%)"
      })
    }
  }, [locationSelectPanel]);

  useGSAP(() => {
    if(vehicleSelectRidePanel) {
      gsap.to(vehicleSelectRidePanelRef.current, {
        transform: "translateY(0)",
        height: "auto"
      })
    }
    else{
      gsap.to(vehicleSelectRidePanelRef.current, {
        transform: "translateY(100%)",
        height: "0%"
      })
    }
  }, [vehicleSelectRidePanel]);

  useGSAP(() => {
    if(vehicleLookingDriver) {
      gsap.to(vehicleLookingDriverRef.current, {
        transform: "translateY(0)",
        height: "auto"
      })
    }
    else{
      gsap.to(vehicleLookingDriverRef.current, {
        transform: "translateY(100%)",
        height: "0%"
      })
    }
  }, [vehicleLookingDriver]);

  useGSAP(() => {
    if(vehicleWaitingDriver) {
      gsap.to(vehicleWaitingDriverRef.current, {
        transform: "translateY(0)"
      })
    }
    else{
      gsap.to(vehicleWaitingDriverRef.current, {
        transform: "translateY(100%)"
      })
    }
  }, [vehicleWaitingDriver]);


  const handleLogout = async () => {

    const confirm = window.confirm("Are you sure you want to logout user?");
    if (!confirm) return;

    try {
      await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      localStorage.removeItem("token");
      toast.success("User Logout successfull!");
      navigate("/user-login");
    } catch (error) {
      throw error;
    }
  }

  const handlePickUpChange = async (e) => {
    setError("");
    setPickUp(e.target.value);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: {input: e.target.value},
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        } 
      });
      setPickUpSuggestions(response.data.suggestions);
    } catch (err) {
      throw err;
    }
  };

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
    setError("");
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: {input: e.target.value},
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        } 
      });
      setDestinationSuggestions(response.data.suggestions);
    } catch (err) {
      throw err;
    }
  }; 

  async function fareShowing (pick, dest) {
    
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
        params: { pickup: pick.trim(), destination: dest.trim() }, 
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setFare(response.data.fare);
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    if(pickUp && destination) {
      fareShowing(pickUp, destination)
    }
  }, [pickUp, destination]);


  async function createRide () {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
        pickup: pickUp,
        destination,
        vehicleType
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })

    } catch (error) {
      throw error;
    }
  };


  return (
    <>
      <main className='h-screen w-full relative overflow-hidden'>
        <div className={`upper-logo-div fixed flex items-center justify-between w-full p-2 ${panelOpen ? "opacity-0 pointer-events-none" : "opacity-100 z-50"}`}>
          <div className="logo-image w-25">
            <img className='w-full' src="https://www.logo.wine/a/logo/Uber/Uber-Logo.wine.svg" alt="" />
          </div>
          <button onClick={handleLogout} className='bg-white w-12 h-12 flex items-center justify-center rounded-full cursor-pointer active:scale-95 shadow-md transition-all duration-300' >
            <i className="ri-logout-box-line"></i>
          </button>
        </div>
        <div className="map-image h-screen w-screen">
          <LiveTrackingHome />
        </div>
        <div className="w-full h-screen absolute top-0 flex flex-col justify-end pointer-events-none">
          <div className="bg-white w-full h-[30%] p-5 relative pointer-events-auto">
            <div className="heading flex items-center justify-between">
              <h1 className='font-semibold text-2xl'>Find a trip</h1>
              <h4 ref={panelCloseRef} onClick={() => {setPanelOpen(false)}} className='font-semibold text-2xl opacity-0 cursor-pointer active:scale-95'><i className="ri-arrow-down-wide-line"></i></h4>
            </div>
            <form onSubmit={submitHandler}>
              <div className="line-container absolute mt-9 ml-4 flex flex-col items-center gap-1">
                <div className="icon-upper"><i className="ri-radio-button-fill"></i></div>
                <div className="line w-[2px] h-16 bg-black rounded-full"></div>
                <div className="icon-down"><i className="ri-camera-2-fill"></i></div>
              </div>
              <input
                type="text"
                placeholder='Add a pick-up location'
                onClick={() => {
                  setPanelOpen(true)
                  setActiveField("pickUp")
                }}
                value={pickUp}
                onChange={handlePickUpChange}
                className='bg-[#eeee] px-14 py-5 w-full rounded-md text-base my-5' 
              />
              <input
                type="text" 
                placeholder='Enter your destination'
                onClick={() => {
                  if(!pickUp) {
                    toast.error("Please select pick-up location first");
                    return;
                  }
                  setPanelOpen(true)
                  setActiveField("destination")
                }}
                value={destination}
                onChange={handleDestinationChange}
                className='bg-[#eeee] px-14 py-5 w-full rounded-md text-base my-2' 
              />
            </form>  
          </div>
          <div ref={panelOpenRef} className="bg-white w-full h-0 pointer-events-auto">
            <LocationSearchPanel 
              suggestions={activeField === "pickUp" ? pickUpSuggestions : destinationSuggestions}
              setLocationSelectPanel={setLocationSelectPanel}
              setPanelOpen={setPanelOpen} 
              setPickUp={setPickUp}
              setDestination={setDestination}
              activeField={activeField}
              pickUp={pickUp}
              fareShowing={fareShowing}
            />
          </div>
          <div ref={locationSelectPanelRef} className="bg-white w-full z-10 fixed translate-y-full rounded-t-2xl pointer-events-auto">
            <AllVehicleShow 
              setvehicleSelectRidePanel={setvehicleSelectRidePanel} 
              setPanelOpen={setPanelOpen} 
              setLocationSelectPanel={setLocationSelectPanel}
              fare={fare}
              setVehicleType={setVehicleType}
            />
          </div>
          <div ref={vehicleSelectRidePanelRef} className="bg-white w-full z-10 fixed translate-y-full rounded-t-2xl pointer-events-auto">
            <VehicleSelectedConfirmRide 
              setvehicleSelectRidePanel={setvehicleSelectRidePanel} 
              setVehicleLookingDriver={setVehicleLookingDriver} 
              pickUp={pickUp}
              destination={destination}
              fare={fare}
              vehicleType={vehicleType}
              createRide={createRide}
            />
          </div>
          <div ref={vehicleLookingDriverRef} className="bg-white w-full z-10 fixed translate-y-full rounded-t-2xl pointer-events-auto">
            <LookingForDriver 
              setVehicleLookingDriver={setVehicleLookingDriver}   
              setVehicleWaitingDriver={setVehicleWaitingDriver}
              pickUp={pickUp}
              destination={destination}
              fare={fare}
              vehicleType={vehicleType}
            />
          </div>
          <div ref={vehicleWaitingDriverRef} className="bg-white w-full z-10 fixed translate-y-full rounded-t-2xl pointer-events-auto">
            <WaitingForDriver 
              setVehicleWaitingDriver={setVehicleWaitingDriver}
              ride={ride}
              vehicleType={vehicleType}
            />
          </div>
        </div>
      </main>
    </>
  )
}

export default UserHome;