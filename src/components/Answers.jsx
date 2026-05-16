import React from 'react'
import ReactMarkdown from 'react-markdown'

import { Prism as SyntaxHighlighter }
from 'react-syntax-highlighter'

import { oneDark }
from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'

const Answers = (props) => {
  return (
    <div
    className='prose
        prose-invert
        prose-headings:text-white
        prose-p:text-zinc-300
        prose-strong:text-white
        prose-code:text-green-400
        max-w-none'
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{

              code({inline, className, children}) {
                const match =
                  /language-(\w+)/.exec(className || '')

                return !inline && match ? (

                  <SyntaxHighlighter
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>

                ) : (

                  <code className='bg-zinc-800 px-1 py-0.5 rounded'>
                    {children}
                  </code>
                )
              },

              table({children}) {
                return (
                  <div className='overflow-x-auto my-4'>
                    <table className='table-auto border-collapse border border-zinc-700 w-full'>
                      {children}
                    </table>
                  </div>
                )
              },

              th({children}) {
                return (
                  <th className='border border-zinc-700 px-4 py-2 bg-zinc-800'>
                    {children}
                  </th>
                )
              },

              td({children}) {
                return (
                  <td className='border border-zinc-700 px-4 py-2'>
                    {children}
                  </td>
                )
              },

              h1({children}) {
                return (
                  <h1 className='text-3xl font-bold mt-8 mb-4'>
                    {children}
                  </h1>
                )
              },

              h2({children}) {
                return (
                  <h2 className='text-2xl font-semibold mt-6 mb-3'>
                    {children}
                  </h2>
                )
              },

              p({children}) {
                return (
                  <p className='leading-8 my-3'>
                    {children}
                  </p>
                )
              }
          }}

        >
          {props.text}
        </ReactMarkdown>
    </div>
  )
}

export default Answers
