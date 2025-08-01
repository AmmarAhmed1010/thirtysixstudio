import React, { useEffect, useState } from 'react'
import Canvas from './Canvas'
import data from './data'
import LocomotiveScroll from 'locomotive-scroll'

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Features", href: "#features" },
  { name: "Contact", href: "#contact" }
];

const App = () => {
  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
    return () => {
      if (locomotiveScroll && locomotiveScroll.destroy) locomotiveScroll.destroy();
    }
  }, []);

  const [showCanvas, setShowCanvas] = useState(false);

  const handleClick = () => {
    setShowCanvas(!showCanvas);
  }; 

  return (
    <>
      <div className="w-full relative text-white font-['Helvetica_Now_Display'] min-h-screen bg-gradient-to-br from-[#18181b] to-[#23272f] transition-colors duration-500">
        {/* Responsive Canvas Layer */}
        {showCanvas && (
          <div className="fixed inset-0 pointer-events-none z-0">
            {data[0].map((canvasdets, index) => (
              <Canvas key={index} details={canvasdets} />
            ))}
          </div>
        )}

        <div className="relative z-10 flex flex-col min-h-screen">
          {/* Navigation */}
          <nav className="flex items-center justify-between px-6 py-4 bg-black/30 backdrop-blur-md shadow-md sticky top-0 z-20">
            <a href="#" className="text-2xl md:text-3xl font-extrabold tracking-tight hover:text-[#ffb347] transition-colors duration-200">
              Spice
            </a>
            <button
              className="md:hidden flex items-center px-2 py-1 border border-white rounded focus:outline-none"
              aria-label="Open Menu"
              onClick={() => setShowCanvas(false)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <ul className="hidden md:flex space-x-8">
              {navLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-lg font-medium hover:text-[#ffb347] transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Hero Section */}
          <section className="flex-1 flex flex-col justify-center items-center px-4 md:px-8">
            <div className="w-full max-w-6xl mx-auto py-12 md:py-24 flex flex-col items-center text-center">
              <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-white max-w-4xl mx-auto">
                At <span className="text-[#ffb347] bg-clip-text bg-gradient-to-r from-[#ffb347] to-[#ff9900]">Thirtysixstudio</span>, we build digital assets and immersive experiences for purposeful brands.
              </h3>
              <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                We are a digital agency that specializes in creating engaging and interactive experiences for forward-thinking brands.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <a
                  href="#"
                  className="px-8 py-3 bg-[#ffb347] hover:bg-[#ff9900] text-black font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  Get Started
                </a>
                <a
                  href="#"
                  className="px-8 py-3 border-2 border-[#ffb347] text-[#ffb347] hover:bg-[#ffb347]/10 font-medium rounded-full transition-all duration-300"
                >
                  View Our Work
                </a>
              </div>
              <div className="mt-16 flex flex-col items-center">
                <div className="w-10 h-16 rounded-full border-2 border-[#ffb347] flex items-start justify-center p-1">
                  <div className="w-1 h-6 bg-[#ffb347] rounded-full animate-bounce"></div>
                </div>
                <span className="mt-4 text-sm text-gray-400">Scroll to explore</span>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <div className="w-full flex justify-center items-end absolute bottom-0 left-0 pb-8 pointer-events-none select-none">
            <h1
              onClick={handleClick}
              className="text-5xl md:text-8xl lg:text-9xl font-extrabold tracking-tight cursor-pointer pointer-events-auto transition-transform duration-200 hover:scale-105 hover:text-[#ffb347] drop-shadow-lg"
              tabIndex={0}
              aria-label="Toggle Canvas Animation"
            >
              Thirtysixstudio
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default App