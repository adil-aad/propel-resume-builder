import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { dummyResumeData } from '../assets/assets'
import Loading from '../components/Loading'

const Preview = () => {

  const {resumeId} = useParams()

  const [resumeData, setResumeData] = useState(null)

  const loadResume = async () => {
    setResumeData(dummyResumeData.find((resume => resume._id === resumeId)))
  }

  useEffect(()=>{
    loadResume()
  },[])
  return resumeData ? (
    <div>

    </div>
  ) : (
    <Loading />
  )
}

export default Preview