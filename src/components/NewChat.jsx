import React from 'react'

const NewChat = (props) => {
  return (
    <div>
      <div className='p-2 flex-shrink-0'>
          <div 
          onClick={props.startNewChat}
          className='text-white text-start text-lg font-semibold cursor-pointer hover:bg-zinc-600 rounded-lg p-2'>
           + New Chat
          </div>
        </div>
    </div>
  )
}

export default NewChat
