import React from 'react'
import Loader from './Loader'
import MessageBubble from './MessageBubble'

type Message = {
  type: "user" | "bot"
  text: string
}
type Chat = {
  messages: Message[]
}
type ChatAreaProps = {
  activeChat : Chat | undefined
  apiLoad : boolean
  bottomRef : React.RefObject<HTMLDivElement | null>
}

const ChatArea = ({activeChat,apiLoad,bottomRef} : ChatAreaProps) => {
  return (
        <div className='flex-1 overflow-y-auto overflow-x-hidden px-4 md:px-20 lg:px-60 py-4'>
          {/* EMPTY STATE */}
          {(!activeChat || activeChat?.messages?.length === 0) && (
            <div className='flex items-center justify-center h-full'>
              <h1 className='text-2xl md:text-5xl text-white'>
                Where should we begin?
              </h1>
            </div>
          )}
          {/* MESSAGES */}
          <div className='text-white'>
            {activeChat?.messages?.map((msg, index) => (
              <MessageBubble
              key={index}
              msg={msg}
              />
            ))}
            {/* Loader */}
            {apiLoad && (
              <div className="text-left p-2">
                <Loader />
              </div>
            )}
            <div ref={bottomRef}></div>
          </div>
        </div>
  )
}

export default ChatArea
