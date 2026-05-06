import React from 'react'
import ReactMarkdown from 'react-markdown'

const Answers = (props) => {
  return (
    <div>
      <ReactMarkdown>
        {props.text}
      </ReactMarkdown>
    </div>
  )
}

export default Answers
