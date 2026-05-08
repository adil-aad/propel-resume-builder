import React from 'react'

const Loading = ({ message = 'Loading your workspace...' }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-950/90 text-slate-100 px-6">
      <div className="relative rounded-3xl border border-slate-800/80 bg-slate-900/85 p-10 shadow-[0_30px_80px_rgba(15,23,42,0.45)] backdrop-blur-xl max-w-md w-full">
        <div className="absolute inset-x-0 -top-6 mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/30">
          <div className="h-8 w-8 rounded-full border-4 border-white/20 border-t-white animate-spin"></div>
        </div>

        <div className="mt-10 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-white">Almost there...</h2>
          <p className="mt-3 text-sm text-slate-300">{message}</p>
        </div>

        <div className="mt-10 flex items-center justify-between gap-3">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-800">
            <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 animate-pulse"></div>
          </div>
          <span className="text-xs uppercase tracking-[0.24em] text-slate-400">Loading</span>
        </div>
      </div>
    </div>
  )
}

export default Loading