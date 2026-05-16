import React from 'react'

const ChatInput = (props) => {
  return (
    <div>
      {/* INPUT */}
        <div className='px-4 md:px-20 lg:px-60 mb-2 md:mb-5'>
          <div className='flex-shrink-0 bg-zinc-800 w-full p-1 pr-5 text-white m-auto rounded-4xl border border-zinc-700 flex h-14 md:h-16'>
              <input 
                ref={props.inputRef}
                value={props.question}
                disabled={props.apiLoad}
                onChange = {(e)=>{props.setQuestion(e.target.value)}}
                onKeyDown={props.handleKeyDown}
                className='w-full h-full p-3 outline-none'
                type="text" 
                placeholder = {props.apiLoad ? "AI is typing..." : "Ask me Anything"}
               />
              <button 
              className='px-4 py-2 rounded-full'
              onClick={props.askQuestion}
              >Ask</button>
          </div>
        </div>
    </div>
  )
}

export default ChatInput
