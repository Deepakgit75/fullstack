import React from 'react'
import { Link } from 'react-router-dom';
import { BsStack } from "react-icons/bs";

const Navbar = () => {
  return (
    <div className='flex fixed bg-green-200 w-full h-14 -mt-16 text-black items-center justify-center border-b-[1px]'>
      <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
        <div className='h-10 w-10 text-4xl text-green-600'>
            <Link to={'/'} >
                <BsStack/>
            </Link>
        </div>
        <div className='flex flex-row'>
            <div className="rounded-[8px] text-black bg-green-400 py-[8px] px-[12px] font-medium">
                <Link to={'/signup'} >
                    Signup
                </Link>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
