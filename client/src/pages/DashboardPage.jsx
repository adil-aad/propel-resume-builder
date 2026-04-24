import { FilePenLineIcon, PencilIcon, Plus, PlusIcon, Trash, UploadCloud, UploadCloudIcon, XIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { dummyResumeData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {

  const colors = ['#06b6d4', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981']

  const [allResumes, setAllResumes] = useState([])
  const [showCreateResume, setshowCreateResume] = useState(false)
  const [showUploadResume, setshowUploadResume] = useState(false)
  const [title, setTitle] = useState('')
  const [resume, setResume] = useState(null)
  const [editResumeId, setEditResumeId] = useState('')

  const navigate = useNavigate()

  const loadAllResumes = async () => {
    setAllResumes(dummyResumeData)
  }

  const createResume = async (event) => {
    event.preventDefault()
    setshowCreateResume(false)
    setTitle('')
    navigate(`/app/builder/res123`)
  }

  const uploadResume = async (event) => {
    event.preventDefault()
    if (!resume) return
    setshowUploadResume(false)
    setTitle('')
    setResume(null)
    navigate(`/app/builder/res123`)
  }

  const editTitle = async (event) => {
    event.preventDefault()
  }

  const deleteResume = async (resumeId) => {
    const confirm = window.confirm('Are you sure you want to delete this resume?')
    if(confirm){
      setAllResumes(prev => prev.filter(resume => resume._id !== resumeId))
    }
  }

  useEffect(()=>{
    loadAllResumes()
  }, [])
  
  return (
    <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 min-h-screen">
      <div className='max-w-7xl mx-auto px-4 py-8'>
        <p className='text-2xl font-semibold mb-6 bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent sm:hidden'>
          Welcome back, John Doe 👋
        </p>

        <div className='flex gap-5'>
          <button onClick={()=>setshowCreateResume(true)} className='w-full bg-white sm:max-w-40 h-52 flex flex-col items-center justify-center rounded-2xl gap-3 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group border border-gray-100 hover:border-cyan-200'>
            <div className='size-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-600 shadow-md shadow-cyan-200 flex items-center justify-center group-hover:scale-110 transition-all duration-300'>
              <PlusIcon className='size-7 text-white'/>
            </div>
            <div className='text-center'>
              <p className='font-semibold text-gray-700 group-hover:text-cyan-600 transition-colors'>Create New</p>
              <p className='text-xs text-gray-400 mt-0.5'>Start from scratch</p>
            </div>
          </button>
          
          <button onClick={()=>setshowUploadResume(true)} className='w-full bg-white sm:max-w-40 h-52 flex flex-col items-center justify-center rounded-2xl gap-3 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group border border-gray-100 hover:border-purple-200'>
            <div className='size-14 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-md shadow-purple-200 flex items-center justify-center group-hover:scale-110 transition-all duration-300'>
              <UploadCloudIcon className='size-7 text-white'/>
            </div>
            <div className='text-center'>
              <p className='font-semibold text-gray-700 group-hover:text-purple-600 transition-colors'>Upload PDF</p>
              <p className='text-xs text-gray-400 mt-0.5'>Import existing resume</p>
            </div>
          </button>
        </div>

        <div className='flex items-center gap-3 my-8'>
          <hr className='flex-1 border-gray-200'/>
          <span className='text-xs font-medium text-gray-400 uppercase tracking-wide'>Your Resumes</span>
          <hr className='flex-1 border-gray-200'/>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5'>
          {allResumes.map((resume, index)=> {
            const baseColor = colors[index % colors.length]
            return (
              <div key={index} onClick={()=> navigate(`/app/builder/${resume._id}`)} className='relative bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 group border border-gray-100 hover:border-gray-200 overflow-hidden'>
                <button className='w-full pt-8 pb-6 flex flex-col items-center justify-center gap-3 cursor-pointer'>
                  <div className='size-12 rounded-xl flex items-center justify-center' style={{backgroundColor: baseColor + '15'}}>
                    <FilePenLineIcon className='size-6' style={{color: baseColor}}/>
                  </div>
                  <div className='text-center px-2'>
                    <p className='font-medium text-gray-700 text-sm group-hover:text-gray-900 transition-colors'>{resume.title}</p>
                    <p className='text-[10px] text-gray-400 mt-1'>Updated {new Date(resume.updatedAt).toLocaleDateString()}</p>
                  </div>
                </button>
                
                <div onClick={e => e.stopPropagation()} className='absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200'>
                  <button className='p-1.5 rounded-lg hover:bg-gray-100 transition-colors'>
                    <PencilIcon onClick={()=>{setEditResumeId(resume._id); setTitle(resume.title)}} className='size-3.5 text-gray-500 hover:text-cyan-600'/>
                  </button>
                  <button className='p-1.5 rounded-lg hover:bg-gray-100 transition-colors'>
                    <Trash onClick={()=>deleteResume(resume._id)} className='size-3.5 text-gray-500 hover:text-red-500'/>
                  </button>
                </div>
                
                {/* Decorative accent line */}
                <div className='absolute bottom-0 left-0 right-0 h-0.5' style={{backgroundColor: baseColor}}></div>
              </div>
            )
          })}
        </div>
        {
          showCreateResume && (
            <form onSubmit={createResume} onClick={()=> setshowCreateResume(false)} className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 
            z-10 flex items-center justify-center'>
              <div onClick={e => e.stopPropagation()} className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6'>
                <h2 className='text-xl font-bold mb-4'>Create a Resume</h2>
                <input onChange={(e)=> setTitle(e.target.value)} value={title} type="text" placeholder='Enter Resume Title' className='w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600' required />
                <button type="submit" className='w-full py-2 bg-green-600 text-white rounded hover:bg-green-700
                transition-colors'>Create Resume</button>
                <XIcon className='absolute top-4 right-4 text-slate-400 hover:text-slate-600
                cursor-pointer transition-colors' onClick={()=>{setshowCreateResume(false); setTitle('')}}/>
              </div>

            </form>
          )
        }

        {
          showUploadResume && (
            <form onSubmit={uploadResume} onClick={()=> setshowUploadResume(false)} className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 
            z-10 flex items-center justify-center'>
              <div onClick={e => e.stopPropagation()} className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6'>
                <h2 className='text-xl font-bold mb-4'>Upload Resume</h2>
                <input onChange={(e)=> setTitle(e.target.value)} value={title} type="text" placeholder='Enter Resume Title' className='w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600' required />

                <div>
                  <label htmlFor="resume" className='block text-sm text-slate-700'>
                    Select Resume File
                    <input
                      id="resume"
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={(e) => setResume(e.target.files?.[0] || null)}
                      required
                    />
                    <div className='flex flex-col items-center justify-center gap-2 border group text-slate-400 border-slate-400
                    border-dashed rounded-md p-4 py-10 my-4 hover:border-green-500 hover:text-green-700 cursor-pointer transition-colors'> 
                      {
                        resume ? (
                          <p className='text-green-700'>{resume.name}</p>
                        ) : (
                          <>
                            <UploadCloud className='size-14 stroke-1'/>
                            <p>Upload Resume</p>
                          </>
                        )
                      }
                    </div>
                  </label>
                </div>
                <button type="submit" className='w-full py-2 bg-green-600 text-white rounded hover:bg-green-700
                transition-colors'>Create Resume</button>
                <XIcon className='absolute top-4 right-4 text-slate-400 hover:text-slate-600
                cursor-pointer transition-colors' onClick={()=>{setshowUploadResume(false); setTitle(''); setResume(null)}}/>
              </div>

            </form>
          )
        }

        {
          editResumeId && (
            <form onSubmit={editTitle} onClick={()=> setEditResumeId('')} className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 
            z-10 flex items-center justify-center'>
              <div onClick={e => e.stopPropagation()} className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6'>
                <h2 className='text-xl font-bold mb-4'>Edit Resume Title</h2>
                <input onChange={(e)=> setTitle(e.target.value)} value={title} type="text" placeholder='Enter Resume Title' className='w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600' required />
                <button type="submit" className='w-full py-2 bg-green-600 text-white rounded hover:bg-green-700
                transition-colors'>Update</button>
                <XIcon className='absolute top-4 right-4 text-slate-400 hover:text-slate-600
                cursor-pointer transition-colors' onClick={()=>{setEditResumeId(false); setTitle('')}}/>
              </div>

            </form>
          )
        }

        <div>

        </div>
      </div>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700;14..32,800&display=swap');
        * {
            font-family: 'Inter', sans-serif;
        }
      `}</style>
    </div>
  )
}

export default Dashboard
