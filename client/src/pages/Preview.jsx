import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loading from '../components/Loading'
import ResumePreview from '../components/ResumePreview'
import { ArrowLeftIcon, Download, Globe2, Loader2, Lock } from 'lucide-react'
import api from '../configs/api'
import { exportResumePdf } from '../utils/exportResumePdf'

const Preview = () => {

  const {resumeId} = useParams()

  const [resumeData, setResumeData] = useState(null)
  const [isMissing, setIsMissing] = useState(false)

  const loadResume = async () => {
    try {
      const { data } = await api.get('/api/resumes/public/' + resumeId)
      setResumeData(data.resume)
    } catch (error) {
      if (error?.response?.status === 404) {
        setIsMissing(true)
       }
      console.log(error.message)
    }
  }

  const [isDownloading, setIsDownloading] = useState(false)

  const downloadResume = async () => {
    const resumeNode = document.getElementById('resume-preview')
    if (!resumeNode) return

    setIsDownloading(true)

    try {
      await exportResumePdf(resumeNode, resumeData?.title || 'Resume')

    } catch (error) {
      console.error('PDF export error:', error)
    } finally {
      setIsDownloading(false)
    }
  }

  useEffect(() => {
    loadResume()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isMissing) {
    return (
      <div className='min-h-screen bg-[#f3efe7] px-6 py-10 text-slate-900'>
        <div className='mx-auto max-w-4xl rounded-[32px] border border-slate-200 bg-white p-10 text-center shadow-[0_24px_80px_-40px_rgba(15,23,42,0.25)]'>
          <h1 className='text-3xl font-semibold tracking-tight text-slate-900'>Resume not found</h1>
          <p className='mt-3 text-sm leading-6 text-slate-600'>
            This resume link does not match any available record.
          </p>
          <Link
            to='/'
            className='mt-6 inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800'
          >
            <ArrowLeftIcon className='size-4' />
            Back Home
          </Link>
        </div>
      </div>
    )
  }

  return resumeData ? (
    <div className='min-h-screen bg-[#f3efe7] px-4 py-8 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-7xl space-y-6'>
        <div className='flex flex-wrap items-center justify-between gap-4 rounded-[32px] border border-slate-200 bg-white/85 px-6 py-5 shadow-[0_24px_80px_-42px_rgba(15,23,42,0.25)] backdrop-blur-sm'>
          <div>
            <p className='text-xs font-semibold uppercase tracking-[0.24em] text-slate-400'>Public Resume Preview</p>
            <h1 className='mt-2 text-2xl font-semibold tracking-tight text-slate-900'>
              {resumeData.title || 'Resume Preview'}
            </h1>
            <div className='mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-500'>
              <span className='rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700'>
                {resumeData.template}
              </span>
              <span className='inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700'>
                <span className='h-3 w-3 rounded-full border border-white shadow-sm' style={{ backgroundColor: resumeData.accent_color }} />
                {resumeData.accent_color}
              </span>
              <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 font-medium ${
                resumeData.public ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-700'
              }`}>
                {resumeData.public ? <Globe2 className='size-4' /> : <Lock className='size-4' />}
                {resumeData.public ? 'Public' : 'Private'}
              </span>
            </div>
          </div>

          <div className='flex flex-wrap items-center gap-3'>
            <Link
              to='/'
              className='inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50'
            >
              <ArrowLeftIcon className='size-4' />
              Back
            </Link>
            <button
              type='button'
              onClick={downloadResume}
              disabled={isDownloading}
              className='inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60'
            >
              {isDownloading ? <Loader2 className='size-4 animate-spin' /> : <Download className='size-4' />}
              {isDownloading ? 'Exporting...' : 'Download'}
            </button>
          </div>
        </div>

        <ResumePreview
          data={resumeData}
          template={resumeData.template}
          accentColor={resumeData.accent_color}
          showHeader={false}
          classes='overflow-hidden'
        />
      </div>
    </div>
  ) : (
    <Loading message='Preparing the resume preview...' />
  )
}

export default Preview
