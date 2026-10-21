import React from 'react'

const NewChat = ({ startNewChat }) => {
  return (
    <div className='p-1 flex-shrink-0'>
      <button 
        onClick={startNewChat}
        className='w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 hover:text-emerald-300 border border-emerald-500/30 hover:border-emerald-500/50 transition-all duration-200 cursor-pointer group shadow-sm'
      >
        <div className='flex items-center gap-2 font-medium text-sm'>
          <span className='text-base font-bold group-hover:scale-125 transition-transform duration-200'>+</span>
          <span>New Session</span>
        </div>
        <span className='text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-800/60 text-emerald-400/80'>
          ⌘N
        </span>
      </button>
    </div>
  )
}

export default NewChat