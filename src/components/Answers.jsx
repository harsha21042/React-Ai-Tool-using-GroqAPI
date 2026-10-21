import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'

// Sub-component for individual Code Blocks with Copy button
const CodeBlock = ({ language, codeString }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className='my-4 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 shadow-md'>
      {/* Code Header Bar */}
      <div className='flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-zinc-800 text-xs font-mono text-zinc-400'>
        <span className='lowercase text-emerald-400 font-semibold'>{language || 'code'}</span>
        <button
          onClick={handleCopy}
          className='hover:text-white transition-colors flex items-center gap-1 cursor-pointer bg-zinc-800 hover:bg-zinc-700 px-2.5 py-1 rounded-md text-xs'
        >
          {copied ? (
            <>
              <span className='text-emerald-400'>✓</span>
              <span className='text-emerald-400'>Copied!</span>
            </>
          ) : (
            <>
              <span>📋</span>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Syntax Highlighted Code */}
      <SyntaxHighlighter
        style={oneDark}
        language={language || 'text'}
        PreTag="div"
        customStyle={{
          margin: 0,
          padding: '1rem',
          fontSize: '0.875rem',
          background: 'transparent',
        }}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  )
}

const Answers = ({ text }) => {
  return (
    <div className='prose prose-invert max-w-none text-zinc-200 text-sm md:text-base leading-relaxed'>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ inline, className, children }) {
            const match = /language-(\w+)/.exec(className || '')
            const codeContent = String(children).replace(/\n$/, '')

            return !inline && match ? (
              <CodeBlock language={match[1]} codeString={codeContent} />
            ) : (
              <code className='bg-zinc-800 text-emerald-300 px-1.5 py-0.5 rounded font-mono text-xs border border-zinc-700/50'>
                {children}
              </code>
            )
          },

          table({ children }) {
            return (
              <div className='overflow-x-auto my-4 rounded-lg border border-zinc-800'>
                <table className='table-auto border-collapse w-full text-left text-xs md:text-sm'>
                  {children}
                </table>
              </div>
            )
          },

          th({ children }) {
            return (
              <th className='border-b border-zinc-800 px-4 py-2.5 bg-zinc-900 font-semibold text-zinc-200'>
                {children}
              </th>
            )
          },

          td({ children }) {
            return (
              <td className='border-b border-zinc-800/60 px-4 py-2.5 text-zinc-300'>
                {children}
              </td>
            )
          },

          h1({ children }) {
            return <h1 className='text-xl md:text-2xl font-bold text-zinc-100 mt-6 mb-3'>{children}</h1>
          },

          h2({ children }) {
            return <h2 className='text-lg md:text-xl font-semibold text-zinc-100 mt-5 mb-2.5'>{children}</h2>
          },

          h3({ children }) {
            return <h3 className='text-base font-semibold text-zinc-200 mt-4 mb-2'>{children}</h3>
          },

          p({ children }) {
            return <p className='my-2.5 text-zinc-300 leading-relaxed'>{children}</p>
          },

          ul({ children }) {
            return <ul className='list-disc list-inside space-y-1 my-2 text-zinc-300'>{children}</ul>
          },

          ol({ children }) {
            return <ol className='list-decimal list-inside space-y-1 my-2 text-zinc-300'>{children}</ol>
          }
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  )
}

export default Answers