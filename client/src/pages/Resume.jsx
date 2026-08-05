import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Briefcase,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  FolderIcon,
  GraduationCap,
  Loader2,
  Lock,
  Share2,
  Sparkles,
  Globe2,
  User,
} from 'lucide-react'
import EducaitonForm from '../components/EducaitonForm'
import ExperienceForm from '../components/ExperienceForm'
import PersonalInfo from '../components/PersonalInfo'
import ProjectForm from '../components/ProjectForm'
import ProffesionalSummary from '../components/ProffesionalSummary'
import ResumePreview from '../components/ResumePreview'
import SkillsForm from '../components/SkillsForm'
import TemplateSelector from '../components/TemplateSelector'
import ColorPicker from '../components/ColorPicker'
import api from '../configs/api.js'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { exportResumePdf } from '../utils/exportResumePdf.js'
import { exportAtsResumePdf } from '../utils/exportAtsResumePdf.js'

const sections = [
  { id: 'personal', name: 'Personal', icon: User },
  { id: 'summary', name: 'Summary', icon: FileText },
  { id: 'experience', name: 'Experience', icon: Briefcase },
  { id: 'education', name: 'Education', icon: GraduationCap },
  { id: 'projects', name: 'Projects', icon: FolderIcon },
  { id: 'skills', name: 'Skills', icon: Sparkles },
]

