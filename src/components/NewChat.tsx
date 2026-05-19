import React from 'react'

type NewChatProps = {
startNewChat : () => void
}

const NewChat = ({startNewChat} : NewChatProps) => {
  return (
      <div className='p-2 flex-shrink-0'>
          <div 
            onClick={startNewChat}
            className='text-white text-start text-lg font-semibold cursor-pointer hover:bg-zinc-600 rounded-lg p-1'>
            + New Chat
          </div>
      </div>
  )
}

export default NewChat
