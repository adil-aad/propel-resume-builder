# Propel

An AI resume builder. It starts from the document you already have instead of a
blank form: paste or upload a resume, and Gemini maps it into structured fields
you can edit, reorder and restyle. Exports come in two deliberately different
files — one for humans and one for applicant tracking systems.

**Live:** https://propel-ai-resume-builder.vercel.app

## Stack

| Layer | Choice |
| --- | --- |
| Client | React, Vite, Redux Toolkit, React Router, Tailwind CSS 4 |
| Drag and drop | `@dnd-kit/core` + `@dnd-kit/sortable` |
| PDF in | `react-pdftotext` |
| PDF out | `html2canvas` + `jsPDF`, and `jsPDF` text primitives |
| Server | Node.js, Express, Mongoose |
| Auth | Email/password, bcrypt, JWT (7-day expiry) |
| AI | Google Gemini via `@google/genai` |
| Media | ImageKit, Multer |

## Two import paths, two export paths

**Import**
1. *Create a resume* — a blank document.
2. *Upload a resume* — `react-pdftotext` extracts the text in the browser, the
   server sends it to Gemini with a fixed JSON schema and
   `responseMimeType: "application/json"`, and the parsed object becomes the
   resume document. If the model quota is exhausted (429 or
   `RESOURCE_EXHAUSTED`), the server creates a blank draft and tells the user
   to paste their content in, rather than failing the upload outright.

**Export**
- **Styled PDF** — the live preview node is cloned, every computed style is
  inlined, then captured with `html2canvas` and embedded in a `jsPDF` page.
  It looks exactly like the editor.
- **ATS PDF** — built directly from `jsPDF` text primitives: name, contact
  line, section headings, bulleted descriptions, no images. Every byte is
  selectable and machine-readable.

The styled export handles three problems that are invisible until they bite:

- **Fonts** — capture waits on `document.fonts.ready`, otherwise the canvas
  paints with the system fallback and the PDF silently has the wrong weight.
- **`oklch()` colours** — Tailwind 4 emits `oklch()`, which the canvas cannot
  represent. Values are converted to sRGB (or dropped for shadows and
  gradients) before capture.
- **Page breaks** — instead of slicing the canvas at a fixed height, the
  exporter samples a column of pixels near the intended break point and cuts
  at the whitest row it finds, so lines rarely get split in half.

## Editor

- Sections: personal info, professional summary, experience, education,
  projects, skills.
- Every list is reorderable with `@dnd-kit`.
- Four templates: Classic, Modern, Minimal Image, Minimal.
- Accent colour per resume.
- Profile photo upload with automatic face crop, and optional background
  removal (`e-bgremove`) via ImageKit transformations.
- Gemini-powered *enhance summary* and *rewrite job description* actions, each
  constrained by a system prompt to return only the replacement text.
- Visibility toggle: a public resume is readable without auth at
  `/view/:resumeId`; private ones 404.
- Duplicate a resume (title becomes "… Copy") and delete.

## Project structure

