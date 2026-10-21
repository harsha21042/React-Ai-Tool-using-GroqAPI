import React from 'react'

const ChatInput = ({ inputRef, question, apiLoad, setQuestion, handleKeyDown, askQuestion, activeMode }) => {
  // Mode helper metadata for placeholder text
  const getPlaceholder = () => {
    if (apiLoad) return "Groq AI is generating response..."
    switch (activeMode) {
      case 'code':
        return "Ask for a component, hook, or architecture pattern..."
      case 'debug':
        return "Paste code or error stack trace to debug..."
      case 'sql':
        return "Describe your database schema and query requirements..."
      default:
        return "Ask me anything or request code assistance..."
    }
  }

  return (
    <div className='px-4 md:px-12 lg:px-32 pb-4 pt-2 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent'>
      <div className='max-w-4xl mx-auto'>
        <div className='bg-zinc-900 border border-zinc-800 hover:border-zinc-700 focus-within:border-emerald-500/60 transition-all rounded-2xl p-1.5 flex items-center shadow-lg shadow-zinc-950/50'>
          <input 
            ref={inputRef}
            value={question}
            disabled={apiLoad}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            className='w-full bg-transparent text-zinc-100 placeholder-zinc-500 px-4 py-3 outline-none text-sm md:text-base'
            type="text" 
            placeholder={getPlaceholder()}
          />
          <button 
            onClick={askQuestion}
            disabled={!question.trim() || apiLoad}
            className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              question.trim() && !apiLoad
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-950/50'
                : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
            }`}
          >
            <span>Send</span>
            <span className='text-xs'>🚀</span>
          </button>
        </div>
        <div className='flex items-center justify-between px-2 pt-2 text-xs text-zinc-500'>
          <span>Press <strong className='text-zinc-400 font-mono'>Enter ↵</strong> to send</span>
          <span className='capitalize text-emerald-400/80 font-medium'>Mode: {activeMode || 'general'}</span>
        </div>
      </div>
    </div>
  )
}

export default ChatInput