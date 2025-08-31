import React from 'react'

const CaptainPopUp = (props) => {
  return (
    <>
        <main className='w-full'>
            <div className="heading flex items-center justify-between px-5">
              <h1 className='font-semibold text-2xl my-5'>Ride Available!</h1>
              <h4 onClick={() => {props.setCaptainPopUpOpen(false)}} className='font-semibold text-2xl cursor-pointer active:scale-95'><i className="ri-arrow-down-wide-line"></i></h4>
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
                <h1 className='font-semibold text-2xl'>$325.00</h1>
                <h5 className='font-medium opacity-70 flex justify-end'>2.2 km</h5>
              </div>
            </div>
            <div className="pickup-dropout-location-div p-5">
                <div className="left-right-container flex gap-5 my-5">
                    <div className="left-side flex items-center gap-5 rounded-md">
                        <h2 className="icon text-2xl"><i className="ri-map-pin-2-fill"></i></h2>
                    </div>
                    <div className="right-side flex flex-col">
                        <h2 className='font-semibold text-2xl'>562/11-A</h2>
                        <h4 className="text-lg font-thin">{props.ride?.pickup}</h4>
                    </div>
                </div>
                <div className="line w-full h-[1px] bg-black"></div>
                <div className="left-right-container flex gap-5 my-5">
                    <div className="left-side flex items-center gap-5 rounded-md">
                        <h2 className="icon text-2xl"><i className="ri-checkbox-blank-fill"></i></h2>
                    </div>
                    <div className="right-side flex flex-col">
                        <h2 className='font-semibold text-2xl'>362/10-B</h2>
                        <h4 className="text-lg font-thin">{props.ride?.destination}</h4>
                    </div>
                </div>
                <div className="line w-full h-[1px] bg-black"></div>
                <div className="payment flex items-center gap-5 my-5">
                    <h2 className="icon font-semibold text-2xl"><i className="ri-layout-top-fill"></i></h2>
                    <div className="right">
                        <h1 className='font-semibold text-2xl'>₹{props.ride?.fare}</h1>
                        <h2 className='font-thin text-xl'>Cash Cash</h2>
                    </div>
                </div>
            </div>
            <div className="btn-container p-5 flex justify-end gap-5">
              <button onClick={() => {
                props.setCaptainPopUpOpen(false)
              }}  
              className='font-semibold text-xl opacity-70 bg-[#eeee] px-10 py-3 rounded-md cursor-pointer active:scale-95 hover:bg-[#45444426] transition-all'>Ignore</button>
              <button onClick={() => {
                props.setCaptainConfirmRide(true)
                props.confirmRide()
              }} className='font-semibold text-xl bg-amber-400 px-10 py-3 rounded-md cursor-pointer active:scale-95 hover:bg-amber-500 transition-all'>Accept</button>
            </div>
        </main>
    </>
  )
}

export default CaptainPopUp;
