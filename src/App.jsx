import React, { useEffect, useState } from 'react'
import Canvas from './Canvas'
import data from './data'
import LocomotiveScroll from 'locomotive-scroll';


const App = () => {
useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
}, []);

const [showCanvas, setShowCanvas] = useState(false)

  const handleClick = () => {
    setShowCanvas(!showCanvas)
  }

  return (
   <>
    <div className='w-full relative text-white font-["Helvetica_Now_Display"] min-h-screen'>
   {showCanvas && data[0].map((canvasdets, index) => (
    <Canvas details={canvasdets}/>
  ) )}
  <div className='relative z-[1]'>
   <div className='w-full h-screen'>
    <nav className="flex justify-between px-4 py-2">
      <a href="#" className="text-2xl font-bold">Spice</a>
      <ul className="flex">
        {["About", "Features", "Contact"].map((item) => (
          <li key={item} className="mr-6">
            <a href="#" className="text-xl">{item}</a>
          </li>
        ))}
      </ul>
    </nav>
    <div className="textcontainer  py-4 px-[20%]">
    <div className="text w-[50%]">
      <h3 className='text-3xl leading-[1.5]'>At Thirtysixstudio, we build digital assets and immersive experiences for purposeful brands.</h3>
    <p className='text-md mt-10 font-normal'>We are a digital agency that specializes in creating engaging and interactive experiences for brands.</p>
    <p className='mt-10 cursor-pointer'>scroll</p>
    </div>
   

    </div>

    <div className='w-full absolute bottom-0 left-0 p-10'>
      <h1 onClick={handleClick} className='text-9xl cursor-pointer'>Thirtysixstudio</h1>
    </div>
   </div>
   </div>
  </div>
   </>
  )
}

export default App