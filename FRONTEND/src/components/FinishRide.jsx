import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const FinishRide = (props) => {

  const navigate = useNavigate();

  async function endRide () {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {
      rideId: props.rideData._id
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    if(response.status === 200) {
      const confirm = window.confirm("Are you sure you want to finish this ride?");
      if (!confirm) return;
      toast.warn("Ride Finished !");
      navigate("/captain-home");
    }
  }

  return (
    <>
        <main className='w-full p-5'>
            <div className="heading flex items-center justify-between">
              <h1 className='font-semibold text-2xl my-5'>Finish this ride</h1>
              <h4 onClick={() => {props.setCaptainCompleteRide(false)}} className='font-semibold text-2xl cursor-pointer active:scale-95'><i className="ri-arrow-down-wide-line"></i></h4>
            </div>
            <div className="upper-part flex items-center justify-between bg-[#eeee] px-5 py-2">
              <div className="flex items-center gap-2">
                <div className="image-part w-16 h-16">
                  <img className='w-full h-full rounded-full object-cover' src="https://as2.ftcdn.net/v2/jpg/05/89/93/27/1000_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg" alt="" />
                </div>
                <div className="name-part">
                  <h1 className='font-semibold text-xl uppercase'>{props.rideData?.user.fullname.firstname + " " + props.rideData?.user.fullname.lastname}</h1>
                  <div className="flex gap-2 mt-1">
                    <h5 className='font-thin bg-amber-300 px-4 py-0.5 rounded-full w-fit text-xs'>ApplePay</h5>
                    <h5 className='font-thin bg-amber-300 px-4 py-0.5 rounded-full w-fit text-xs'>Discount</h5>
                  </div>
                </div>
              </div>
              <div className="amount-part">
                <h1 className='font-semibold text-xl'>${props.rideData?.fare}</h1>
              </div>
            </div>
            <div className="pickup-dropout-location-div p-5">
                <div className="left-right-container flex gap-5 my-5">
                    <div className="left-side flex items-center gap-5 rounded-md">
                        <h2 className="icon text-2xl"><i className="ri-map-pin-2-fill"></i></h2>
                    </div>
                    <div className="right-side flex flex-col">
                        <h2 className='font-semibold text-xl'>562/11-A</h2>
                        <h4 className="text-sm font-thin">{props.rideData?.pickup}</h4>
                    </div>
                </div>
                <div className="line w-full h-[1px] bg-black"></div>
                <div className="left-right-container flex gap-5 my-5">
                    <div className="left-side flex items-center gap-5 rounded-md">
                        <h2 className="icon text-2xl"><i className="ri-checkbox-blank-fill"></i></h2>
                    </div>
                    <div className="right-side flex flex-col">
                        <h2 className='font-semibold text-xl'>362/10-B</h2>
                        <h4 className="text-sm font-thin">{props.rideData?.destination}</h4>
                    </div>
                </div>
                <div className="line w-full h-[1px] bg-black"></div>
                <div className="payment flex items-center gap-5 my-5">
                    <h2 className="icon font-semibold text-2xl"><i className="ri-layout-top-fill"></i></h2>
                    <div className="right">
                        <h1 className='font-semibold text-xl'>₹{props.rideData?.fare}</h1>
                        <h2 className='font-thin text-sm'>Cash Cash</h2>
                    </div>
                </div>
            </div>
            <button onClick={endRide} className='flex justify-center font-semibold text-xl uppercase text-white bg-green-500 w-full py-3 rounded-md cursor-pointer active:scale-95 hover:bg-green-600 transition-all'>finish ride</button>
        </main>
    </>
  )
}

export default FinishRide;
