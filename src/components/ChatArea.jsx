import React from 'react'
import Loader from './Loader'
import MessageBubble from './MessageBubble'

const ChatArea = ({ activeChat, apiLoad, bottomRef, onSelectPrompt }) => {
  const suggestions = [
    {
      title: "Refactor React Hook",
      prompt: "Write a custom React hook for debouncing an input value with cleanup and memoization.",
      icon: "⚡"
    },
    {
      title: "Optimize SQL Query",
      prompt: "How can I optimize a slow PostgreSQL query joining three large tables with pagination?",
      icon: "🗄️"
    },
    {
      title: "Debug Asynchronous Code",
      prompt: "Explain how to handle race conditions in React useEffect when fetching data from an API.",
      icon: "🐛"
    },
    {
      title: "Tailwind UI Layout",
      prompt: "Create a responsive sidebar navigation and dashboard card layout using Tailwind CSS v4.",
      icon: "🎨"
    }
  ]

  return (
    <div className='flex-1 overflow-y-auto px-4 md:px-12 lg:px-32 py-6 flex flex-col'>
      {/* EMPTY STATE / LANDING HERO */}
      {(!activeChat || activeChat?.messages?.length === 0) && (
        <div className='flex-1 flex flex-col items-center justify-center text-center max-w-3xl mx-auto my-auto py-12'>
          <div className='w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-3xl shadow-lg shadow-emerald-950/50 mb-6 border border-emerald-400/20'>
            ⚡
          </div>
          <h2 className='text-3xl md:text-4xl font-extrabold text-zinc-100 tracking-tight mb-3'>
            What would you like to build today?
          </h2>
          <p className='text-zinc-400 text-sm md:text-base max-w-lg mb-8'>
            Your specialized AI developer studio powered by Groq. Select a mode above or click a quick starter prompt below to get instant, production-ready code.
          </p>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 w-full text-left'>
            {suggestions.map((item, idx) => (
              <button
                key={idx}
                onClick={() => onSelectPrompt(item.prompt)}
                className='group p-4 rounded-xl bg-zinc-900/80 hover:bg-zinc-850 border border-zinc-800 hover:border-emerald-500/40 transition-all duration-200 text-left flex items-start gap-3 cursor-pointer shadow-sm hover:shadow-md hover:shadow-emerald-950/20'
              >
                <span className='text-xl p-2 rounded-lg bg-zinc-950 border border-zinc-800 group-hover:border-emerald-500/30 group-hover:scale-110 transition-transform'>
                  {item.icon}
                </span>
                <div>
                  <h4 className='text-sm font-semibold text-zinc-200 group-hover:text-emerald-400 transition-colors'>
                    {item.title}
                  </h4>
                  <p className='text-xs text-zinc-400 line-clamp-2 mt-0.5'>
                    {item.prompt}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* MESSAGES */}
      <div className='space-y-4 max-w-4xl w-full mx-auto'>
        {activeChat?.messages?.map((msg, index) => (
          <MessageBubble
            key={index}
            msg={msg}
          />
        ))}
        
        {/* Loader */}
        {apiLoad && (
          <div className="flex justify-start py-2">
            <Loader />
          </div>
        )}
        
        <div ref={bottomRef}></div>
      </div>
    </div>
  )
}

export default ChatArea