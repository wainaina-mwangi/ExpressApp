import React from 'react'
import {assets} from '../assets/assets';

const Navbar = () => {
  return (
    <div className='w-full flex justify-between p-4 sm:px-24 sm:p-6 top-0 absolute'>
        <img src={assets.logo} alt="logo"  className='w-28 sm:w-32'/>
        <button className=''>Login</button>
    </div>
  )
}

export default Navbar