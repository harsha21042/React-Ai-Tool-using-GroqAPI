import React from 'react'
import { useState, useEffect } from 'react'


type Message = {
  type : "user" | "bot",
  text : string
}
type Chat ={
  id : number,
  title : string,
  messages : Message[]
}
const useChat = () => {

    const [activeChatId, setActiveChatId] = useState<number | null>(null)
    
    const [chats, setChats] = useState<Chat[]>(() => {
        const stored = localStorage.getItem("chats")
        return stored ? JSON.parse(stored) : []
      })

    useEffect(() => {
        localStorage.setItem("chats", JSON.stringify(chats))
    }, [chats])

    const deleteChat = (id : number)=>{
        setChats(prev => prev.filter(chats => chats.id !== id ))
        if(activeChatId === id){
            setActiveChatId(null)
        }
    }

    const receiveId = (id : number)=>{
        setActiveChatId(id);
    }

    const startNewChat = ()=>{
        setActiveChatId(null)
    }

    const handleRename =(editId : number,inputCurrentState : string)=>{
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

    const addUserMessage =(currentQuestion: string)=>{
            let newMessage: Message = {
                type: "user",
                text: currentQuestion
            }

         let chatId : number
         chatId = activeChatId!
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

    const addBotMessage = (chatId:number,botAns:string)=>{
        let botMessage: Message = {
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
