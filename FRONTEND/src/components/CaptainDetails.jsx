import React, { useContext } from 'react'
import { captainDataContext } from '../context/CaptainContext'

const CaptainDetails = (props) => {

  const { captain } = useContext(captainDataContext);

  return (
    <>
      <main className='relative'>
        <div className="bg-[#eeee] absolute bottom-0 p-5 rounded-t-2xl w-full">
          <div className="upper-part flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="image-part w-18 h-18">
                <img className='w-full h-full rounded-full object-cover' src="https://as2.ftcdn.net/v2/jpg/05/89/93/27/1000_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg" alt="" />
              </div>
              <div className="name-part">
                <h1 className='font-semibold text-2xl capitalize'>{captain.fullname.firstname} {captain.fullname.lastname}</h1>
                <h5 className='font-medium opacity-70'>Basic Level</h5>
              </div>
            </div>
            <div className="amount-part">
              <h1 className='font-semibold text-2xl'>$325.00</h1>
              <h5 className='font-medium opacity-80 flex justify-end'>Vehicle:- {captain.vehicle.vehicleType}</h5>
            </div>
          </div>
          <div className="down-part bg-amber-400 px-5 py-7 rounded-md my-5">
            <div className="icon-container flex justify-between items-center text-center">
              <div className="icont-first">
                <i className="ri-time-line text-3xl opacity-50"></i>
                <h1 className='text-2xl font-semibold'>10.2</h1>
                <p className='uppercase text-sm opacity-70'>hours online</p>
              </div>
              <div className="icon-second">
                <i className="ri-speed-up-fill text-3xl opacity-50"></i>
                <h1 className='text-2xl font-semibold'>30 KM</h1>
                <p className='uppercase text-sm opacity-70'>total distance</p>
              </div>
              <div className="icon-third">
                <i className="ri-todo-line text-3xl opacity-50"></i>
                <h1 className='text-2xl font-semibold'>20</h1>
                <p className='uppercase text-sm opacity-70'>total jobs</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default CaptainDetails
