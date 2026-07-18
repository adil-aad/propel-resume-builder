import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

const EXPORT_WIDTH = 794
const COLOR_FUNCTION_PATTERN = /(oklch|oklab|lch|lab|color-mix)\(/i

const clamp = (value, min = 0, max = 1) => Math.min(Math.max(value, min), max)

const gammaCorrect = (value) => {
  const clamped = clamp(value)
  return clamped <= 0.0031308
    ? 12.92 * clamped
    : 1.055 * Math.pow(clamped, 1 / 2.4) - 0.055
}

const oklchToRgb = (color) => {
  const parts = color
    .replace(/^oklch\(/i, '')
    .replace(/\)$/i, '')
    .split(/\s+/)
    .filter(Boolean)

  if (parts.length < 3) return '#000000'

  const lightness = parts[0].endsWith('%') ? parseFloat(parts[0]) / 100 : parseFloat(parts[0])
  const chroma = parseFloat(parts[1])
  const hue = parseFloat(parts[2]) || 0
  const alphaPart = parts.find((part) => part.startsWith('/'))
  const alpha = alphaPart ? parseFloat(alphaPart.replace('/', '')) : 1
  const hueRadians = (hue * Math.PI) / 180
  const a = chroma * Math.cos(hueRadians)
  const b = chroma * Math.sin(hueRadians)

  const lPrime = lightness + 0.3963377774 * a + 0.2158037573 * b
  const mPrime = lightness - 0.1055613458 * a - 0.0638541728 * b
  const sPrime = lightness - 0.0894841775 * a - 1.291485548 * b

  const l = lPrime ** 3
  const m = mPrime ** 3
  const s = sPrime ** 3

  const red = Math.round(gammaCorrect(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s) * 255)
  const green = Math.round(gammaCorrect(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s) * 255)
  const blue = Math.round(gammaCorrect(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s) * 255)

  return alpha < 1 ? `rgba(${red}, ${green}, ${blue}, ${clamp(alpha)})` : `rgb(${red}, ${green}, ${blue})`
}

const normalizeCssValue = (value, property) => {
  if (!value) return value

  const withoutOklch = value.replace(/oklch\([^)]*\)/gi, (match) => oklchToRgb(match))

  if (!COLOR_FUNCTION_PATTERN.test(withoutOklch)) return withoutOklch

  if (property.includes('color')) return property === 'background-color' ? 'transparent' : '#111827'
  if (property === 'box-shadow' || property === 'text-shadow' || property === 'background-image') return 'none'

  return withoutOklch
}

const inlineComputedStyles = (source, target) => {
  const sourceElements = [source, ...source.querySelectorAll('*')]
  const targetElements = [target, ...target.querySelectorAll('*')]

  sourceElements.forEach((sourceElement, index) => {
    const targetElement = targetElements[index]
    if (!targetElement) return

    const computed = window.getComputedStyle(sourceElement)

    Array.from(computed).forEach((property) => {
      if (property.startsWith('--')) return

      const value = normalizeCssValue(computed.getPropertyValue(property), property)
      if (value) targetElement.style.setProperty(property, value, computed.getPropertyPriority(property))
    })

    targetElement.removeAttribute('class')
  })
}

const resolveImageSources = (node) => {
  node.querySelectorAll('[src]').forEach((element) => {
    const src = element.getAttribute('src')
    if (src && !src.startsWith('data:') && !src.startsWith('http') && !src.startsWith('blob:')) {
      element.setAttribute('src', new URL(src, window.location.origin).href)
    }
  })
}

const normalizeIconAlignment = (node) => {
  node.querySelectorAll('svg').forEach((svg) => {
    svg.style.display = 'block'
    svg.style.flexShrink = '0'
    svg.style.alignSelf = 'center'
    svg.style.marginTop = '0'
    svg.style.marginBottom = '0'
    svg.style.position = 'relative'
    svg.style.top = '1.5px'
    svg.style.verticalAlign = 'middle'

    const parent = svg.parentElement
    if (!parent) return

    parent.style.alignItems = 'center'
    parent.style.lineHeight = '1.25'

    Array.from(parent.children).forEach((child) => {
      if (child.tagName.toLowerCase() === 'svg') return
      child.style.lineHeight = '1.25'
    })
  })
}

const waitForImages = async (node) => {
  const images = Array.from(node.querySelectorAll('img'))

  await Promise.all(
    images.map((image) => {
      if (image.complete) return Promise.resolve()

      return new Promise((resolve) => {
        image.onload = resolve
        image.onerror = resolve
      })
    })
  )
}

const sanitizeFileName = (name) => {
  const cleanName = Array.from((name || 'Resume').replace(/[<>:"/\\|?*]/g, ''))
    .filter((character) => character.charCodeAt(0) >= 32)
    .join('')
    .trim()
  return cleanName || 'Resume'
}

export const exportResumePdf = async (resumeNode, title = 'Resume') => {
  const clone = resumeNode.cloneNode(true)
  resolveImageSources(clone)
  inlineComputedStyles(resumeNode, clone)
  normalizeIconAlignment(clone)

  clone.style.width = `${EXPORT_WIDTH}px`
  clone.style.maxWidth = `${EXPORT_WIDTH}px`
  clone.style.margin = '0'
  clone.style.border = '0'
  clone.style.borderRadius = '0'
  clone.style.boxShadow = 'none'
  clone.style.overflow = 'visible'
  clone.style.backgroundColor = '#ffffff'

  const captureContainer = document.createElement('div')
  captureContainer.style.cssText = [
    'position:fixed',
    'left:-10000px',
    'top:0',
    `width:${EXPORT_WIDTH}px`,
    'background:#ffffff',
    'z-index:-1',
    'pointer-events:none',
  ].join(';')

  captureContainer.appendChild(clone)
  document.body.appendChild(captureContainer)

  try {
    await document.fonts?.ready
    await waitForImages(clone)

    const canvas = await html2canvas(clone, {
      scale: Math.min(window.devicePixelRatio || 2, 2),
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      width: clone.scrollWidth,
      height: clone.scrollHeight,
      windowWidth: EXPORT_WIDTH,
    })

    const imageData = canvas.toDataURL('image/jpeg', 0.98)
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    const imageHeight = (canvas.height * pdfWidth) / canvas.width

    let remainingHeight = imageHeight
    let position = 0

    pdf.addImage(imageData, 'JPEG', 0, position, pdfWidth, imageHeight)
    remainingHeight -= pdfHeight

    while (remainingHeight > 0) {
      position -= pdfHeight
      pdf.addPage()
      pdf.addImage(imageData, 'JPEG', 0, position, pdfWidth, imageHeight)
      remainingHeight -= pdfHeight
    }

    pdf.save(`${sanitizeFileName(title)}.pdf`)
  } finally {
    captureContainer.remove()
  }
}
