import React, { useState } from 'react'
import { FileText, Sparkles } from 'lucide-react'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import api from '../configs/api.js'

const ProffesionalSummary = ({ data, onChange }) => {
  const summary = data || ''
  const characterCount = summary.trim().length

  const {token} = useSelector(state => state.auth)
  const [isGenerating, setIsGenerating] = useState(false)

  const generateSummary = async () => {
    if (!summary.trim()) {
      toast.error('Write a rough summary first so AI has something to improve.')
      return
    }

    try {
      setIsGenerating(true)
      const prompt = `Enhance this professional resume summary while keeping it truthful and concise:\n\n${summary}`
      const { data } = await api.post('/api/ai/enhance-sum', {userContent: prompt},
        {headers: {Authorization: token}})

      onChange(data.enhancedContent)
      toast.success('Summary enhanced')
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
    finally{
      setIsGenerating(false)
    }
  }

  return (
    <div>
      <div className='flex items-start justify-between gap-4'>
        <div>
          <h3 className='text-lg font-semibold text-gray-900'>Professional Summary</h3>
          <p className='text-sm text-gray-600'>
            Write a short introduction that explains who you are, what you do, and the value you bring.
          </p>
        </div>
        <div className='hidden rounded-2xl bg-slate-100 p-3 text-slate-600 sm:block'>
          <FileText className='size-5' />
        </div>
      </div>


      <div className='mt-6 space-y-3'>
        <div className='flex flex-wrap items-center justify-between gap-3'>
          <label className='flex items-center justify-between gap-3 text-sm font-medium text-gray-600'>
            <span>Summary</span>
            <span className='text-xs font-medium text-slate-400'>{characterCount} characters</span>
          </label>

          <button
            type='button'
            onClick={generateSummary}
            disabled={isGenerating}
            className='inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70'
          >
            <Sparkles className='size-4 text-orange-500' />
            {isGenerating ? 'Enhancing...' : 'AI Enhance'}
          </button>
        </div>

        <label className='sr-only'>
          <span>Summary</span>
        </label>

        <textarea
          value={summary}
          onChange={(e) => onChange(e.target.value)}
          rows={8}
          placeholder='Example: Full Stack Developer with 5+ years of experience building scalable web applications with React, Node.js, and TypeScript. Known for translating product ideas into polished user experiences and reliable backend systems.'
          className='w-full resize-none rounded-3xl border border-slate-300 bg-white px-4 py-4 text-sm leading-7 text-slate-800 outline-none transition focus:border-slate-500 focus:ring-4 focus:ring-slate-200'
        />
      </div>

    </div>
  )
}

export default ProffesionalSummary
