import React from 'react'

const AboutUs = () => {
  return (
    <>
    <div className=' bg-gradient-to-r from-[#030912] via-[#0b1e3c] to-[#0d1b31]'>
      <div className='text-4xl py-4 px-2 font-bold font-bungee  text-center text-white'>
      Our Story</div>
      <div className='p-4  flex flex-col sm:flex-row justify-center gap-40 items-center'>
        <div className='flex items-center '>
        <img src="https://images.pexels.com/photos/37290569/pexels-photo-37290569.jpeg" 
        className= 'h-70 w-80 object-cover '
        /></div>
        <div className='md:px-4 sm:space-y-2 border-0 shadow-md text-white font-serif'>
          <h3 className='text-md md:text-xl font-bungee font-bold mb-2 text-blue-400  '>Rest Should Be Simple. Not Expensive.</h3>
          <h3 className='text-sm md:text-md tracking-tighter mb-4'>Why pay ₹1500+ for a hotel when you only need a few hours of rest?<br/>
At Restify, we rethink comfort for modern life—offering private, smart sleeping pods starting at just ₹139/hour. </h3>
            <h3 className='text-md md:text-xl font-bungee font-semibold mb-2 text-blue-400'> Restify was born from that gap..</h3>
            <h3 className='text-sm md:text-md font-serif mt-4 '>
              Designed for flexibility, built for comfort, and powered by seamless online booking,<br/> Restify gives you the freedom to pause, recharge, and continue—on your terms.<br/>
Step into a space that’s quiet, personal, and tailored entirely for you—where every moment of rest truly counts.
            </h3>
        </div>
         </div>
        <div>
            <h1 className='text-4xl mb-10 text-center font-bungee font-bold text-blue-400 '>
              Our Core Values
            </h1>
         <div className='flex items-center justify-between flex-col md:flex-row  gap-15 py-10 px-4 md:px-40'> 
            <div className=''>
              <img src="https://images.pexels.com/photos/5137981/pexels-photo-5137981.jpeg" alt="" 
              className='h-30 w-55 object-cover'/>
              <h1 className='text-xl md:text-2xl text-center  font-bold text-white font-bungee py-2'>
                <span className='text-blue-400'>Brand </span>Value</h1>
              <h3 className='text-sm text-md text-white font-serif tracking-tighter w-50 p-1 mt-0 text-center'>One of the Finest Beds 
                with perfect sleep </h3>
            </div>
              <div className=''>
              <img src="https://images.pexels.com/photos/37290569/pexels-photo-37290569.jpeg" alt="" 
              className='h-30 w-55 object-cover'/>
              <h1 className='text-xl md:text-2xl text-center font-bold text-white font-bungee py-2'>Premium Ambiance</h1>
              <h3 className='text-sm md:text-md text-white font-serif tracking-tighter text-center p-1 '>With full ac support</h3>
            </div>
              <div className=''>
              <img src="https://images.pexels.com/photos/12913382/pexels-photo-12913382.jpeg" alt="" 
              className='h-30 w-55 object-cover'/>
              <h1 className='text-xl md:text-2xl text-center font-bold text-white font-bungee py-2'>Comfort Guarantee</h1>
              <h3 className='text-sm md:text-md text-white font-serif tracking-tighter p-1 text-center'>100% Finest Service</h3>
            </div>
          </div>
      </div>
</div>
    </>
  )
}

export default AboutUs