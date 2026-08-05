import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loading from '../components/Loading'
import ResumePreview from '../components/ResumePreview'
import Logo from '../components/Logo'
import { ChevronDown, Download, Loader2 } from 'lucide-react'
import api from '../configs/api'
import { exportResumePdf } from '../utils/exportResumePdf'
import { exportAtsResumePdf } from '../utils/exportAtsResumePdf'

const Preview = () => {
  const { resumeId } = useParams()

  const [resumeData, setResumeData] = useState(null)
  const [isMissing, setIsMissing] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [isDownloadingAts, setIsDownloadingAts] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const isExporting = isDownloading || isDownloadingAts

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

  const downloadResume = async () => {
    const resumeNode = document.getElementById('resume-preview')
    if (!resumeNode) return

    setMenuOpen(false)
    setIsDownloading(true)

    try {
      await exportResumePdf(resumeNode, resumeData?.title || 'Resume')
    } catch (error) {
      console.error('PDF export error:', error)
    } finally {
      setIsDownloading(false)
    }
  }

  const downloadAtsResume = () => {
    setMenuOpen(false)
    setIsDownloadingAts(true)

    try {
      exportAtsResumePdf(resumeData)
    } catch (error) {
      console.error('ATS PDF export error:', error)
    } finally {
      setIsDownloadingAts(false)
    }
  }

  useEffect(() => {
    loadResume()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isMissing) {
    return (
      <div className='flex min-h-screen flex-col items-center justify-center bg-paper px-6 text-center'>
        <h1 className='text-2xl font-medium text-ink'>This resume is not available</h1>
        <p className='mt-2 text-sm text-muted'>The link may be private or no longer exist.</p>
        <Link to='/' className='btn btn-secondary mt-6'>Go to Propel Resume</Link>
      </div>
    )
  }

  if (!resumeData) return <Loading message='Loading resume' />

  return (
    <div className='min-h-screen bg-paper'>
      <header className='sticky top-0 z-30 border-b border-line bg-paper/85 backdrop-blur-md'>
        <div className='mx-auto flex max-w-4xl items-center justify-between gap-4 px-6 py-4'>
          <div className='flex min-w-0 items-center gap-4'>
            <Link to='/' className='shrink-0'>
              <Logo markClassName='size-7' showText={false} />
            </Link>
            <h1 className='truncate text-sm font-medium text-ink'>
              {resumeData.title || 'Resume'}
            </h1>
          </div>

          <div className='relative shrink-0'>
            <button
              type='button'
              onClick={() => setMenuOpen(prev => !prev)}
              disabled={isExporting}
              className='btn btn-primary btn-sm'
            >
              {isExporting ? <Loader2 className='size-4 animate-spin' /> : <Download className='size-4' />}
              {isExporting ? 'Exporting' : 'Download'}
              <ChevronDown className='size-3.5 opacity-60' />
            </button>

            {menuOpen && (
              <>
                <div className='fixed inset-0 z-30' onClick={() => setMenuOpen(false)} />
                <div className='absolute right-0 top-full z-40 mt-2 w-56 rounded-lg border border-line bg-surface p-1 shadow-[0_24px_60px_-32px_rgb(22_21_15_/_0.45)]'>
                  <button
                    type='button'
                    onClick={downloadResume}
                    className='w-full rounded-md px-3 py-2 text-left transition hover:bg-paper'
                  >
                    <span className='block text-sm text-ink'>Styled PDF</span>
                    <span className='block text-xs text-faint'>Keeps the template design</span>
                  </button>
                  <button
                    type='button'
                    onClick={downloadAtsResume}
                    className='w-full rounded-md px-3 py-2 text-left transition hover:bg-paper'
                  >
                    <span className='block text-sm text-ink'>ATS PDF</span>
                    <span className='block text-xs text-faint'>Plain text, machine readable</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      <main className='mx-auto max-w-4xl px-6 py-10'>
        <ResumePreview
          data={resumeData}
          template={resumeData.template}
          accentColor={resumeData.accent_color}
        />
      </main>
    </div>
  )
}

export default Preview
