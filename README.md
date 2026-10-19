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
