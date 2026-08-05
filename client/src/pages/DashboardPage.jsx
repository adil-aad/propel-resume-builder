import { Copy, FileText, Loader2, PencilLine, Plus, Trash2, Upload, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import api from '../configs/api.js'
import pdfToText from 'react-pdftotext'

const formatDate = (value) =>
  value
    ? new Date(value).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })
    : '—'

const Modal = ({ title, description, onClose, children }) => (
  <div
    onClick={onClose}
    className='fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-4 backdrop-blur-sm'
  >
    <div
      onClick={e => e.stopPropagation()}
      className='w-full max-w-md rounded-xl border border-line bg-surface p-6 shadow-[0_32px_80px_-40px_rgb(22_21_15_/_0.5)]'
    >
      <div className='flex items-start justify-between gap-4'>
        <div>
          <h2 className='text-lg font-medium text-ink'>{title}</h2>
          {description && <p className='mt-1 text-sm text-muted'>{description}</p>}
        </div>
        <button
          type='button'
          onClick={onClose}
          aria-label='Close'
          className='-m-1 p-1 text-faint transition hover:text-ink'
        >
          <X className='size-4' />
        </button>
      </div>
      {children}
    </div>
  </div>
)

const Dashboard = () => {
  const { token } = useSelector(state => state.auth)
  const navigate = useNavigate()

  const [allResumes, setAllResumes] = useState([])
  const [isFetching, setIsFetching] = useState(true)

  const [showCreateResume, setshowCreateResume] = useState(false)
  const [showUploadResume, setshowUploadResume] = useState(false)
  const [editResumeId, setEditResumeId] = useState('')
  const [pendingDelete, setPendingDelete] = useState(null)

  const [title, setTitle] = useState('')
  const [resume, setResume] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const createResume = async (event) => {
    try {
      event.preventDefault()
      const { data } = await api.post('/api/resumes/create', { title }, { headers: { Authorization: token } })
      setAllResumes(prev => [data.resume, ...prev])
      setTitle('')
      setshowCreateResume(false)
      navigate(`/app/builder/${data.resume._id}`)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const uploadResume = async (event) => {
    event.preventDefault()
    setIsLoading(true)

    try {
      const resumeText = await pdfToText(resume)
      const { data } = await api.post('/api/ai/upload-resume', { title, resumeText }, { headers: { Authorization: token } })
      if (data.message) toast.success(data.message)
      setTitle('')
      setshowUploadResume(false)
      setResume(null)
      navigate(`/app/builder/${data.resumeId}`)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const editTitle = async (event) => {
    try {
      event.preventDefault()
      const { data } = await api.put('/api/resumes/update', {
        resumeId: editResumeId,
        resumeData: { title },
      }, { headers: { Authorization: token } })
      setAllResumes(prev => prev.map(item => item._id === editResumeId ? { ...item, title } : item))
      setTitle('')
      setEditResumeId('')
      toast.success(data.message)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const deleteResume = async () => {
    const resumeId = pendingDelete?._id
    if (!resumeId) return

    try {
      const { data } = await api.delete(`/api/resumes/delete/${resumeId}`, { headers: { Authorization: token } })
      setAllResumes(prev => prev.filter(item => item._id !== resumeId))
      setPendingDelete(null)
      toast.success(data.message)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const duplicateResume = async (resumeId) => {
    try {
      const { data } = await api.post(`/api/resumes/duplicate/${resumeId}`, {}, { headers: { Authorization: token } })
      setAllResumes(prev => [data.resume, ...prev])
      toast.success(data.message)
      navigate(`/app/builder/${data.resume._id}`)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  useEffect(() => {
    if (!token) return

    let isMounted = true

    api.get('/api/users/resumes', { headers: { Authorization: token } })
      .then(({ data }) => {
        if (isMounted) setAllResumes(data)
      })
      .catch((error) => {
        if (isMounted) toast.error(error?.response?.data?.message || error.message)
      })
      .finally(() => {
        if (isMounted) setIsFetching(false)
      })

    return () => {
      isMounted = false
    }
  }, [token])

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
    <div className='mx-auto max-w-6xl px-6 py-12 lg:px-8'>
      <div className='flex flex-wrap items-end justify-between gap-4'>
        <div>
          <h1 className='text-3xl font-medium text-ink'>Resumes</h1>
          <p className='mt-1 text-sm text-muted'>
            {isFetching
              ? 'Loading your resumes'
              : `${allResumes.length} ${allResumes.length === 1 ? 'resume' : 'resumes'}`}
          </p>
        </div>

        <div className='flex gap-2'>
          <button onClick={() => setshowUploadResume(true)} className='btn btn-secondary'>
            <Upload className='size-4' />
            Import PDF
          </button>
          <button onClick={() => setshowCreateResume(true)} className='btn btn-primary'>
            <Plus className='size-4' />
            New resume
          </button>
        </div>
      </div>

      <div className='mt-10'>
        {isFetching ? (
          <div className='flex items-center gap-3 py-16 text-sm text-muted'>
            <Loader2 className='size-4 animate-spin' />
            Loading
          </div>
        ) : allResumes.length === 0 ? (
          <div className='rounded-xl border border-dashed border-line-strong px-6 py-20 text-center'>
            <h2 className='text-base font-medium text-ink'>No resumes yet</h2>
            <p className='mx-auto mt-2 max-w-sm text-sm text-muted'>
              Start from a blank draft, or import a PDF you already have.
            </p>
            <button onClick={() => setshowCreateResume(true)} className='btn btn-primary mt-6'>
              <Plus className='size-4' />
              New resume
            </button>
          </div>
        ) : (
          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {allResumes.map((item) => (
              <article
                key={item._id}
                onClick={() => navigate(`/app/builder/${item._id}`)}
                className='group cursor-pointer rounded-xl border border-line bg-surface p-5 transition hover:border-line-strong'
              >
                <div className='flex items-start justify-between'>
                  <FileText className='size-5 text-faint' strokeWidth={1.75} />

                  <div
                    onClick={e => e.stopPropagation()}
                    className='flex gap-0.5 transition sm:opacity-0 sm:group-hover:opacity-100 sm:focus-within:opacity-100'
                  >
                    <button
                      title='Duplicate'
                      onClick={() => duplicateResume(item._id)}
                      className='rounded-md p-1.5 text-faint transition hover:bg-paper hover:text-ink'
                    >
                      <Copy className='size-4' />
                    </button>
                    <button
                      title='Rename'
                      onClick={() => {
                        setEditResumeId(item._id)
                        setTitle(item.title)
                      }}
                      className='rounded-md p-1.5 text-faint transition hover:bg-paper hover:text-ink'
                    >
                      <PencilLine className='size-4' />
                    </button>
                    <button
                      title='Delete'
                      onClick={() => setPendingDelete(item)}
                      className='rounded-md p-1.5 text-faint transition hover:bg-paper hover:text-accent'
                    >
                      <Trash2 className='size-4' />
                    </button>
                  </div>
                </div>

                <h2 className='mt-8 truncate text-base font-medium text-ink'>{item.title}</h2>

                <div className='mt-1.5 flex items-center gap-2 text-xs text-faint'>
                  <span className='capitalize'>{item.template}</span>
                  <span>·</span>
                  <span>Updated {formatDate(item.updatedAt)}</span>
                  {item.public && (
                    <>
                      <span>·</span>
                      <span className='text-accent'>Public</span>
                    </>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {showCreateResume && (
        <Modal title='New resume' onClose={closeCreateModal}>
          <form onSubmit={createResume} className='mt-5'>
            <label htmlFor='new-title' className='label'>Title</label>
            <input
              id='new-title'
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type='text'
              placeholder='Product Designer — 2026'
              className='field mt-2'
              autoFocus
              required
            />

            <div className='mt-6 flex justify-end gap-2'>
              <button type='button' onClick={closeCreateModal} className='btn btn-secondary'>Cancel</button>
              <button type='submit' className='btn btn-primary'>Create</button>
            </div>
          </form>
        </Modal>
      )}

      {showUploadResume && (
        <Modal title='Import a PDF' onClose={closeUploadModal}>
          <form onSubmit={uploadResume} className='mt-5'>
            <label htmlFor='upload-title' className='label'>Title</label>
            <input
              id='upload-title'
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type='text'
              placeholder='Product Designer — 2026'
              className='field mt-2'
              autoFocus
              required
            />

            <label htmlFor='resume' className='label mt-5'>Resume file</label>
            <label
              htmlFor='resume'
              className='mt-2 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-line-strong bg-paper px-4 py-10 text-center transition hover:border-ink'
            >
              <input
                id='resume'
                type='file'
                accept='.pdf'
                className='hidden'
                onChange={(e) => setResume(e.target.files?.[0] || null)}
                required
              />
              <Upload className='size-5 text-faint' strokeWidth={1.75} />
              <p className='text-sm font-medium text-ink'>
                {resume ? resume.name : 'Choose a PDF'}
              </p>
              <p className='text-xs text-faint'>
                {resume ? 'Click to replace' : 'We read the text and fill the builder for you'}
              </p>
            </label>

            <div className='mt-6 flex justify-end gap-2'>
              <button type='button' onClick={closeUploadModal} className='btn btn-secondary'>Cancel</button>
              <button type='submit' disabled={isLoading} className='btn btn-primary'>
                {isLoading && <Loader2 className='size-4 animate-spin' />}
                {isLoading ? 'Importing' : 'Import'}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {editResumeId && (
        <Modal title='Rename resume' onClose={closeEditModal}>
          <form onSubmit={editTitle} className='mt-5'>
            <label htmlFor='edit-title' className='label'>Title</label>
            <input
              id='edit-title'
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type='text'
              className='field mt-2'
              autoFocus
              required
            />

            <div className='mt-6 flex justify-end gap-2'>
              <button type='button' onClick={closeEditModal} className='btn btn-secondary'>Cancel</button>
              <button type='submit' className='btn btn-primary'>Save</button>
            </div>
          </form>
        </Modal>
      )}

      {pendingDelete && (
        <Modal
          title='Delete resume'
          description={`"${pendingDelete.title}" will be permanently removed.`}
          onClose={() => setPendingDelete(null)}
        >
          <div className='mt-6 flex justify-end gap-2'>
            <button type='button' onClick={() => setPendingDelete(null)} className='btn btn-secondary'>
              Cancel
            </button>
            <button
              type='button'
              onClick={deleteResume}
              className='btn bg-accent text-white hover:bg-accent-hover'
            >
              Delete
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default Dashboard
