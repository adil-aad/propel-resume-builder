import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { dummyResumeData } from '../assets/assets'
import { ArrowLeftIcon, Briefcase, ChevronLeft, ChevronRight, Download, FileText, FolderIcon, GraduationCap, Lock, Share2, Sparkles, Unlock, User } from 'lucide-react'
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

const Resume = () => {

  const {resumeId} = useParams()
  const { token } = useSelector(state => state.auth)

  const [resumeData, setResumeData] = useState({
    _id: '',
    title: '',
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: "classic",
    accent_color: "#3B82F6",
    public: false,
  }) 

  const [activeSectionIndex, setActiveSectionIndex] = useState(0)
  const [removeBackground, setRemoveBackground] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const sections = [
    {id: "personal", name: "Personal Info", icon: User},
    {id: "summary", name: "Summary", icon: FileText},
    {id: "experience", name: "Experience", icon: Briefcase},
    {id: "education", name: "Education", icon: GraduationCap},
    {id: "projects", name: "Projects", icon: FolderIcon},
    {id: "skills", name: "Skills", icon: Sparkles}
  ]

  const activeSection = sections[activeSectionIndex]

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
      if(typeof resumeData.personal_info.image === 'object'){
        delete updatedResumeData.personal_info.image
      }

      const formData = new FormData()
      formData.append('resumeId', resumeId)
      formData.append('resumeData', JSON.stringify(updatedResumeData))
      removeBackground && formData.append("removeBackground", "yes")
      typeof resumeData.personal_info.image === 'object' && formData.append("image", 
        resumeData.personal_info.image
      )

      const { data } = await api.put('/api/resumes/update', formData, {headers: {Authorization: token}})

      setResumeData(data.resume)
      toast.success(data.message)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    } finally {
      setIsSaving(false)
    }
  }

  const handleShare = () => {
    const frontendUrl = window.location.href.split('/app/')[0]
    const resumeUrl = `${frontendUrl}/view/${resumeId}`

    if (navigator.share) {
      navigator.share({
        title: resumeData.title || 'My Resume',
        text: 'Take a look at my resume.',
        url: resumeUrl,
      })
    } else {
      navigator.clipboard?.writeText(resumeUrl)
      alert("Share not supported on this browser. Resume link copied instead.")
    }
  }


  const downloadResume = () => {
    const resumeNode = document.getElementById('resume-preview')
    if (!resumeNode) return

    const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
      .map((node) => node.outerHTML)
      .join('\n')

    const iframe = document.createElement('iframe')
    iframe.style.position = 'fixed'
    iframe.style.right = '0'
    iframe.style.bottom = '0'
    iframe.style.width = '0'
    iframe.style.height = '0'
    iframe.style.border = '0'
    document.body.appendChild(iframe)

    const iframeDocument = iframe.contentWindow?.document
    if (!iframeDocument) {
      document.body.removeChild(iframe)
      alert('Unable to prepare the resume for download.')
      return
    }

    iframeDocument.open()
    iframeDocument.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${resumeData.title || 'Resume'}</title>
          ${styles}
          <style>
            body {
              margin: 0;
              background: white;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            #print-root {
              width: 100%;
              margin: 0;
              padding: 0;
              background: white;
            }
            #print-root > * {
              border: none !important;
              box-shadow: none !important;
              border-radius: 0 !important;
            }
            @page {
              margin: 12mm;
            }
          </style>
        </head>
        <body>
          <div id="print-root">${resumeNode.outerHTML}</div>
        </body>
      </html>
    `)
    iframeDocument.close()

    setTimeout(() => {
      iframe.contentWindow?.focus()
      iframe.contentWindow?.print()
      setTimeout(() => {
        document.body.removeChild(iframe)
      }, 1000)
    }, 250)
  }

  useEffect(()=>{
    if (!token || !resumeId) return

    let isMounted = true

    api.get(`/api/resumes/get/${resumeId}`, {headers: {Authorization: token}})
      .then(({ data }) => {
        if (!isMounted) return
        setResumeData(data.resume)
        document.title = data.resume.title || 'Untitled Resume'
      })
      .catch((error) => {
        if (!isMounted) return

        const resume = dummyResumeData.find(resume => resume._id === resumeId)
        if (resume) {
          setResumeData(resume)
          document.title = resume.title
          return
        }

        toast.error(error?.response?.data?.message || error.message)
      })

    return () => {
      isMounted = false
    }
  }, [token, resumeId])
  return (
    <div>
      <div className='max-w-7xl mx-auto px-4 py-6'> 
        <Link to={'/app'} className='inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all'>
          <ArrowLeftIcon className='size-4'/> Back to DashBoard
        </Link>
      </div>

      <div className='max-w-7xl mx-auto px-4 pb-8'>
        <div className='grid lg:grid-cols-12 gap-10'> 
          {/* Left Panel*/}
          <div className='relative lg:col-span-5 rounded-lg overflow-hidden'>
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1'>
              {/* progress bar*/}
              <hr className='absolute top-0 left-0 right-0 border-2 border-gray-200'/>
              <hr className='absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 border-none
              transition-all duration-2000' style={{width: `${activeSectionIndex * 100 / (sections.length - 1)}%`}}/>

              <div className='flex justify-between items-center mb-6 border-b border-gray-300 py-1'>
                <div></div>
                <div className='flex items-center'></div>
                {activeSectionIndex !== 0 && (
                  <button onClick={()=> setActiveSectionIndex((prevIndex)=> Math.max(prevIndex - 1, 0))} className='flex items-center gap-1 p-3 rounded-lg text-sm font-medium
                  text-gray-600 hover:bg-gray-50 transition-all' disabled={activeSectionIndex === 0}>
                    <ChevronLeft className='size-4'/> Previous</button>
                )}

                <button onClick={()=> setActiveSectionIndex((prevIndex)=> Math.min(prevIndex + 1, sections.length-1))} className={`flex items-center gap-1 p-3 rounded-lg
                  text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ${activeSectionIndex === sections.length -1 &&
                    'opacity-50'
                  }`} disabled={activeSectionIndex === sections.length-1}>
                    <ChevronRight className='size-4'/> Next</button>
              </div>
                {/* Form Content*/}
              <div className='space-y-6'>
                {activeSection.id === 'personal' && (
                  <PersonalInfo data={resumeData.personal_info}
                   onChange={(data)=>setResumeData(prev => ({...prev, personal_info: data}))}
                    removeBackground={removeBackground}
                    setRemoveBackground={setRemoveBackground}/>
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
                    onSave={saveResume}
                    isSaving={isSaving}
                  />
                )}
              </div>
            </div>

          </div>

          {/* Right panel*/}
          <div className='lg:col-span-7'>
            <div className='space-y-4 lg:sticky lg:top-6'>
              <div className='rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-sm'>
                <div className='flex flex-wrap items-center justify-between gap-3'>
                  <div>
                    <p className='text-xs font-semibold uppercase tracking-[0.24em] text-slate-400'>Preview Panel</p>
                    <h2 className='text-lg font-semibold text-slate-900'>{resumeData.title || 'Untitled Resume'}</h2>
                  </div>
                  <div className='flex flex-wrap items-center gap-3 text-sm text-slate-500'>
                    <span className='rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700'>
                      {resumeData.template}
                    </span>
                    <span className='inline-flex items-center gap-2'>
                      <span className='h-3 w-3 rounded-full border border-white shadow-sm' style={{ backgroundColor: resumeData.accent_color }} />
                      {resumeData.accent_color}
                    </span>
                    <button
                      type='button'
                      onClick={changeResumeVisibility}
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition ${
                        resumeData.public
                          ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {resumeData.public ? <Unlock className='size-3.5' /> : <Lock className='size-3.5' />}
                      {resumeData.public ? 'Public' : 'Private'}
                    </button>
                    <button
                      type='button'
                      onClick={handleShare}
                      className='inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700 transition hover:border-slate-300 hover:bg-slate-50'
                    >
                      <Share2 className='size-3.5' />
                      Share
                    </button>
                    <button
                      type='button'
                      onClick={downloadResume}
                      className='inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700 transition hover:border-slate-300 hover:bg-slate-50'
                    >
                      <Download className='size-3.5' />
                      Download
                    </button>
                  </div>
                </div>
              </div>

              <TemplateSelector
                selectedTemplate={resumeData.template}
                onChange={(template) => setResumeData((prev) => ({ ...prev, template }))}
              />

              <ColorPicker
                selectedColor={resumeData.accent_color}
                onChange={(accent_color) => setResumeData((prev) => ({ ...prev, accent_color }))}
              />

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
