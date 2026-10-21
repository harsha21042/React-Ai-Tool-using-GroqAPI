import React, { useState, useEffect, useRef } from 'react'
import NewChat from './NewChat'

const Sidebar = ({ startNewChat, chats, handleRename, receiveId, deleteChat, setShowSidebar }) => {
  const [editId, setEditId] = useState(null)
  const [inputCurrentState, setInputCurrentState] = useState('')
  const editRef = useRef(null)

  useEffect(() => {
    editRef.current?.focus()
  }, [editId])

  return (
    <div className='flex flex-col h-full bg-zinc-900 text-zinc-200'>
      {/* Sidebar Header */}
      <div className='px-3 py-6 flex items-center justify-between'>
        <h2 className='font-semibold tracking-wider text-zinc-400 uppercase'>
          Chat History
        </h2>
        <button 
          onClick={() => setShowSidebar && setShowSidebar(false)}
          className='text-zinc-500 hover:text-zinc-300 text-sm md:hidden cursor-pointer'
          title="Close Sidebar"
        >
          ✕
        </button>
      </div>

      {/* New Chat Button Wrapper */}
      <div className='p-2'>
        <NewChat startNewChat={startNewChat} />
      </div>

      {/* Chat List */}
      <div className='flex-1 overflow-y-auto px-2 space-y-1 my-1 custom-scrollbar'>
        {chats.map((chat) => (
          <div 
            key={chat.id}
            className='group flex items-center justify-between hover:bg-zinc-800/80 rounded-xl px-2.5 py-2 transition-colors border border-transparent hover:border-zinc-700/50'
          >
            {editId === chat.id ? (
              <input 
                ref={editRef}
                type="text"
                value={inputCurrentState}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleRename(chat.id, inputCurrentState)
                    setEditId(null)
                    setInputCurrentState('')
                  } else if (e.key === 'Escape') {
                    setEditId(null)
                  }
                }}
                onChange={(e) => setInputCurrentState(e.target.value)}
                className='bg-zinc-950 border border-emerald-500/50 rounded px-2 py-1 text-sm w-full outline-none text-zinc-100'
              />
            ) : (
              <div 
                onClick={() => receiveId(chat.id)}
                className='flex-1 truncate text-sm cursor-pointer text-zinc-300 hover:text-zinc-100 pr-2'
                title={chat.title}
              >
                {chat.title}
              </div>
            )}

            {/* Action Buttons */}
            {editId !== chat.id && (
              <div className='flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity'>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setEditId(chat.id)
                    setInputCurrentState(chat.title)
                  }}
                  className='text-zinc-400 hover:text-emerald-400 p-1 rounded hover:bg-zinc-700/50 text-xs cursor-pointer'
                  title="Rename chat"
                >
                  ✏️
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteChat(chat.id)
                  }}
                  className='text-zinc-400 hover:text-red-400 p-1 rounded hover:bg-zinc-700/50 text-xs cursor-pointer'
                  title="Delete chat"
                >
                  🗑️
                </button>
              </div>
            )}
          </div>
        ))}
        {chats.length === 0 && (
          <div className='text-center py-6 text-zinc-500 text-xs'>
            No recent chats found. Start a new session above!
          </div>
        )}
      </div>
    </div>
  )
}

export default Sidebar