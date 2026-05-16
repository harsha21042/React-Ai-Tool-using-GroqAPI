import React from 'react'
import { useState, useEffect } from 'react'


const useChat = () => {

    const [activeChatId, setActiveChatId] = React.useState(null)
    
    const [chats, setChats] = React.useState(() => {
        const stored = localStorage.getItem("chats")
        return stored ? JSON.parse(stored) : []
      })

    useEffect(() => {
        localStorage.setItem("chats", JSON.stringify(chats))
    }, [chats])

    const deleteChat = (id)=>{
        setChats(prev => prev.filter(chats => chats.id !== id ))
        if(activeChatId === id){
            setActiveChatId(null)
        }
    }

    const receiveId = (id)=>{
        setActiveChatId(id);
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
    }

    const addUserMessage =(currentQuestion)=>{
            let newMessage = {
                type: "user",
                text: currentQuestion
            }

         let chatId = activeChatId
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
       return chatId 
    }

    const addBotMessage = (chatId,botAns)=>{
        let botMessage = {
        type: "bot",
        text: botAns
      }

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

    }

    return {
            chats,
            setChats,
            deleteChat,
            activeChatId,
            setActiveChatId,
            receiveId,
            startNewChat,
            handleRename,
            addUserMessage,
            addBotMessage

            }
}

export default useChat
