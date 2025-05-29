import { useEffect, useState, useRef } from "react";
import canvasimages from "./canvasimages";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Preload all images once at the top level, outside the component
const preloadedImages = canvasimages.map((src) => {
  const img = new window.Image();
  img.src = src;
  return img;
});

function Canvas({ details }) {
  const { startIndex, numImages, duration, size, top, left, zIndex } = details;
  const [index, setIndex] = useState(startIndex);
  const canvasRef = useRef(null);

  useGSAP(() => {
    const obj = { value: startIndex };
    gsap.to(obj, {
      value: startIndex + numImages - 1,
      duration: duration,
      repeat: -1,
      ease: "linear",
      onUpdate: () => {
        setIndex(Math.round(obj.value));
      }
    });

    // Fade in on mount
    gsap.from(canvasRef.current, {
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });

    // Scroll animation: scale and rotate canvas on scroll
    const ctx = gsap.context(() => {
      gsap.to(canvasRef.current, {
        scale: 1.15,
        rotation: 15,
        scrollTrigger: {
          trigger: canvasRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: true,
        },
        transformOrigin: "50% 50%",
        ease: "none",
      });
    }, canvasRef);

    return () => ctx.revert();
  }, [startIndex, numImages, duration]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const scale = window.devicePixelRatio || 1;

    // Use preloaded image
    const img = preloadedImages[index % preloadedImages.length];

    // If image is already loaded, draw immediately; otherwise, wait for load
    if (img.complete) {
      canvas.width = size * scale * 1.4;
      canvas.height = size * scale * 1.4;
      canvas.style.width = `${size * 1.4}px`;
      canvas.style.height = `${size * 1.4}px`;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    } else {
      img.onload = () => {
        canvas.width = size * scale * 1.4;
        canvas.height = size * scale * 1.4;
        canvas.style.width = `${size * 1.4}px`;
        canvas.style.height = `${size * 1.4}px`;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
    }
  }, [index, size]);

  return (
    <canvas
      data-scroll
      data-scroll-speed={Math.random().toFixed(1)}
      className="absolute"
      ref={canvasRef}
      style={{
        width: `${size * 1.6}px`,
        height: `${size * 1.6}px`,
        top: `${top}%`,
        left: `${left}%`,
        zIndex: zIndex,
      }}
    ></canvas>
  );
}

export default Canvas;