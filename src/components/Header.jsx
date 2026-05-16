import React from 'react'

const Header = (props) => {
  return (
    <div>
      {/* HEADER */}
        <div className='border-b-2 border-zinc-500 p-2 flex items-center gap-4'>
            <span
              className={`cursor-pointer text-2xl text-white transition-transform duration-1200 ease-in-out ${props.showSidebar ? "rotate-180 scale-110" : "rotate-0"}`}
              onClick={() => props.setShowSidebar(!props.showSidebar)}
            >
              ☰
            </span>
            <h1 className='text-white text-xl font-semibold'>
              React-AI-Tool
            </h1>
        </div>
    </div>
  )
}

export default Header
