import jsPDF from 'jspdf'

const MARGIN = 18
const PAGE_WIDTH = 210
const PAGE_HEIGHT = 297
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2

const sanitizeFileName = (name) => {
  const cleanName = Array.from((name || 'Resume').replace(/[<>:"/\\|?*]/g, ''))
    .filter((character) => character.charCodeAt(0) >= 32)
    .join('')
    .trim()
  return cleanName || 'Resume'
}

const formatDate = (dateStr) => {
  if (!dateStr) return ''

  const [year, month] = dateStr.split('-')
  if (!year || !month) return dateStr

  return new Date(year, month - 1).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  })
}

const compact = (items) => items.filter(Boolean).join(' | ')

const splitLines = (pdf, text, width = CONTENT_WIDTH) => (
  pdf.splitTextToSize(String(text || '').replace(/\r\n/g, '\n'), width)
)

const createWriter = (pdf) => {
  let y = MARGIN

  const ensureSpace = (height = 8) => {
    if (y + height <= PAGE_HEIGHT - MARGIN) return

    pdf.addPage()
    y = MARGIN
  }

  const writeLines = (lines, options = {}) => {
    const {
      size = 10,
      style = 'normal',
      lineHeight = 5,
      color = [31, 41, 55],
      indent = 0,
      spacingAfter = 0,
    } = options

    pdf.setFont('helvetica', style)
    pdf.setFontSize(size)
    pdf.setTextColor(...color)

    lines.forEach((line) => {
      ensureSpace(lineHeight)
      pdf.text(line, MARGIN + indent, y)
      y += lineHeight
    })

    y += spacingAfter
  }

  const heading = (text) => {
    if (!text) return

    ensureSpace(12)
    y += y === MARGIN ? 0 : 3
    pdf.setDrawColor(203, 213, 225)
    pdf.setLineWidth(0.2)
    pdf.line(MARGIN, y, PAGE_WIDTH - MARGIN, y)
    y += 6
    writeLines([text.toUpperCase()], {
      size: 11,
      style: 'bold',
      lineHeight: 5,
      color: [17, 24, 39],
      spacingAfter: 1,
    })
  }

  return { writeLines, heading }
}

const writeParagraph = (pdf, writer, text) => {
  if (!text) return

  writer.writeLines(splitLines(pdf, text), {
    size: 10,
    lineHeight: 5,
    spacingAfter: 2,
  })
}

const writeBulletText = (pdf, writer, text) => {
  if (!text) return

  String(text)
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .forEach((line) => {
      writer.writeLines(splitLines(pdf, `- ${line}`, CONTENT_WIDTH - 4), {
        size: 10,
        lineHeight: 5,
        indent: 4,
      })
    })
}

export const exportAtsResumePdf = (resumeData) => {
  const pdf = new jsPDF('p', 'mm', 'a4')
  const writer = createWriter(pdf)
  const personal = resumeData.personal_info || {}

  writer.writeLines([personal.full_name || resumeData.title || 'Resume'], {
    size: 18,
    style: 'bold',
    lineHeight: 8,
    color: [15, 23, 42],
  })

  if (personal.profession) {
    writer.writeLines([personal.profession], {
      size: 11,
      style: 'bold',
      lineHeight: 6,
      color: [51, 65, 85],
    })
  }

  const contact = compact([
    personal.email,
    personal.phone,
    personal.location,
    personal.linkedin,
    personal.website,
  ])

  if (contact) {
    writer.writeLines(splitLines(pdf, contact), {
      size: 9,
      lineHeight: 5,
      color: [71, 85, 105],
      spacingAfter: 2,
    })
  }

  if (resumeData.professional_summary) {
    writer.heading('Professional Summary')
    writeParagraph(pdf, writer, resumeData.professional_summary)
  }

  if (resumeData.experience?.length) {
    writer.heading('Professional Experience')
    resumeData.experience.forEach((experience) => {
      writer.writeLines([experience.position || 'Position'], {
        size: 10.5,
        style: 'bold',
        lineHeight: 5.5,
      })

      writer.writeLines([compact([
        experience.company,
        `${formatDate(experience.start_date)} - ${experience.is_current ? 'Present' : formatDate(experience.end_date)}`,
      ])], {
        size: 9.5,
        color: [71, 85, 105],
        lineHeight: 5,
      })

      writeBulletText(pdf, writer, experience.description)
      writer.writeLines([''], { lineHeight: 1.5 })
    })
  }

  if (resumeData.project?.length) {
    writer.heading('Projects')
    resumeData.project.forEach((project) => {
      writer.writeLines([compact([project.name, project.type]) || 'Project'], {
        size: 10.5,
        style: 'bold',
        lineHeight: 5.5,
      })

      writeBulletText(pdf, writer, project.description)
      writer.writeLines([''], { lineHeight: 1.5 })
    })
  }

  if (resumeData.education?.length) {
    writer.heading('Education')
    resumeData.education.forEach((education) => {
      writer.writeLines([compact([
        education.degree && education.field ? `${education.degree} in ${education.field}` : education.degree,
        education.institution,
        formatDate(education.graduation_date),
        education.gpa ? `GPA: ${education.gpa}` : '',
      ])], {
        size: 10,
        lineHeight: 5.5,
      })
    })
  }

  if (resumeData.skills?.length) {
    writer.heading('Skills')
    writer.writeLines(splitLines(pdf, resumeData.skills.join(', ')), {
      size: 10,
      lineHeight: 5,
    })
  }

  pdf.save(`${sanitizeFileName(resumeData.title || personal.full_name || 'Resume')}-ATS.pdf`)
}
