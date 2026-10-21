import React, { useState, useEffect, useRef } from 'react'
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
  const [activeMode, setActiveMode] = useState('general') // 'general' | 'code' | 'debug' | 'sql'

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
  const [showSidebar, setShowSidebar] = useState(true)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    inputRef.current?.focus()
  }, [activeChat, apiLoad])

  // Enhance prompt based on selected developer mode
  const formatPromptWithMode = (rawQuestion) => {
    switch (activeMode) {
      case 'code':
        return `As an expert software engineer, write clean, production-ready code with best practices for: ${rawQuestion}`
      case 'debug':
        return `Analyze the following code/error, identify the root cause, and provide a corrected solution: ${rawQuestion}`
      case 'sql':
        return `Write an optimized SQL query with explanation for the following requirement: ${rawQuestion}`
      default:
        return rawQuestion
    }
  }

  const askQuestion = async (textToSend) => {
    const queryText = textToSend || question
    if (!queryText.trim()) return
    
    const currentQuestion = queryText
    const chatId = addUserMessage(currentQuestion)
    setQuestion("")
    setApiLoad(true)
    
    try {
      const formattedPrompt = formatPromptWithMode(currentQuestion)
      const botAns = await getAIResponse(formattedPrompt)
      addBotMessage(chatId, botAns) 
    } 
    catch (error) {
      console.log("Error:", error)
      addBotMessage(chatId, "⚠️ Something went wrong connecting to Groq API. Please try again.")
    } 
    finally {
      setApiLoad(false)
      inputRef.current?.focus()
    }
   }

  const handleKeyDown = (e) => {
     if (e.key === "Enter" && !e.shiftKey && question.trim()) {
       e.preventDefault()
       askQuestion()
    }
  }

  return (
    <div className='flex h-dvh overflow-hidden bg-zinc-950 text-zinc-100 font-sans'>
      <div className={`bg-zinc-900 border-r border-zinc-800 ${showSidebar ? "w-72 opacity-100" : "w-0 opacity-0 overflow-hidden px-0"} transition-all duration-300 ease-in-out`}>
          <Sidebar 
            chats={chats} 
            receiveId={receiveId} 
            deleteChat={deleteChat} 
            startNewChat={startNewChat} 
            handleRename={handleRename}
            setShowSidebar={setShowSidebar}
        />
      </div>
      <div className='flex-1 flex flex-col h-dvh overflow-hidden relative'>
        <Header 
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          activeMode={activeMode}
          setActiveMode={setActiveMode}
        />
        <ChatArea 
          activeChat={activeChat}
          apiLoad={apiLoad}
          bottomRef={bottomRef}
          onSelectPrompt={(promptText) => askQuestion(promptText)}
        />
        <ChatInput 
          question={question}
          setQuestion={setQuestion}
          apiLoad={apiLoad}
          handleKeyDown={handleKeyDown}
          askQuestion={() => askQuestion()}
          inputRef={inputRef}
          activeMode={activeMode}
        />
      </div>
    </div>
  )
}

export default App