import React, { useState, useEffect } from 'react'

const Loader = () => {
  const messageArray = [
    "Analyzing requirements...",
    "Drafting optimal solution...",
    "Writing clean code...",
    "Almost ready..."
  ]
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentMessage = messageArray[currentIndex]

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % messageArray.length)
    }, 2200)
    return () => clearInterval(intervalId)
  }, [messageArray.length])

  return (
    <div className="flex items-center gap-3 py-2 px-3 bg-zinc-900/80 border border-zinc-800/80 rounded-xl w-fit shadow-sm">
      <div className="flex gap-1.5 items-center">
        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></span>
        <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
        <span className="w-2 h-2 bg-teal-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
      </div>
      <p className="text-xs font-medium text-zinc-400 tracking-wide font-mono">
        {currentMessage}
      </p>
    </div>
  )
}

export default Loader