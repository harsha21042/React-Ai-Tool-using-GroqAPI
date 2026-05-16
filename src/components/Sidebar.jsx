import React from 'react'
import NewChat from './NewChat'
import { useState, useEffect, useRef } from 'react'

const Sidebar = (props) => {

  const [editId, setEditId] = useState(null)
  const [inputCurrentState, setInputCurrentState] = useState('')
  const editRef = useRef(null)

  useEffect(() => {
    editRef.current?.focus()
  }, [editId])

  return (
    <div className=''>
        <div className='border-b-2 border-zinc-500 p-2 flex-shrink-0'>
          <h1 className='text-start text-xl font-semibold'>
            Recent Search History
          </h1>
        </div>
        <NewChat startNewChat={props.startNewChat} />
        <div>
          {
            props.chats.map((chat,index)=>(
            <div 
              key={chat.id}
              className='flex items-center justify-between hover:bg-zinc-600 rounded-lg cursor-pointer'>
                { 
                  editId === chat.id ? 
                  ( <input 
                    ref={editRef}
                    type="text"
                    value={inputCurrentState}
                    onKeyDown={(e) =>{
                      if (e.key ==='Enter'){
                      props.handleRename(chat.id,inputCurrentState)
                      setEditId(null)
                      setInputCurrentState('')
                    }
                  }}
                    onChange={(e)=>{
                      setInputCurrentState(e.target.value)
                    }}
                    className='py-2 p-2 w-full' />
                  ):(
                    <div 
                    onClick={()=> props.receiveId(chat.id)}
                    className='py-2 p-2 truncate max-w-[180px]'>
                    {chat.title}
                  </div>
                  )
                }
                <div className='flex justify-self-end gap-2'>
                <div
                  onClick={()=> {
                  setEditId(chat.id)
                  setInputCurrentState(chat.title)
                  setTimeout(() => {
                  editRef.current?.focus()
                   }, 0)
                }}> ✏️
              </div>
              <div onClick={()=> props.deleteChat(chat.id) }> 🗑</div>
            </div>
            </div>
            ))
          }
        </div>
    </div>
  )
}

export default Sidebar
