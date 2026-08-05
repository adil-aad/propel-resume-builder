import React, { useState } from 'react'
import { Loader2, Sparkles } from 'lucide-react'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import api from '../configs/api.js'

const ProffesionalSummary = ({ data, onChange }) => {
  const summary = data || ''
  const characterCount = summary.trim().length

  const { token } = useSelector(state => state.auth)
  const [isGenerating, setIsGenerating] = useState(false)

  const generateSummary = async () => {
    if (!summary.trim()) {
      toast.error('Write a rough summary first, then let AI tighten it.')
      return
    }

    try {
      setIsGenerating(true)
      const prompt = `Enhance this professional resume summary while keeping it truthful and concise:\n\n${summary}`
      const { data } = await api.post('/api/ai/enhance-sum', { userContent: prompt },
        { headers: { Authorization: token } })

      onChange(data.enhancedContent)
      toast.success('Summary enhanced')
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div>
      <h2 className='text-lg font-medium text-ink'>Professional summary</h2>
      <p className='mt-1 text-sm text-muted'>
        Two or three lines on what you do and the value you bring.
      </p>

      <div className='mt-6'>
        <div className='flex items-center justify-between gap-3'>
          <label htmlFor='summary' className='label'>Summary</label>

          <button
            type='button'
            onClick={generateSummary}
            disabled={isGenerating}
            className='btn btn-ghost btn-sm -mr-2'
          >
            {isGenerating
              ? <Loader2 className='size-4 animate-spin' />
              : <Sparkles className='size-4' strokeWidth={1.75} />}
            {isGenerating ? 'Enhancing' : 'Enhance with AI'}
          </button>
        </div>

        <textarea
          id='summary'
          value={summary}
          onChange={(e) => onChange(e.target.value)}
          rows={8}
          placeholder='Full stack developer with 5+ years building scalable web applications in React, Node.js and TypeScript. Known for turning product ideas into reliable, well-tested systems.'
          className='field mt-2'
        />

        <p className='mt-2 text-xs text-faint'>{characterCount} characters</p>
      </div>
    </div>
  )
}

export default ProffesionalSummary
