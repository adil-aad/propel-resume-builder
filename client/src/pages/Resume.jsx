import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { dummyResumeData } from '../assets/assets'
import { ArrowLeftIcon, Briefcase, ChevronLeft, ChevronRight, FileText, FolderIcon, GraduationCap, Sparkles, User } from 'lucide-react'
import EducaitonForm from '../components/EducaitonForm'
import ExperienceForm from '../components/ExperienceForm'
import PersonalInfo from '../components/PersonalInfo'
import ProffesionalSummary from '../components/ProffesionalSummary'
import ResumePreview from '../components/ResumePreview'
import TemplateSelector from '../components/TemplateSelector'
import ColorPicker from '../components/ColorPicker'

const Resume = () => {

  const {resumeId} = useParams()

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

  const loadExsistingResume = async () => {
    const resume = dummyResumeData.find(resume => resume._id === resumeId)
    if (resume) {
      setResumeData(resume)
      document.title = resume.title
    }
  }

  const [activeSectionIndex, setActiveSectionIndex] = useState(0)
  const [removeBackground, setRemoveBackground] = useState(false)

  const sections = [
    {id: "personal", name: "Personal Info", icon: User},
    {id: "summary", name: "Summary", icon: FileText},
    {id: "experience", name: "Experience", icon: Briefcase},
    {id: "education", name: "Education", icon: GraduationCap},
    {id: "projects", name: "Projects", icon: FolderIcon},
    {id: "skills", name: "Skills", icon: Sparkles}
  ]

  const activeSection = sections[activeSectionIndex]

  useEffect(()=>{
    loadExsistingResume()
  }, [])
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
                  <div className='flex items-center gap-3 text-sm text-slate-500'>
                    <span className='rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700'>
                      {resumeData.template}
                    </span>
                    <span className='inline-flex items-center gap-2'>
                      <span className='h-3 w-3 rounded-full border border-white shadow-sm' style={{ backgroundColor: resumeData.accent_color }} />
                      {resumeData.accent_color}
                    </span>
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
