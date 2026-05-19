import React from 'react'
import NewChat from './NewChat'
import { useState, useEffect, useRef } from 'react'


type Chat ={
  id : number,
  title : string,
}
type SidebarProps = {
  startNewChat : () => void
  chats : Chat[],
  handleRename : (id:number, inputCurrentState:string) => void,
  receiveId : (id:number) => void,
  deleteChat : (id:number) => void
}

const Sidebar = ({startNewChat,chats,handleRename,receiveId,deleteChat} : SidebarProps) => {

  const [editId, setEditId] = useState<number | null>(null)
  const [inputCurrentState, setInputCurrentState] = useState<string>('')
  const editRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    editRef.current?.focus()
  }, [editId])

  return (
    <div className='flex flex-col h-screen'>
        <div className='border-b-2 border-zinc-500 p-2 flex-shrink-0'>
          <h1 className='text-start text-xl font-semibold'>
            Recent Search History
          </h1>
        </div>
        <NewChat startNewChat={startNewChat} />
        <div className='flex-1 overflow-y-auto min-h-0'>
          {
            chats.map((chat,index)=>(
            <div 
              key={chat.id}
              className='flex items-center justify-between hover:bg-zinc-600 rounded-lg cursor-pointer'>
                { 
                  editId === chat.id ? 
                  ( <input 
                    ref={editRef}
                    type="text"
                    value={inputCurrentState}
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>{
                      if (e.key ==='Enter'){
                      handleRename(chat.id,inputCurrentState)
                      setEditId(null)
                      setInputCurrentState('')
                    }
                  }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
                      setInputCurrentState(e.target.value)
                    }}
                    className='py-2 p-2 w-full' />
                  ):(
                    <div 
                    onClick={()=> receiveId(chat.id)}
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
              <div onClick={()=> deleteChat(chat.id) }> 🗑</div>
            </div>
            </div>
            ))
          }
        </div>
    </div>
  )
}

export default Sidebar
