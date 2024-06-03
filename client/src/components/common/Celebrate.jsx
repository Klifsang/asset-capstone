import React, { useEffect, useRef, useState } from "react";
import ElChombo from "../../../public/videos/dame-tu-cosita-challenge.mp4";

const Celebrate = () => {
    const videoRef = useRef(null);
    const [emojis, setEmojis] = useState([]);
  
    const triggerCelebration = () => {
      const newEmojis = Array.from({ length: 10 }).map((_, i) => ({
        id: i,
        emoji: "🎉",
        left: Math.random() * 100,
      }));
      setEmojis(newEmojis);
      setTimeout(() => setEmojis([]), 3000); // Remove emojis after 3 seconds
    };
  
    useEffect(() => {
      if (videoRef.current) {
        const intervalId = setInterval(triggerCelebration, 3100); // Trigger every 3.1 seconds
        videoRef.current.volume = 0.25;
        return () => clearInterval(intervalId); // Cleanup interval on component unmount
      }
    }, []);
  
    return (
        <video ref={videoRef} controls autoPlay loop>
          <source src={ElChombo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
    );
  };

  export default Celebrate;