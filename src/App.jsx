import React from 'react'
import { useState, useEffect, useRef } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import ChatInput from './components/ChatInput'
import ChatArea from './components/ChatArea'
import { getAIResponse } from './services/groqApi'
import useChat from './hooks/useChat'

const App = () => {
  const [question, setQuestion] = useState('')
  const bottomRef = useRef(null)
  const inputRef = useRef(null)
  const [apiLoad, setApiLoad] = useState(false)

  const {
      chats,
      deleteChat,
      activeChatId,
      receiveId,
      startNewChat,
      handleRename,
      addUserMessage,
      addBotMessage
    } = useChat()         
  
  const activeChat = chats.find((chat) => chat.id === activeChatId)
  const [showSidebar, setShowSidebar] = useState(false)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    inputRef.current?.focus()
  }, [activeChat, apiLoad])

  

  const askQuestion = async () => {
      if (!question.trim()) return
      const currentQuestion = question
      const chatId = addUserMessage(currentQuestion);
      setQuestion("")
      setApiLoad(true)
      try {
        const botAns = await getAIResponse(currentQuestion)
        addBotMessage(chatId, botAns) 
      } 
      catch (error) {
        console.log("Error:", error)
        addBotMessage(chatId,"⚠️ Something went wrong. Please try again.")
      } 
      finally {
        setApiLoad(false)
        inputRef.current?.focus()
      }
    }

  const handleKeyDown = (e) => {
     if (e.key === "Enter" && question.trim()) {
        askQuestion()
    }
  }

  return (
    <div className='flex h-dvh overflow-hidden'>
      <div className={`bg-zinc-800 text-white ${showSidebar ? "w-64 opacity-100 p-1" : "w-0 opacity-0 overflow-hidden px-0"} transition-all duration-300`}>
          <Sidebar 
            chats={chats} 
            receiveId={receiveId} 
            deleteChat={deleteChat} 
            startNewChat={startNewChat} 
            handleRename={handleRename}
        />
      </div>
      <div className='flex-1 flex flex-col h-dvh overflow-hidden'>
        <Header 
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />
        <ChatArea 
          activeChat = {activeChat}
          apiLoad = {apiLoad}
          bottomRef = {bottomRef}
        />
        <ChatInput 
          question = {question}
          setQuestion = {setQuestion}
          apiLoad = {apiLoad}
          handleKeyDown= {handleKeyDown}
          askQuestion = {askQuestion}
          inputRef = {inputRef}
        />
      </div>
    </div>
  )
}

export default App