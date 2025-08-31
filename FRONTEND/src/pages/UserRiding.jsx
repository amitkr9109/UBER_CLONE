import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { socketDataContext } from '../context/SocketContext';
import { toast } from 'react-toastify';
import LiveTracking from '../components/LiveTracking';

const UserRiding = () => {

  const vehicleImages = {
    car: "https://d1wsfdvq5y3rer.cloudfront.net/production/vehicle/public/8751335-Spresso%20updated%20image-b45987c5-f20b-48f4-955f-67d21d9efcb1.jpg",
    moto: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png",
    auto: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
  };

  const location = useLocation();

  const { ride, vehicleType } = location.state || {}

  const { socket } = useContext(socketDataContext);
  const navigate = useNavigate();

  socket.on("ride-ended", () => {
    toast.warn("Ride Finished !");
    navigate("/user-home");
  });

  return (
    <>
      <main className='w-full h-screen'>
        <div className="upper-logo-div fixed flex items-center gap-38 w-full p-2 z-50">
          <div className="logo-image w-25">
            <img className='w-full' src="https://www.logo.wine/a/logo/Uber/Uber-Logo.wine.svg" alt="" />
          </div>
          <Link to="/user-home" className='w-10 h-10 bg-white flex items-center justify-center rounded-full cursor-pointer text-2xl'><i className='ri-home-5-line'></i></Link>
        </div>
        <div className="image-div-upper h-1/2">
          <LiveTracking 
            pickup={ride?.pickup}
            destination={ride?.destination}
            userId={ride?.user._id}
            userType="user"
          />
        </div>
        <div className="down-div h-1/2 p-5">
          <div className="left-right-container flex items-center justify-between my-2">
            <div className="left flex relative">
              <div className="image w-18 h-18 absolute mt-2">
                <img className='w-full h-full rounded-full object-cover' src="https://as2.ftcdn.net/v2/jpg/05/89/93/27/1000_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg" alt="" />
              </div>
              <div className="image w-40 h-24">
                <img className='w-full h-full object-cover rounded-full' src={vehicleImages[vehicleType]} alt="" />
              </div>
            </div>
            <div className="right flex flex-col">
              <h1 className='font-medium text-lg uppercase flex justify-end'>{ride?.captain.fullname.firstname + " " + ride?.captain.fullname.lastname}</h1>
              <h2 className='font-semibold uppercase text-2xl flex justify-end'>{ride?.captain.vehicle.plate}</h2>
              <p className='font-thin text-sm flex justify-end'>White Suziki S-Presso LXI</p>
              <div className="flex justify-end gap-2">
                <i className="ri-star-fill font-semibold text-xl"></i>
                <h3 className='font-medium text-xl opacity-65'>4.9</h3>
              </div>
            </div>
          </div>
          <div className="left-right-container flex gap-5 my-5">
            <div className="left-side flex items-center gap-5 rounded-md">
              <h2 className="icon text-2xl"><i className="ri-map-pin-2-fill"></i></h2>
            </div>
            <div className="right-side flex flex-col">
              <h2 className='font-semibold text-xl'>562/11-A</h2>
              <h4 className="text-sm font-thin">{ride?.destination}</h4>
            </div>
          </div>
          <div className="line w-full h-[0.1px] bg-black"></div>
          <div className="payment flex items-center gap-5 my-5">
            <h2 className="icon font-semibold text-2xl"><i className="ri-layout-top-fill"></i></h2>
            <div className="right">
              <h1 className='font-semibold text-xl'>₹{ride?.fare}</h1>
              <h2 className='font-thin text-sm'>Cash Cash</h2>
            </div>
          </div>
          <Link to="/user-home" className='flex items-center justify-center bg-green-600 px-4 py-2 w-full rounded-md text-white active:scale-95 hover:bg-green-700 cursor-pointer text-2xl transition-all'>Make a payment</Link>
        </div>
      </main>
    </>
  )
}

export default UserRiding
