import React from 'react'

type ChatInputProps = {
  inputRef : React.RefObject<HTMLInputElement | null>,
  question : string,
  apiLoad : boolean,
  setQuestion : React.Dispatch<React.SetStateAction<string>>,
  handleKeyDown : (e: React.KeyboardEvent<HTMLInputElement>) => void,
  askQuestion : () => void
}

const ChatInput = ({inputRef, question, apiLoad, setQuestion, handleKeyDown, askQuestion}: ChatInputProps) => {
  return (
    <div>
      {/* INPUT */}
        <div className='px-4 md:px-20 lg:px-60 mb-2 md:mb-5'>
          <div className='flex-shrink-0 bg-zinc-800 w-full p-1 pr-5 text-white m-auto rounded-4xl border border-zinc-700 flex h-14 md:h-16'>
              <input 
                ref={inputRef}
                value={question}
                disabled={apiLoad}
                onChange = {(e:React.ChangeEvent<HTMLInputElement>)=>{setQuestion(e.target.value)}}
                onKeyDown={handleKeyDown}
                className='w-full h-full p-3 outline-none'
                type="text" 
                placeholder = {apiLoad ? "AI is typing..." : "Ask me Anything"}
               />
              <button 
              className='px-4 py-2 rounded-full'
              onClick={askQuestion}
              >Ask</button>
          </div>
        </div>
    </div>
  )
}

export default ChatInput
