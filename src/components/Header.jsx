import React from 'react'

const Header = ({ showSidebar, setShowSidebar, activeMode, setActiveMode }) => {
  const modes = [
    { id: 'general', label: 'General', icon: '💬' },
    { id: 'code', label: 'Code Architect', icon: '💻' },
    { id: 'debug', label: 'Bug Debugger', icon: '🐛' },
    { id: 'sql', label: 'SQL Generator', icon: '🗄️' },
  ]

  return (
    <header className='border-b border-zinc-800 bg-zinc-900/60 backdrop-blur-md px-4 py-3 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-10'>
      <div className='flex items-center gap-3'>
        <button
          className={`cursor-pointer text-xl text-zinc-300 hover:text-white transition-transform duration-300 ${showSidebar ? "rotate-90" : "rotate-0"}`}
          onClick={() => setShowSidebar(!showSidebar)}
          title="Toggle Sidebar"
        >
          ☰
        </button>
        <div className='flex items-center gap-2'>
          <div className='w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse'></div>
          <h1 className='text-zinc-100 font-bold text-lg tracking-tight'>
            DevPulse <span className='text-emerald-400 font-normal text-xs px-1.5 py-0.5 bg-emerald-950/60 border border-emerald-800/50 rounded'>Groq AI</span>
          </h1>
        </div>
      </div>

      {/* Mode Selector Toolbar */}
      <div className='flex items-center gap-1.5 bg-zinc-950/80 p-1 border border-zinc-800 rounded-lg overflow-x-auto max-w-full'>
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => setActiveMode(mode.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeMode === mode.id
                ? 'bg-zinc-800 text-emerald-400 shadow-sm border border-zinc-700/60'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
            }`}
          >
            <span>{mode.icon}</span>
            <span>{mode.label}</span>
          </button>
        ))}
      </div>
    </header>
  )
}

export default Header