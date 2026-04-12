import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'


const About = () => {
  return (
    <div className='container mx-auto px-4'>

      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img src={assets.about_img} alt="about" className='w-full md:max-w-[450px]' />

        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-800 font-serif leading-relaxed'>
          <p>ChocoCasa is more than a chocolate boutique—it is a carefully curated world of flavor, shaped by comfort, indulgence, and quiet joy. Each creation tells a story through rich textures, creamy layers, and subtle notes that linger. Rooted in craftsmanship and inspired by the warmth of tradition, ChocoCasa invites you to experience chocolate as emotion—decadent, delicate, unforgettable. A signature delight for every season.</p>

          <p>Every piece at ChocoCasa is a gentle tribute to the simple pleasures we treasure but rarely name—the scent of cocoa in the air, the elegance of a handcrafted truffle, the hush of a moment savored slowly. Thoughtfully made and deeply inspired, our chocolates blend memory, sweetness, and artisanal beauty into something personally meaningful. At ChocoCasa, chocolate isn’t just tasted — it is felt.</p>

          <b className='text-gray-900 font-serif'>Our Mission</b>
          <p>Our mission is to craft refined, soulful chocolates that celebrate emotion, tradition, and personal indulgence. Guided by quality and quiet inspiration, ChocoCasa exists to offer flavors that feel intimate, timeless, and entirely your own.</p>
        </div>

      </div>



      <div className='text-xl py-4'>
        <Title text1={'THE'} text2={'CHOCOCASA EXPERIENCE'} />
      </div>

      <div className='border border-gray-300 px-10 md:px-16 py-12 sm:py-20 mb-20 text-gray-700 font-serif leading-relaxed text-center flex flex-col items-center gap-6'>
        <p className='max-w-3xl'>
          Every ChocoCasa creation is an invitation to slow down — to rediscover pleasure in the quiet details:
          the silky melt of dark chocolate, the whisper of caramel, the aroma of roasted cocoa drifting through the air.
          Our approach is guided by care, patience, and artistry — each piece crafted to awaken memory, warmth, and delight.
        </p>

        <p className='max-w-3xl'>
          From the very first bean to the final wrap, we honor the journey of chocolate with integrity and devotion.
          The ChocoCasa experience is more than taste — it’s a ritual of comfort, a small act of beauty, and a celebration of genuine craftsmanship.
        </p>
      </div>



    </div>
  )
}

export default About
