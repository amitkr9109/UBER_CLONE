import React from 'react'

const WaitingForDriver = (props) => {

  const vehicleImages = {
    car: "https://d1wsfdvq5y3rer.cloudfront.net/production/vehicle/public/8751335-Spresso%20updated%20image-b45987c5-f20b-48f4-955f-67d21d9efcb1.jpg",
    moto: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png",
    auto: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
  };

  return (
    <>
      <main className='w-full p-5'>
        <div className="flex items-center justify-between">
          <h1 className='font-semibold text-2xl'>Waiting for driver</h1>
          <h4 className='font-semibold text-2xl cursor-pointer active:scale-95' onClick={() => {props.setVehicleWaitingDriver(false)}}><i className="ri-arrow-down-wide-line"></i></h4>
        </div>
        <div className="left-right-container flex items-center justify-between my-10">
          <div className="left flex relative">
            <div className="image w-18 h-18 absolute mt-2">
              <img className='w-full h-full rounded-full object-cover' src="https://as2.ftcdn.net/v2/jpg/05/89/93/27/1000_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg" alt="" />
            </div>
            <div className="image w-40 h-24">
              <img className='w-full h-full object-cover rounded-full' src={vehicleImages[props.vehicleType]} alt="" />
            </div>
          </div>
          <div className="right flex flex-col">
            <h1 className='font-medium text-lg uppercase flex justify-end'>{props.ride?.captain.fullname.firstname + " " + props.ride?.captain.fullname.lastname}</h1>
            <h2 className='font-semibold uppercase text-2xl flex justify-end'>{props.ride?.captain.vehicle.plate}</h2>
            <p className='font-thin text-lg flex justify-end'>White Suziki S-Presso LXI</p>
            <div className="flex justify-end gap-2">
              <h3 className='font-medium text-xl'>Otp :- {props.ride?.otp}</h3>
            </div>
          </div>
        </div>
        <div className="icon-div-container my-10 flex justify-between text-center px-5">
          <div className="first-icon">
            <div className="w-20 h-20 bg-[#eeee] rounded-full flex items-center justify-center">
              <i className="ri-shield-check-fill text-4xl text-blue-600"></i>
            </div>
            <h2 className='font-semibold text-lg'>Safety</h2>
          </div>
          <div className="second-icon">
            <div className="w-20 h-20 bg-[#eeee] rounded-full flex items-center justify-center ml-3">
              <i className="ri-rfid-line text-4xl text-blue-600"></i>
            </div>
            <h2 className='font-semibold text-lg'>Share my trip</h2>
          </div>
          <div className="third-icon">
            <div className="w-20 h-20 bg-[#eeee] rounded-full flex items-center justify-center">
              <i className="ri-phone-fill text-4xl text-blue-600"></i>
            </div>
            <h2 className='font-semibold text-lg'>Call driver</h2>
          </div>
        </div>
        <div className="line w-[100vw] h-[1px] bg-gray-500 -ml-5"></div>
        <div className="left-right-container flex gap-5 my-5">
          <div className="left-side flex items-center gap-5 rounded-md">
            <h2 className="icon text-2xl"><i className="ri-map-pin-2-fill"></i></h2>
          </div>
          <div className="right-side flex flex-col">
            <h2 className='font-semibold text-2xl'>562/11-A</h2>
            <h4 className="text-lg font-thin pr-2">{props.ride?.pickup}</h4>
            <div className="line w-[90vw] h-[1px] bg-black mt-2"></div>
          </div>
        </div>
        <div className="left-right-container flex gap-5 my-3">
          <div className="left-side flex items-center gap-5 rounded-md">
            <h2 className="icon text-2xl"><i className="ri-checkbox-blank-fill"></i></h2>
          </div>
          <div className="right-side flex flex-col">
            <h2 className='font-semibold text-2xl'>462/10-B</h2>
            <h4 className="text-lg font-thin pr-2">{props.ride?.destination}</h4>
            <div className="line w-[90vw] h-[1px] bg-black mt-2"></div>
          </div>
        </div>
        <div className="payment flex items-center gap-5">
          <h2 className="icon font-semibold text-2xl"><i className="ri-layout-top-fill"></i></h2>
          <div className="right">
            <h1 className='font-semibold text-2xl'>₹{props.ride?.fare}</h1>
            <h2 className='font-thin text-xl'>Cash Cash</h2>
          </div>
        </div>
      </main>
    </>
  )
}

export default WaitingForDriver;