const Resume = () => {
  const { resumeId } = useParams()
  const { token } = useSelector(state => state.auth)

  const [resumeData, setResumeData] = useState({
    _id: '',
    title: '',
    personal_info: {},
    professional_summary: '',
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: 'classic',
    accent_color: '#3B82F6',
    public: false,
  })

  const [activeSectionIndex, setActiveSectionIndex] = useState(0)
  const [removeBackground, setRemoveBackground] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [isDownloadingAts, setIsDownloadingAts] = useState(false)
  const [downloadMenuOpen, setDownloadMenuOpen] = useState(false)

  const activeSection = sections[activeSectionIndex]
  const isExporting = isDownloading || isDownloadingAts

  const changeResumeVisibility = async () => {
    const nextPublic = !resumeData.public
    const previousResumeData = resumeData

    setResumeData((prev) => ({ ...prev, public: nextPublic }))

    try {
      const { data } = await api.put('/api/resumes/update', {
        resumeId,
        resumeData: { public: nextPublic },
      }, { headers: { Authorization: token } })

      if (data.resume) {
        setResumeData((prev) => ({ ...prev, public: data.resume.public }))
      }

      toast.success(nextPublic ? 'Resume is now public' : 'Resume is now private')
    } catch (error) {
      setResumeData(previousResumeData)
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const saveResume = async () => {
    setIsSaving(true)

    try {
      let updatedResumeData = structuredClone(resumeData)

      delete updatedResumeData._id
      delete updatedResumeData.__v
      delete updatedResumeData.createdAt
      delete updatedResumeData.updatedAt

      // remove image from the resumedata
      if (typeof resumeData.personal_info.image === 'object') {
        delete updatedResumeData.personal_info.image
      }

      const formData = new FormData()
      formData.append('resumeId', resumeId)
      formData.append('resumeData', JSON.stringify(updatedResumeData))
      removeBackground && formData.append('removeBackground', 'yes')
      typeof resumeData.personal_info.image === 'object' && formData.append('image',
        resumeData.personal_info.image
      )

      const { data } = await api.put('/api/resumes/update', formData, { headers: { Authorization: token } })

      setResumeData(data.resume)
      toast.success(data.message)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    } finally {
      setIsSaving(false)
    }
  }

  const handleShare = async () => {
    const frontendUrl = window.location.href.split('/app/')[0]
    const resumeUrl = `${frontendUrl}/view/${resumeId}`

    if (navigator.share) {
      try {
        await navigator.share({
          title: resumeData.title || 'My Resume',
          text: 'Take a look at my resume.',
          url: resumeUrl,
        })
        return
      } catch {
        // fall through to copying the link
      }
    }

    try {
      await navigator.clipboard.writeText(resumeUrl)
      toast.success('Link copied to clipboard')
    } catch {
      toast.error('Could not copy the link')
    }
  }

  const downloadResume = async () => {
    const resumeNode = document.getElementById('resume-preview')
    if (!resumeNode) return

    setDownloadMenuOpen(false)
    setIsDownloading(true)

    try {
      await exportResumePdf(resumeNode, resumeData.title || 'Resume')
    } catch (error) {
      console.error('PDF export error:', error)
      toast.error('Could not export the PDF')
    } finally {
      setIsDownloading(false)
    }
  }

  const downloadAtsResume = () => {
    setDownloadMenuOpen(false)
    setIsDownloadingAts(true)

    try {
      exportAtsResumePdf(resumeData)
    } catch (error) {
      console.error('ATS PDF export error:', error)
      toast.error('Could not export the ATS PDF')
    } finally {
      setIsDownloadingAts(false)
    }
  }

  useEffect(() => {
    if (!token || !resumeId) return

    let isMounted = true

    api.get(`/api/resumes/get/${resumeId}`, { headers: { Authorization: token } })
      .then(({ data }) => {
        if (!isMounted) return
        setResumeData(data.resume)
        document.title = data.resume.title || 'Untitled Resume'
      })
      .catch((error) => {
        if (!isMounted) return
        toast.error(error?.response?.data?.message || error.message)
      })

    return () => {
      isMounted = false
    }
  }, [token, resumeId])

  return (
    <div>
      {/* Builder toolbar */}
      <div className='sticky top-[65px] z-30 border-b border-line bg-paper/85 backdrop-blur-md'>
        <div className='mx-auto flex max-w-[110rem] items-center justify-between gap-4 px-6 py-3 lg:px-8'>
          <div className='flex min-w-0 items-center gap-3'>
            <Link
              to='/app'
              aria-label='Back to resumes'
              className='shrink-0 rounded-md p-1.5 text-muted transition hover:bg-paper-dim hover:text-ink'
            >
              <ArrowLeft className='size-4' />
            </Link>

            <h1 className='truncate text-sm font-medium text-ink'>
              {resumeData.title || 'Untitled Resume'}
            </h1>

            <button
              type='button'
              onClick={changeResumeVisibility}
              title={resumeData.public ? 'Anyone with the link can view' : 'Only you can view'}
              className='hidden shrink-0 items-center gap-1.5 rounded-full border border-line bg-surface px-2.5 py-1 text-xs text-muted transition hover:border-line-strong hover:text-ink sm:inline-flex'
            >
              {resumeData.public ? <Globe2 className='size-3.5' /> : <Lock className='size-3.5' />}
              {resumeData.public ? 'Public' : 'Private'}
            </button>
          </div>

          <div className='flex shrink-0 items-center gap-2'>
            <button type='button' onClick={handleShare} className='btn btn-secondary btn-sm'>
              <Share2 className='size-4' />
              <span className='hidden sm:inline'>Share</span>
            </button>

            <div className='relative'>
              <button
                type='button'
                onClick={() => setDownloadMenuOpen(prev => !prev)}
                disabled={isExporting}
                className='btn btn-secondary btn-sm'
              >
                {isExporting
                  ? <Loader2 className='size-4 animate-spin' />
                  : <Download className='size-4' />}
                <span className='hidden sm:inline'>{isExporting ? 'Exporting' : 'Download'}</span>
                <ChevronDown className='size-3.5 text-faint' />
              </button>

              {downloadMenuOpen && (
                <>
                  <div className='fixed inset-0 z-30' onClick={() => setDownloadMenuOpen(false)} />
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

            <button type='button' onClick={saveResume} disabled={isSaving} className='btn btn-primary btn-sm'>
              {isSaving && <Loader2 className='size-4 animate-spin' />}
              {isSaving ? 'Saving' : 'Save'}
            </button>
          </div>
        </div>
      </div>

      <div className='mx-auto max-w-[110rem] px-6 py-8 lg:px-8'>
        <div className='grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] xl:gap-12'>
          {/* Editor */}
          <div className='rounded-xl border border-line bg-surface'>
            <div className='flex gap-1 overflow-x-auto border-b border-line px-3'>
              {sections.map((section, index) => {
                const Icon = section.icon
                const isActive = index === activeSectionIndex
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSectionIndex(index)}
                    className={`flex shrink-0 items-center gap-2 border-b-2 px-3 py-3.5 text-sm transition ${
                      isActive
                        ? 'border-ink font-medium text-ink'
                        : 'border-transparent text-muted hover:text-ink'
                    }`}
                  >
                    <Icon className='size-4' strokeWidth={1.75} />
                    {section.name}
                  </button>
                )
              })}
            </div>

            <div className='p-6'>
              {activeSection.id === 'personal' && (
                <PersonalInfo
                  data={resumeData.personal_info}
                  onChange={(data) => setResumeData(prev => ({ ...prev, personal_info: data }))}
                  removeBackground={removeBackground}
                  setRemoveBackground={setRemoveBackground}
                />
              )}

              {activeSection.id === 'summary' && (
                <ProffesionalSummary
                  data={resumeData.professional_summary}
                  onChange={(professional_summary) =>
                    setResumeData((prev) => ({ ...prev, professional_summary }))
                  }
                />
              )}

              {activeSection.id === 'experience' && (
                <ExperienceForm
                  data={resumeData.experience}
                  onChange={(experience) => setResumeData((prev) => ({ ...prev, experience }))}
                />
              )}

              {activeSection.id === 'education' && (
                <EducaitonForm
                  data={resumeData.education}
                  onChange={(education) => setResumeData((prev) => ({ ...prev, education }))}
                />
              )}

              {activeSection.id === 'projects' && (
                <ProjectForm
                  data={resumeData.project}
                  onChange={(project) => setResumeData((prev) => ({ ...prev, project }))}
                />
              )}

              {activeSection.id === 'skills' && (
                <SkillsForm
                  data={resumeData.skills}
                  onChange={(skills) => setResumeData((prev) => ({ ...prev, skills }))}
                />
              )}

              <div className='mt-8 flex items-center justify-between border-t border-line pt-5'>
                <button
                  type='button'
                  onClick={() => setActiveSectionIndex((prev) => Math.max(prev - 1, 0))}
                  disabled={activeSectionIndex === 0}
                  className='btn btn-secondary btn-sm'
                >
                  <ChevronLeft className='size-4' />
                  Back
                </button>

                {activeSectionIndex < sections.length - 1 ? (
                  <button
                    type='button'
                    onClick={() => setActiveSectionIndex((prev) => Math.min(prev + 1, sections.length - 1))}
                    className='btn btn-secondary btn-sm'
                  >
                    Next
                    <ChevronRight className='size-4' />
                  </button>
                ) : (
                  <button type='button' onClick={saveResume} disabled={isSaving} className='btn btn-primary btn-sm'>
                    {isSaving && <Loader2 className='size-4 animate-spin' />}
                    {isSaving ? 'Saving' : 'Save'}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className='lg:sticky lg:top-[9.5rem] lg:self-start'>
            <div className='mb-4 flex flex-wrap items-center justify-between gap-4'>
              <TemplateSelector
                selectedTemplate={resumeData.template}
                accentColor={resumeData.accent_color}
                onChange={(template) => setResumeData((prev) => ({ ...prev, template }))}
              />

              <ColorPicker
                selectedColor={resumeData.accent_color}
                onChange={(accent_color) => setResumeData((prev) => ({ ...prev, accent_color }))}
              />
            </div>

            <div className='max-h-[calc(100vh-12rem)] overflow-y-auto rounded-xl'>
              <ResumePreview
                data={resumeData}
                template={resumeData.template}
                accentColor={resumeData.accent_color}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Resume
