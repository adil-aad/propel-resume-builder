import {
  Clock3,
  FilePenLineIcon,
  PencilIcon,
  PlusIcon,
  Sparkles,
  Trash,
  UploadCloud,
  UploadCloudIcon,
  XIcon,
} from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { dummyResumeData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const colors = ['#14b8a6', '#0ea5e9', '#f97316', '#f43f5e', '#8b5cf6']

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
    if (confirm) {
      setAllResumes(prev => prev.filter(resume => resume._id !== resumeId))
    }
  }

  useEffect(() => {
    loadAllResumes()
  }, [])

  const stats = [
    {
      label: 'Saved resumes',
      value: allResumes.length,
      note: 'Ready to edit and export',
    },
    {
      label: 'Latest update',
      value: allResumes[0]?.updatedAt ? new Date(allResumes[0].updatedAt).toLocaleDateString() : '--',
      note: 'Most recent resume activity',
    },
  ]

  const closeCreateModal = () => {
    setshowCreateResume(false)
    setTitle('')
  }

  const closeUploadModal = () => {
    setshowUploadResume(false)
    setTitle('')
    setResume(null)
  }

  const closeEditModal = () => {
    setEditResumeId('')
    setTitle('')
  }

  return (
    <div className="min-h-screen overflow-hidden bg-[#f3efe7] text-slate-900">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[-5%] h-72 w-72 rounded-full bg-orange-300/30 blur-3xl" />
        <div className="absolute right-[-8%] top-24 h-80 w-80 rounded-full bg-cyan-300/30 blur-3xl" />
        <div className="absolute bottom-[-8%] left-1/3 h-96 w-96 rounded-full bg-emerald-300/20 blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-[32px] border border-slate-900/10 bg-slate-950 text-white shadow-[0_32px_90px_-40px_rgba(15,23,42,0.7)]">
          <div className="grid gap-8 px-6 py-8 sm:px-8 lg:grid-cols-[1.4fr_0.9fr] lg:px-10 lg:py-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-white/70">
                <Sparkles className="size-3.5 text-cyan-300" />
                Resume Studio
              </div>

              <div className="space-y-3">
                <p className="text-sm font-medium uppercase tracking-[0.28em] text-white/45">
                  Dashboard
                </p>
                <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  Design, import, and refine your resume collection from one sharp workspace.
                </h1>
                <p className="max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                  Start a new draft, pull in an existing PDF, or jump back into your latest versions
                  without leaving the dashboard.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-slate-300 backdrop-blur-sm">
                Your active resume actions live just below, so this header stays focused on context and momentum instead of repeating controls.
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
                >
                  <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/45">
                    {stat.label}
                  </p>
                  <p className="mt-3 text-3xl font-semibold text-white">{stat.value}</p>
                  <p className="mt-2 text-sm text-slate-300">{stat.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <button
            onClick={() => setshowCreateResume(true)}
            className="group relative overflow-hidden rounded-[28px] border border-slate-900/10 bg-white/80 p-6 text-left shadow-[0_20px_60px_-38px_rgba(15,23,42,0.35)] backdrop-blur transition hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(249,115,22,0.08),transparent_55%)] opacity-0 transition group-hover:opacity-100" />
            <div className="relative flex items-start justify-between gap-6">
              <div className="space-y-3">
                <div className="inline-flex size-14 items-center justify-center rounded-2xl bg-slate-950 text-white">
                  <PlusIcon className="size-7" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Create from scratch</h2>
                  <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">
                    Launch a fresh resume canvas and start building section by section with your own content.
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-slate-500">
                Blank draft
              </span>
            </div>
          </button>

          <button
            onClick={() => setshowUploadResume(true)}
            className="group relative overflow-hidden rounded-[28px] border border-slate-900/10 bg-[#dff7f2] p-6 text-left shadow-[0_20px_60px_-38px_rgba(15,23,42,0.35)] transition hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(20,184,166,0.14),transparent_60%)] opacity-0 transition group-hover:opacity-100" />
            <div className="relative flex items-start justify-between gap-6">
              <div className="space-y-3">
                <div className="inline-flex size-14 items-center justify-center rounded-2xl bg-emerald-950 text-emerald-100">
                  <UploadCloudIcon className="size-7" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Import existing resume</h2>
                  <p className="mt-2 max-w-md text-sm leading-6 text-slate-700">
                    Bring in a PDF version you already have and continue editing it inside the builder flow.
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-slate-600">
                PDF upload
              </span>
            </div>
          </button>
        </section>

        <section className="rounded-[32px] border border-slate-900/10 bg-white/70 p-5 shadow-[0_20px_70px_-45px_rgba(15,23,42,0.4)] backdrop-blur sm:p-6">
          <div className="mb-6 flex flex-col gap-3 border-b border-slate-200/80 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.26em] text-slate-400">Library</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">Your resumes</h2>
              <p className="mt-1 text-sm text-slate-600">
                Open a draft, rename it, or remove it from your workspace.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">
              <Clock3 className="size-4" />
              {allResumes.length} total resumes
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {allResumes.map((resume, index) => {
              const baseColor = colors[index % colors.length]
              return (
                <div
                  key={resume._id || index}
                  onClick={() => navigate(`/app/builder/${resume._id}`)}
                  className="group relative cursor-pointer overflow-hidden rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_18px_50px_-42px_rgba(15,23,42,0.45)] transition hover:-translate-y-1 hover:shadow-[0_28px_65px_-38px_rgba(15,23,42,0.32)]"
                >
                  <div
                    className="absolute inset-x-0 top-0 h-1"
                    style={{ background: `linear-gradient(90deg, ${baseColor}, ${baseColor}88)` }}
                  />

                  <div className="flex items-start justify-between gap-4">
                    <div
                      className="inline-flex size-14 items-center justify-center rounded-2xl"
                      style={{ backgroundColor: `${baseColor}18`, color: baseColor }}
                    >
                      <FilePenLineIcon className="size-7" />
                    </div>

                    <div
                      onClick={e => e.stopPropagation()}
                      className="flex gap-2 opacity-100 sm:opacity-0 sm:transition sm:group-hover:opacity-100"
                    >
                      <button
                        className="rounded-xl border border-slate-200 p-2 text-slate-500 transition hover:border-slate-300 hover:text-cyan-600"
                        onClick={() => {
                          setEditResumeId(resume._id)
                          setTitle(resume.title)
                        }}
                      >
                        <PencilIcon className="size-4" />
                      </button>
                      <button
                        className="rounded-xl border border-slate-200 p-2 text-slate-500 transition hover:border-red-200 hover:text-red-500"
                        onClick={() => deleteResume(resume._id)}
                      >
                        <Trash className="size-4" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-10 space-y-5">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
                        {resume.template}
                      </p>
                      <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">
                        {resume.title}
                      </h3>
                    </div>

                    <div className="flex items-center justify-between gap-4 text-sm text-slate-500">
                      <span>Updated {new Date(resume.updatedAt).toLocaleDateString()}</span>
                      <span
                        className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em]"
                        style={{ backgroundColor: `${baseColor}18`, color: baseColor }}
                      >
                        {resume.public ? 'Public' : 'Private'}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {showCreateResume && (
          <form
            onSubmit={createResume}
            onClick={closeCreateModal}
            className="fixed inset-0 z-10 flex items-center justify-center bg-slate-950/65 px-4 backdrop-blur-md"
          >
            <div
              onClick={e => e.stopPropagation()}
              className="relative w-full max-w-md overflow-hidden rounded-[28px] border border-slate-200 bg-white p-6 shadow-2xl"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange-500 via-amber-400 to-rose-500" />
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Create a new resume</h2>
              <p className="mt-2 text-sm text-slate-600">
                Give this draft a title so you can spot it quickly in your dashboard.
              </p>

              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Enter resume title"
                className="mt-6 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-500 focus:ring-4 focus:ring-slate-200"
                required
              />

              <button
                type="submit"
                className="mt-5 w-full rounded-2xl bg-slate-950 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Create Resume
              </button>

              <XIcon
                className="absolute right-5 top-5 cursor-pointer text-slate-400 transition hover:text-slate-700"
                onClick={closeCreateModal}
              />
            </div>
          </form>
        )}

        {showUploadResume && (
          <form
            onSubmit={uploadResume}
            onClick={closeUploadModal}
            className="fixed inset-0 z-10 flex items-center justify-center bg-slate-950/65 px-4 backdrop-blur-md"
          >
            <div
              onClick={e => e.stopPropagation()}
              className="relative w-full max-w-md overflow-hidden rounded-[28px] border border-slate-200 bg-white p-6 shadow-2xl"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 via-cyan-400 to-sky-500" />
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Upload resume</h2>
              <p className="mt-2 text-sm text-slate-600">
                Add a title and import a PDF file to continue editing from an existing version.
              </p>

              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Enter resume title"
                className="mt-6 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-500 focus:ring-4 focus:ring-slate-200"
                required
              />

              <div className="mt-5">
                <label htmlFor="resume" className="block text-sm font-medium text-slate-700">
                  Select resume file
                  <input
                    id="resume"
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={(e) => setResume(e.target.files?.[0] || null)}
                    required
                  />

                  <div className="mt-3 flex min-h-48 flex-col items-center justify-center gap-3 rounded-[24px] border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-slate-400 transition hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-700">
                    {resume ? (
                      <>
                        <div className="inline-flex size-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                          <UploadCloud className="size-7" />
                        </div>
                        <p className="text-sm font-semibold text-emerald-700">{resume.name}</p>
                        <p className="text-xs text-slate-500">Click again if you want to replace the file.</p>
                      </>
                    ) : (
                      <>
                        <UploadCloud className="size-14 stroke-1" />
                        <p className="text-sm font-semibold">Upload your PDF resume</p>
                        <p className="text-xs text-slate-500">Drag and drop is not enabled yet, but click to browse.</p>
                      </>
                    )}
                  </div>
                </label>
              </div>

              <button
                type="submit"
                className="mt-5 w-full rounded-2xl bg-emerald-600 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                Create Resume
              </button>

              <XIcon
                className="absolute right-5 top-5 cursor-pointer text-slate-400 transition hover:text-slate-700"
                onClick={closeUploadModal}
              />
            </div>
          </form>
        )}

        {editResumeId && (
          <form
            onSubmit={editTitle}
            onClick={closeEditModal}
            className="fixed inset-0 z-10 flex items-center justify-center bg-slate-950/65 px-4 backdrop-blur-md"
          >
            <div
              onClick={e => e.stopPropagation()}
              className="relative w-full max-w-md overflow-hidden rounded-[28px] border border-slate-200 bg-white p-6 shadow-2xl"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-500 via-cyan-400 to-indigo-500" />
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Edit resume title</h2>
              <p className="mt-2 text-sm text-slate-600">
                Update the name shown in your dashboard without affecting the resume content.
              </p>

              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Enter resume title"
                className="mt-6 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-500 focus:ring-4 focus:ring-slate-200"
                required
              />

              <button
                type="submit"
                className="mt-5 w-full rounded-2xl bg-sky-600 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
              >
                Update
              </button>

              <XIcon
                className="absolute right-5 top-5 cursor-pointer text-slate-400 transition hover:text-slate-700"
                onClick={closeEditModal}
              />
            </div>
          </form>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap');
        * {
          font-family: 'Space Grotesk', sans-serif;
        }
      `}</style>
    </div>
  )
}

export default Dashboard
