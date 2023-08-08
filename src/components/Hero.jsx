import React from 'react'
import { BsGithub } from 'react-icons/bs'
import giffy from '../assets/figif.gif'

const Hero = () => {
  return (
    <header className='w-full flex justify-center items-center flex-col'>
      <nav className=' w-full bg-slate-950 h-18'>
        <div className='flex items-center justify-between h-16'>
        <div className="flex-shrink-0">
            <span className="text-white font-bold text-xl  ml-5 ">InfoCapsule</span>
          </div>
          <button 
            type='button'
            onClick={() => window.open('https://github.com/vermagaurav8')}
            className='mr-10'
          >
            <BsGithub color='white' size={27}/>
          </button>
        </div>
      </nav>
      <div className='flex items-center w-full'>
        <img src={giffy} className='w-75 h-75  mx-32 mt-10'  />
        <div className='flex flex-col'>
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-slate-900 md:text-5xl lg:text-6xl dark:text-slate">Instant Article Summaries Made Glamorously Simple! </h1>
          <p className="text-lg font-normal text-slate-900 lg:text-xl dark:text-slate-900">   Effortlessly Condense Complex Content on the Fly with Power of AI</p>
        </div>
      </div>
    </header>
  )
}

export default Hero