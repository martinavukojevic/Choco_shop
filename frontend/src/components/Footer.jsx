import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer className='bg-[#f8f5f2] text-[#4a3b2d] border-t border-[#d9c6a5]/50 mt-32'>
      <div className='container mx-auto px-6 py-16'>
        {/* Glavni layout */}
        <div className='flex flex-col sm:grid grid-cols-[2fr_1fr_1fr] gap-14 mb-12'>

          {/* Logo i opis */}
          <div>
            <img
              src={assets.logo}
              className='mb-6 w-36'
              alt='ChocoCasa logo'
            />
            <p className='text-[15px] leading-relaxed text-[#6b5b4c] font-light'>
              Crafted with care and creativity — ChocoCasa connects you to the world’s
              finest artisan chocolates. Taste passion, discover stories, and savor every bite.
            </p>
          </div>

          {/* Discover */}
          <div>
            <h3 className='text-lg font-serif tracking-wide text-[#b38b59] mb-5'>
              Discover
            </h3>
            <ul className='flex flex-col gap-2 text-[#4a3b2d]/80'>
              {['Home', 'About Us', 'Manufacturers', 'Privacy Policy'].map((item) => (
                <li
                  key={item}
                  className='cursor-pointer hover:text-[#b38b59] transition-colors duration-300'
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className='text-lg font-serif tracking-wide text-[#b38b59] mb-5'>
              Contact Us
            </h3>
            <ul className='flex flex-col gap-2 text-[#4a3b2d]/80'>
              <li className='hover:text-[#b38b59] transition-colors duration-300'>
                +385 91 1111-222
              </li>
              <li className='hover:text-[#b38b59] transition-colors duration-300'>
                chococasa@support.com
              </li>
            </ul>
          </div>
        </div>

        {/* Donji dio footera */}
        <div className='border-t border-[#d9c6a5]/50 pt-6 text-center'>
          <p className='text-sm text-[#6b5b4c]/70'>
            © 2025 <span className='text-[#b38b59] font-medium'>ChocoCasa</span> — Artisanal Chocolate Experience
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
