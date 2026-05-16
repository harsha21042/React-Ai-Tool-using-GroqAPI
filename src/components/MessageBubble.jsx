import React from 'react'
import Answers from './Answers'

const MessageBubble = (props) => {
  return (
            <div
                className={`p-2 ${
                  props.msg.type === "user"
                    ? "bg-zinc-800 rounded-2xl w-fit max-w-[90%] md:max-w-[80%] ml-auto break-words"
                    : "text-left"
                }`}
            >
                <Answers text={props.msg.text} />
            </div>
  )
}

export default MessageBubble
