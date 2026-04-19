import React from 'react'

const Banner = () => {
  return (
    <div className="w-full py-2.5 font-medium text-sm text-center bg-white/5 backdrop-blur-sm border-b border-white/10">
        <p>
          <span className="px-3 py-1 rounded-full text-xs font-semibold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 mr-2">
            New
          </span>
          <span className="text-gray-300">AI Feature</span>
        </p> 
    </div>
  )
}

export default Banner;