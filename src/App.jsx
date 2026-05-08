import React from 'react'
import { useState, useEffect, useRef } from 'react'
import Answers from './components/Answers'
import Sidebar from './components/Sidebar'

const App = () => {
  const [question, setQuestion] = React.useState('')
  const [messages, setMessages] = React.useState([])
  const bottomRef = useRef(null)
  const inputRef = useRef(null)
  const [apiLoad, setApiLoad] = React.useState(false)
  const [chats, setChats] = React.useState(() => {
  const stored = localStorage.getItem("chats")
    return stored ? JSON.parse(stored) : []
  })
  const [activeChatId, setActiveChatId] = React.useState(null)
  const activeChat = chats.find((chat) => chat.id === activeChatId)
  const [editId, setEditId] = React.useState(null)
  const [inputCurrentState, setInputCurrentState] = React.useState('')
  const editRef = useRef(null)


  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    editRef.current?.
    inputRef.current?.focus()
  }, [messages, apiLoad])

  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify(chats))
  }, [chats])

  const askQuestion = async () => {
  if (!question.trim()) return

  const currentQuestion = question

  let newMessage = {
    type: "user",
    text: currentQuestion
  }

  let chatId = activeChatId

  // ✅ 1. HANDLE CHAT CREATION / UPDATE
  if (activeChatId === null) {
    let newChat = {
      id: Date.now(),
      title: currentQuestion,
      messages: [newMessage]
    }

    setChats(prev => [...prev, newChat])
    setActiveChatId(newChat.id)

    chatId = newChat.id
  } else {
    setChats(prev =>
      prev.map(chat => {
        if (chat.id === activeChatId) {
          return {
            ...chat,
            messages: [...chat.messages, newMessage]
          }
        }
        return chat
      })
    )
  }

  setQuestion("")
  setApiLoad(true)

  // ✅ 2. API CALL WITH ERROR HANDLING
  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-120b",
          messages: [
            {
              role: "user",
              content: currentQuestion
            }
          ]
        })
      }
    )

    if (!response.ok) {
      throw new Error("API request failed")
    }

    let data = await response.json()

    let botAns = data?.choices?.[0]?.message?.content

    if (!botAns) {
      throw new Error("Invalid AI response")
    }

    let botMessage = {
      type: "bot",
      text: botAns
    }

    // ✅ 3. ADD BOT MESSAGE TO CHAT
    setChats(prev =>
      prev.map(chat => {
        if (chat.id === chatId) {
          return {
            ...chat,
            messages: [...chat.messages, botMessage]
          }
        }
        return chat
      })
    )

  } catch (error) {
    console.log("Error:", error)

    let errorMessage = {
      type: "bot",
      text: "⚠️ Something went wrong. Please try again."
    }

    setChats(prev =>
      prev.map(chat => {
        if (chat.id === chatId) {
          return {
            ...chat,
            messages: [...chat.messages, errorMessage]
          }
        }
        return chat
      })
    )
  } finally {
    setApiLoad(false)
    inputRef.current?.focus()
  }
}

  const handleKeyDown = (e) =>{
     if (e.key === "Enter" && question.trim()) 
      {
        askQuestion()
      }
  }

  const receiveId = (id)=>{
    setActiveChatId(id);
  }

  const deleteChat = (id)=>{
    setChats(prev => prev.filter(chats => chats.id !== id ))
      if(activeChatId === id){
        setActiveChatId(null)
      }
  }

  const startNewChat = ()=>{
   setActiveChatId(null)
  }

  const handleRename =(editId,inputCurrentState)=>{
    setChats(prev => prev.map(chat =>{
      if(chat.id === editId){
        return {
          ...chat,
          title:inputCurrentState
        }
      }
      else{
          return chat
      }
    } ))
    setEditId(null);
    setInputCurrentState('');
  }

  return (
    <div className='grid grid-cols-5 h-screen overflow-hidden'>

      {/* Sidebar */}
      <div className='col-span-1 bg-zinc-800 px-4 text-white hidden md:block'>
          <Sidebar 
          chats={chats} 
          receiveId={receiveId} 
          deleteChat={deleteChat} 
          startNewChat={startNewChat} 
          handleRename={handleRename} 
          editId={editId}
          setEditId={setEditId}
          inputCurrentState={inputCurrentState}
          setInputCurrentState={setInputCurrentState}
          editRef={editRef}
        />
      </div>

      {/* Main */}
      <div className='col-span-4 flex flex-col h-screen'>

        {/* HEADER */}
        <div className='border-b-2 border-zinc-500 p-2 flex-shrink-0'>
          <h1 className='text-white text-start text-xl font-semibold'>
            React-AI-Tool
          </h1>
        </div>

        {/* CHAT AREA */}
        <div className='flex-1 overflow-y-auto px-60 py-4'>

          {/* EMPTY STATE */}
          {(!activeChat || activeChat?.messages?.length === 0) && (
            <div className='flex items-center justify-center h-full'>
              <h1 className='text-5xl text-white'>
                Where should we begin?
              </h1>
            </div>
          )}
          {/* MESSAGES */}
          <div className='text-white'>
            {activeChat?.messages?.map((msg, index) => (
              <div
                key={index}
                className={`p-2 ${
                  msg.type === "user"
                    ? "text-right bg-zinc-800 rounded-2xl w-fit max-w-[80%] ml-auto break-words"
                    : "text-left"
                }`}
              >
                <Answers text={msg.text} />
              </div>
            ))}
            <div ref={bottomRef}></div>
          </div>
        </div>

        {/* INPUT */}
        <div className='px-60 mb-5'>
          <div className='flex-shrink-0 bg-zinc-800 w-full p-1 pr-5 text-white m-auto rounded-4xl border border-zinc-700 flex h-16'>
              <input 
              ref={inputRef}
              value={question}
              onChange = {(e)=>{
                setQuestion(e.target.value)
              }}
              onKeyDown={handleKeyDown}
              className='w-full h-full p-3 outline-none'
              type="text" placeholder = {apiLoad ? "AI is typing..." : "Ask me Anything"} />
              <button 
              className=''
              onClick={askQuestion}
              >Ask</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App