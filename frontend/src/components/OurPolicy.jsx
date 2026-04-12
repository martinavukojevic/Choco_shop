import React from 'react';
import { assets } from '../assets/assets';
import { motion } from "framer-motion";
import Title from './Title';

const OurPolicy = () => {
  return (
    <div className='py-20 text-gray-700'>


      <Title text1="LEARN" text2="MORE" />

      <div className='flex flex-col sm:flex-row justify-around items-start gap-12 sm:gap-8 md:gap-12 text-center text-xs sm:text-sm md:text-base'>

        <div className='flex flex-col items-center'>
          <img src={assets.bean} className='w-14 m-auto mb-5' alt="items" />

          <p className='font-serif font-semibold text-gray-800 mb-2'>
            From Bean to Bar
          </p>

          <p className='text-gray-700 leading-relaxed'>
            Our chocolate begins with carefully selected cocoa beans, roasted and crafted in small batches with dedication and expertise. Every bar tells its own story — from bean to bar.
          </p>
        </div>


        <div className='flex flex-col items-center'>
          <img src={assets.privacy} className='w-14 m-auto mb-5' alt="privacy" />

          <p className='font-serif font-semibold text-gray-800 mb-2'>
            Privacy Policy
          </p>

          <p className='text-gray-700 leading-relaxed'>
           Your privacy matters to us. We handle your personal data with the same care and attention we give to selecting our cocoa beans.
          </p>
        </div>

        <div className='flex flex-col items-center'>
          <img src={assets.craft} className='w-14 m-auto mb-5' alt="timeframe" />

          <p className='font-serif font-semibold text-gray-800 mb-2'>
            About Us
          </p>

          <p className='text-gray-700 leading-relaxed'>
            Curious to learn more about our story and how we create our chocolate? Get in touch or visit us — we love sharing our passion for the art of chocolate making.
          </p>
        </div>

      </div>

    </div>
  );
};

export default OurPolicy;
