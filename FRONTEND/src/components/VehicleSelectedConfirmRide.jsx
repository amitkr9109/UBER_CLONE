import React from 'react'
import { Link } from 'react-router-dom';

const VehicleSelectedConfirmRide = (props) => {

  const vehicleImages = {
    car: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398986/assets/90/34c200-ce29-49f1-bf35-e9d250e8217a/original/UberX.png",
    moto: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png",
    auto: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
  };

  return (
    <>
      <main className='w-full p-5'>
        <div className="flex items-center justify-between">
          <h1 className='font-semibold text-2xl my-5'>Confirm your ride</h1>
          <h4 onClick={() => {props.setvehicleSelectRidePanel(false)}} className='font-semibold text-2xl cursor-pointer active:scale-95'><i className="ri-arrow-down-wide-line"></i></h4>
        </div>
        <div className="heading">
          <h2 className='font-semibold text-center text-xl'>Get started ride</h2>
          <div className="line-container flex gap-5 mt-2">
            <div className="first-line flex">
              <div className="line w-[4vw] h-[2px] bg-gray-500 rounded-l-full opacity-40"></div>
              <div className="line w-[7vw] h-[2px] bg-gray-700 opacity-80"></div>
              <div className="line w-[20vw] h-[2px] bg-blue-700"></div>
              <div className="line w-[7vw] h-[2px] bg-gray-700 opacity-80"></div>
              <div className="line w-[4vw] h-[2px] bg-gray-500 rounded-r-full opacity-40"></div>
            </div>
            <div className="second-line flex">
              <div className="line w-[4vw] h-[2px] bg-gray-500 rounded-l-full opacity-40"></div>
              <div className="line w-[7vw] h-[2px] bg-gray-700 opacity-80"></div>
              <div className="line w-[20vw] h-[2px] bg-blue-700"></div>
              <div className="line w-[7vw] h-[2px] bg-gray-700 opacity-80"></div>
              <div className="line w-[4vw] h-[2px] bg-gray-500 rounded-r-full opacity-40"></div>
            </div>
          </div>
        </div>  
        <div className="vehicle-container relative my-20 mb-40">
          <div className="vehicle-image absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="first-square w-72 h-20 rounded-full bg-blue-100 z-0">
              <div className="absolute -bottom-5 left-0 w-72 h-14 bg-blue-100 rounded-b-full"></div>
              <div className="second-square w-55 h-20 rounded-full bg-blue-200 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"></div>
              <div className="vehicle-image-part w-52 h-34 absolute top-1/2 left-1/2 transform -translate-x-1/2 -mt-2 -translate-y-1/2 ml-3 z-20">
                <img className='w-full h-full object-cover' src={vehicleImages[props.vehicleType]} alt="" />
              </div>
            </div>   
          </div>
        </div>
        <div className="left-right-container flex gap-5 my-10">
          <div className="left-side flex items-center gap-5 rounded-md">
            <h2 className="icon text-2xl"><i className="ri-map-pin-2-fill"></i></h2>
          </div>
          <div className="right-side flex flex-col">
            <h2 className='font-semibold text-2xl'>562/11-A</h2>
            <h4 className="text-lg font-thin pr-2">{props.pickUp}</h4>
            <div className="line w-[90vw] h-[1px] bg-black mt-2"></div>
          </div>
        </div>
        <div className="left-right-container flex gap-5 my-10">
          <div className="left-side flex items-center gap-5 rounded-md">
            <h2 className="icon text-2xl"><i className="ri-checkbox-blank-fill"></i></h2>
          </div>
          <div className="right-side flex flex-col">
            <h2 className='font-semibold text-2xl'>562/11-A</h2>
            <h4 className="text-lg font-thin pr-2">{props.destination}</h4>
            <div className="line w-[90vw] h-[1px] bg-black mt-2"></div>
          </div>
        </div>
        <div className="payment flex items-center gap-5 my-10">
          <h2 className="icon font-semibold text-2xl"><i className="ri-layout-top-fill"></i></h2>
          <div className="right">
            <h1 className='font-semibold text-2xl'>₹{props.fare[props.vehicleType]}</h1>
            <h2 className='font-thin text-xl'>Cash Cash</h2>
          </div>
        </div>
        <button onClick={() => {
          props.setVehicleLookingDriver(true)
          props.createRide()
        }} className='bg-green-600 px-4 py-4 w-full rounded-md text-white active:scale-95 hover:bg-green-700 cursor-pointer transition-all'>Confirm</button>
      </main>
    </>
  )
}

export default VehicleSelectedConfirmRide;