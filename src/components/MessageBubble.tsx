import React from 'react'
import Answers from './Answers'

type Message = {
  type: string,
  text: string
}
type MessageBubbleProps = {
  msg: Message
}
const MessageBubble = ({msg}: MessageBubbleProps ) => {
  return (
            <div
                className={`p-2 ${
                  msg.type === "user"
                    ? "bg-zinc-800 rounded-2xl w-fit max-w-[90%] md:max-w-[80%] ml-auto break-words"
                    : "text-left"
                }`}
            >
                <Answers text={msg.text} />
            </div>
  )
}

export default MessageBubble
