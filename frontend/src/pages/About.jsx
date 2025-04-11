import React from 'react'
import Title from '../components/Title'
import {assets} from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={"About"} text2={"Us"}/>
      </div>
      <div className='my-10 flex flex-col md:flex-row items-center gap-16'>
  <img className='w-full md:max-w-[450px]' src={assets.about_img} alt='' />
  
       <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-700'>
    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi, eos minus porro vel distinctio iusto neque accusamus? Voluptatem amet, hic reprehenderit necessitatibus aspernatur asperiores excepturi est fugiat voluptas soluta placeat.</p>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae enim, explicabo possimus ipsam nam similique deserunt iste? Tempore quam culpa, velit error provident inventore excepturi aliquid dignissimos, voluptas accusamus deleniti.</p>
    <b className='text-gray-800'>Our Mission</b>
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam aliquam ullam non quam exercitationem at a officia harum eius ducimus, optio delectus aut! Ipsam consequatur neque, ut labore placeat quo.</p>
          </div>
        </div>
<div className='text-4xl py-4'>
    <Title text1={"Why"} text2={'Choose us'}/>
</div>
<div className='flex flex-col md:flex-row text-sm mb:20'>
  <div className='border px-10 md:py-8 sm:py-20 flex flex-col'>
    <b>Quality assurance</b>
    <p className='text-gray-600'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro veritatis omnis saepe dignissimos, esse laboriosam officiis ipsum, culpa non adipisci, quae earum. Omnis perferendis quidem unde iste quo, voluptatum tempore.</p>
  </div>
  <div className='border px-10 md:py-8 sm:py-20 flex flex-col'>
    <b>Convinience:</b>
    <p className='text-gray-600'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro veritatis omnis saepe dignissimos, esse laboriosam officiis ipsum, culpa non adipisci, quae earum. Omnis perferendis quidem unde iste quo, voluptatum tempore.</p>
  </div>
  <div className='border px-10 md:py-8 sm:py-20 flex flex-col'>
    <b>Exceptional customer service</b>
    <p className='text-gray-600'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro veritatis omnis saepe dignissimos, esse laboriosam officiis ipsum, culpa non adipisci, quae earum. Omnis perferendis quidem unde iste quo, voluptatum tempore.</p>
  </div>
</div>
<div className='mt-12'>
<NewsletterBox/>
</div>
      </div>
    
  )
}

export default About
