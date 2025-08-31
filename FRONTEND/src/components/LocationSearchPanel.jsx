import React from 'react'

const LocationSearchPanel = ({ suggestions, setLocationSelectPanel, setPanelOpen, setPickUp, setDestination, activeField, pickUp, fareShowing }) => {
    
    const handleSuggestionClick = async (suggestion) => {
        if(activeField === "pickUp") {
            setPickUp(suggestion)
        }
        else if(activeField === "destination") {
            setDestination(suggestion)
            if(pickUp) {
                fareShowing(pickUp, suggestion)
            }
            setTimeout(() => {
                setLocationSelectPanel(true)
                setPanelOpen(false)
            }, 950);
        }

    }

  return (
    <main className='w-full h-screen px-5'>
        <div className="upper flex items-center gap-4 bg-[#eee] w-fit rounded-full px-4 py-1 mt-3 mb-10">
            <h4 className='font-medium text-2xl'><i className="ri-time-fill"></i></h4>
            <h2 className='font-medium text-xl'>Leave Now</h2>
            <h4 className='font-medium text-2xl'><i className="ri-arrow-drop-down-line"></i></h4>
        </div>
        <div className="location-all-show overflow-auto px-5 pb-32" style={{maxHeight: "calc(100vh - 100px)"}}>
            {suggestions.map((location, idx) => {
                return <div key={idx} onClick={() => {
                        handleSuggestionClick(location.address)
                    }} className="location-name flex items-center gap-5 my-5 border border-gray-300 active:border-black rounded-md p-4 active:scale-95">
                    <h2 className="icon bg-[#eeee] px-4 py-3 rounded-full text-xl"><i className="ri-map-pin-2-fill"></i></h2>
                    <h4 className="text-xl font-medium">{location.address}</h4>
                </div>
            })}
        </div>
    </main>
  )
}

export default LocationSearchPanel;
