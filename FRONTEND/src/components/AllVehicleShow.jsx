import React from 'react'

const AllVehicleShow = (props) => {
  return (
    <>
        <main className='w-full pb-20 px-5 py-5'>
            <div className="upper flex items-center gap-4 bg-[#eee] w-fit rounded-full px-4 py-1 mt-3 mb-10">
                <h4 className='font-medium text-2xl'><i className="ri-time-fill"></i></h4>
                <h2 className='font-medium text-xl'>Leave Now</h2>
                <h4 className='font-medium text-2xl'><i className="ri-arrow-drop-down-line"></i></h4>
            </div>
            <div className="heading flex items-center justify-between">
              <h1 className='font-semibold text-2xl my-5'>Choose a vehicle</h1>
              <h4 onClick={() => {props.setLocationSelectPanel(false)}} className='font-semibold text-2xl cursor-pointer active:scale-95'><i className="ri-arrow-down-wide-line"></i></h4>
            </div>
            
            <div className="all-vehicle-show flex flex-col gap-5">
                <div className="car-vehicle-show w-full flex justify-between border rounded-md border-gray-300 active:border-black px-2 py-2" onClick={() => {
                        props.setvehicleSelectRidePanel(true)
                        props.setPanelOpen(false)
                        props.setVehicleType("car")
                    }}>
                    <div className="image-div w-23 h-20 -mt-4">
                        <img className='w-full h-full object-cover' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
                    </div>
                    <div className="details-div w-1/2 leading-0.5">
                        <div className='flex items-center gap-3'>
                            <h2 className='font-semibold text-xl'>UberGo</h2> 
                            <div className="people flex gap-1">
                                <i className="ri-user-3-fill"></i> <span className='font-thin'>4</span>
                            </div>
                        </div>
                        <h5 className='font-medium text-lg -mt-1'>2 mins away . <span className='opacity-70 text-sm'>15:24</span></h5>
                        <p className='font-medium opacity-70 text-sm -mt-1'>Affordable, compact rides</p>
                    </div>
                    <div className="rupiees-div">
                        <h2 className='font-semibold text-xl'>₹{props.fare.car}</h2>
                    </div>
                </div>
                <div className="motorcycle-vehicle-show w-full flex justify-between border rounded-md border-gray-300 active:border-black px-2 py-2" onClick={() => {
                        props.setvehicleSelectRidePanel(true)
                        props.setPanelOpen(false)
                        props.setVehicleType("moto")
                    }}>
                    <div className="image-div w-20 h-15 mt-2">
                        <img className='w-full h-full object-cover' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
                    </div>
                    <div className="details-div w-1/2 leading-0.5">
                        <div className='flex items-center gap-3'>
                            <h2 className='font-semibold text-xl'>Moto</h2> 
                            <div className="people flex gap-1">
                                <i className="ri-user-3-fill"></i> <span className='font-thin'>1</span>
                            </div>
                        </div>
                        <h5 className='font-medium text-lg -mt-1'>3 mins away . <span className='opacity-70 text-sm'>15:25</span></h5>
                        <p className='font-semibold opacity-70 text-xs -mt-1'>Affordable, motorcycle rides</p>
                    </div>
                    <div className="rupiees-div">
                        <h2 className='font-semibold text-xl'>₹{props.fare.moto}</h2>
                    </div>
                </div>
                <div className="auto-vehicle-show w-full flex justify-between border rounded-md border-gray-300 active:border-black px-2 py-2" onClick={() => {
                        props.setvehicleSelectRidePanel(true)
                        props.setPanelOpen(false)
                        props.setVehicleType("auto")
                    }}>
                    <div className="image-div w-20 h-15 mt-2">
                        <img className='w-full h-full object-cover' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />
                    </div>
                    <div className="details-div w-1/2 leading-0.5">
                        <div className='flex items-center gap-3'>
                            <h2 className='font-semibold text-xl'>UberAuto</h2> 
                            <div className="people flex gap-1">
                                <i className="ri-user-3-fill"></i> <span className='font-thin'>3</span>
                            </div>
                        </div>
                        <h5 className='font-medium text-lg -mt-1'>4 mins away . <span className='opacity-70 text-sm'>15:24</span></h5>
                        <p className='font-medium opacity-70 text-sm -mt-1'>Affordable, auto rides</p>
                    </div>
                    <div className="rupiees-div">
                        <h2 className='font-semibold text-xl'>₹{props.fare.auto}</h2>
                    </div>
                </div>
            </div>
        </main>
    </>
  )
}

export default AllVehicleShow;
