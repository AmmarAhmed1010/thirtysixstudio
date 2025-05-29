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
          <section className="flex-1 flex flex-col justify-center items-center px-4 md:px-0">
            <div className="w-full max-w-5xl mx-auto py-8 md:py-16 flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/2 space-y-8">
                <h3 className="text-2xl md:text-4xl font-bold leading-tight md:leading-[1.2] text-white drop-shadow-lg">
                  At <span className="text-[#ffb347]">Thirtysixstudio</span>, we build digital assets and immersive experiences for purposeful brands.
                </h3>
                <p className="text-base md:text-lg font-normal text-gray-200">
                  We are a digital agency that specializes in creating engaging and interactive experiences for brands.
                </p>
                <a
                  href="#"
                  className="inline-block mt-6 px-6 py-2 bg-[#ffb347] text-black font-semibold rounded-full shadow-lg hover:bg-[#ff9900] transition-colors duration-200"
                >
                  Learn More
                </a>
                <div className="mt-8 flex items-center space-x-2 animate-bounce cursor-pointer select-none">
                  <svg className="w-6 h-6 text-[#ffb347]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                  <span className="text-md text-gray-300">Scroll</span>
                </div>
              </div>
              <div className="hidden md:flex w-1/2 justify-center items-center">
                {/* Placeholder for future hero image or animation */}
                <div className="w-64 h-64 rounded-3xl bg-gradient-to-tr from-[#ffb347] to-[#ff9900] opacity-70 blur-2xl"></div>
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