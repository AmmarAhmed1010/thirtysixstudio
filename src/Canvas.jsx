import { useEffect, useState, useRef } from "react";
import canvasimages from "./canvasimages";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

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
    
    gsap.from(canvasRef.current, {
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });
  }, [startIndex, numImages, duration]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const scale = window.devicePixelRatio || 1;
    const img = new window.Image();

    img.onload = () => {
      // Set canvas size for high-DPI screens
      canvas.width = size * scale * 1.4;
      canvas.height = size * scale * 1.4;
      canvas.style.width = `${size * 1.4}px`;
      canvas.style.height = `${size * 1.4}px`;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      ctx.scale(scale, scale);
    };

    img.src = canvasimages[index % canvasimages.length];
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