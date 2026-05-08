import React, { useState, useEffect } from 'react'


const Loader = () => {
  const messageArray = ["AI is thinking…","Generating response…","Almost there…"]
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const currentMessage = messageArray[currentIndex]


  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex === messageArray.length -1 ){
            return 0
        }
        return prevIndex + 1
      });
    }, 2000);
    return () => clearInterval(intervalId);
  }, []); 

  return (
    <div className="flex gap-1 items-center p-2 text-white">
      <span className="w-2 h-2 bg-white rounded-full animate-bounce"></span>
      <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.2s]"></span>
      <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.4s]"></span>
      <p className="ml-2 text-sm text-zinc-300">{currentMessage}</p>
    </div>
  )
}

export default Loader
