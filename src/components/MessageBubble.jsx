import React from 'react'
import Answers from './Answers'

const MessageBubble = ({ msg }) => {
  const isUser = msg.type === "user"

  return (
    <div className={`flex gap-3 my-4 w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
      {/* Bot Avatar */}
      {!isUser && (
        <div className='w-8 h-8 rounded-lg bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 text-sm shadow-sm'>
          ⚡
        </div>
      )}
      
      {/* Message Container */}
      <div className={`max-w-[88%] md:max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed overflow-hidden ${
        isUser 
          ? 'bg-zinc-800 text-zinc-100 rounded-br-sm border border-zinc-700/50 shadow-sm' 
          : 'bg-zinc-900/90 text-zinc-200 rounded-bl-sm border border-zinc-800 shadow-md w-full'
      }`}>
        <Answers text={msg.text} />
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className='w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300 shrink-0 text-xs font-medium shadow-sm'>
          You
        </div>
      )}
    </div>
  )
}

export default MessageBubble