```text
server/
├── configs/       db, Gemini client, ImageKit, Multer
├── controllers/   user, resume, ai
├── middlewares/   JWT `protect`
├── models/        User, Resume
├── routes/        user, resume, ai
└── server.js
client/
└── src/
    ├── app/       Redux store + auth slice
    ├── components/ forms, DraggableList, ResumePreview, TemplateSelector,
    │              templates/ (Classic, Modern, Minimal, Minimal Image)
    ├── pages/     Home, Login, DashboardPage, Resume (builder), Preview
    └── utils/     exportResumePdf.js, exportAtsResumePdf.js

Getting started

# server
cd server && npm install && npm run server

# client
cd client && npm install && npm run dev

Environment variables

server/.env

┌────────────────────────────────────────────────────────────────────┬─────────────────────────────────────────┐
│                              Variable                              │                 Purpose                 │
├────────────────────────────────────────────────────────────────────┼─────────────────────────────────────────┤
│ MONGODB_URI                                                        │ MongoDB connection string               │
├────────────────────────────────────────────────────────────────────┼─────────────────────────────────────────┤
│ JWT_SECRET                                                         │ Signs 7-day auth tokens                 │
├────────────────────────────────────────────────────────────────────┼─────────────────────────────────────────┤
│ GEMINI_API_KEY                                                     │ Gemini API key                          │
├────────────────────────────────────────────────────────────────────┼─────────────────────────────────────────┤
│ GEMINI_MODEL                                                       │ Model id used by all three AI endpoints │
├────────────────────────────────────────────────────────────────────┼─────────────────────────────────────────┤
│ GEMINI_BASE_URL                                                    │ Optional custom endpoint for the SDK    │
├────────────────────────────────────────────────────────────────────┼─────────────────────────────────────────┤
│ IMAGEKIT_PUBLIC_KEY / IMAGEKIT_PRIVATE_KEY / IMAGEKIT_URL_ENDPOINT │ Resume photo hosting                    │
├────────────────────────────────────────────────────────────────────┼─────────────────────────────────────────┤
│ PORT                                                               │ Defaults to 3000                        │
└────────────────────────────────────────────────────────────────────┴─────────────────────────────────────────┘

client/.env

┌───────────────┬─────────────────────┐
│   Variable    │       Purpose       │
├───────────────┼─────────────────────┤
│ VITE_BASE_URL │ Base URL of the API │
└───────────────┴─────────────────────┘

API

┌────────┬──────────────────────────────────┬──────┬───────────────────────────────────┐
│ Method │              Route               │ Auth │              Purpose              │
├────────┼──────────────────────────────────┼──────┼───────────────────────────────────┤
│ POST   │ /api/users/register              │ —    │ Create account                    │
├────────┼──────────────────────────────────┼──────┼───────────────────────────────────┤
│ POST   │ /api/users/login                 │ —    │ Sign in                           │
├────────┼──────────────────────────────────┼──────┼───────────────────────────────────┤
│ GET    │ /api/users/data                  │ ✅   │ Current user                      │
├────────┼──────────────────────────────────┼──────┼───────────────────────────────────┤
│ GET    │ /api/users/resumes               │ ✅   │ All of the user's resumes         │
├────────┼──────────────────────────────────┼──────┼───────────────────────────────────┤
│ POST   │ /api/resumes/create              │ ✅   │ Blank resume                      │
├────────┼──────────────────────────────────┼──────┼───────────────────────────────────┤
│ POST   │ /api/resumes/duplicate/:resumeId │ ✅   │ Copy a resume                     │
├────────┼──────────────────────────────────┼──────┼───────────────────────────────────┤
│ PUT    │ /api/resumes/update              │ ✅   │ Save fields and photo             │
├────────┼──────────────────────────────────┼──────┼───────────────────────────────────┤
│ DELETE │ /api/resumes/delete/:resumeId    │ ✅   │ Delete                            │
├────────┼──────────────────────────────────┼──────┼───────────────────────────────────┤
│ GET    │ /api/resumes/get/:resumeId       │ ✅   │ Load one resume                   │
├────────┼──────────────────────────────────┼──────┼───────────────────────────────────┤
│ GET    │ /api/resumes/public/:resumeId    │ —    │ Load a shared resume              │
├────────┼──────────────────────────────────┼──────┼───────────────────────────────────┤
│ POST   │ /api/ai/upload-resume            │ ✅   │ Parse pasted/uploaded resume text │
├────────┼──────────────────────────────────┼──────┼───────────────────────────────────┤
│ POST   │ /api/ai/enhance-sum              │ ✅   │ Improve summary                   │
├────────┼──────────────────────────────────┼──────┼───────────────────────────────────┤
│ POST   │ /api/ai/enhance-job              │ ✅   │ Rewrite a job description         │
└────────┴──────────────────────────────────┴──────┴───────────────────────────────────┘

All resume reads and writes are scoped by userId, so one account cannot read
or modify another's documents; the only unauthenticated read is the public
link, which requires public: true.
