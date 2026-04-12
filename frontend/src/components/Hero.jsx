import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const videos = [assets.video_hero, assets.video_hero, assets.video_hero, assets.video_hero, assets.video_hero, assets.video_hero, assets.video_hero];

  return (
    <div className="relative w-full">
      <div className="w-full overflow-hidden">
        <div className="flex w-full">
          {videos.map((videoSrc, index) => (
            <video
              key={index}
              className="flex-1 min-w-0 aspect-[4/4.5] object-cover"
              src={videoSrc}
              autoPlay
              muted
              loop
              playsInline
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-center items-center sm:items-start w-full sm:w-1/2 px-6 sm:px-12 ">


        <div className="relative mb-6 text-center sm:text-left -mt-24">
          <h1 className="text-[2.7rem] sm:text-[3.8rem] font-serif font-semibold leading-tight text-white z-10 relative whitespace-nowrap ml-4">
            Explore a World of Chocolate Delights
          </h1>
          <h1 className="absolute top-0 left- text-[2.7rem] sm:text-[3.8rem] font-serif font-semibold leading-tight text-transparent stroke-text z-0 select-none whitespace-nowrap ml-4">
            Explore a World of Chocolate Delights
          </h1>
        </div>

        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={() => navigate('/collection')}
            className="border border-cocoa text-cocoa px-6 py-2 font-semibold tracking-wide rounded-full hover:bg-cocoa hover:text-white transition-all duration-300"
          >
            SHOP NOW
          </button>
          <p className="w-12 h-[1.5px] bg-cocoa group-hover:bg-cocoa transition-colors duration-300 rounded" />
        </div>
      </div>
    </div>

  );
};

export default Hero;
