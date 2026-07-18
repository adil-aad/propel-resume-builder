import { Globe, Mail, MapPin, Phone } from "lucide-react";

const LinkedInIcon = ({ className, style }) => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className={className}
        style={style}
    >
        <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A2.03 2.03 0 0 0 3.2 5.03c0 1.12.9 2.03 2.02 2.03h.03a2.03 2.03 0 1 0 0-4.06ZM20.8 12.74c0-3.5-1.87-5.13-4.37-5.13-2.01 0-2.91 1.1-3.41 1.88V8.5H9.64c.05.66 0 11.5 0 11.5h3.38v-6.42c0-.34.02-.68.12-.93.27-.68.88-1.39 1.9-1.39 1.34 0 1.88 1.02 1.88 2.52V20h3.38v-7.26Z" />
    </svg>
)

const ClassicTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
        });
    };

    return (
        <div className="mx-auto max-w-4xl bg-white p-8 leading-relaxed text-gray-800">
            <header className="mb-8 border-b-2 pb-6 text-center" style={{ borderColor: accentColor }}>
                <h1 className="mb-2 text-3xl font-bold" style={{ color: accentColor }}>
                    {data.personal_info?.full_name || "Your Name"}
                </h1>
                {data.personal_info?.profession && (
                    <p className="mb-4 text-sm font-medium uppercase tracking-[0.24em] text-gray-500">
                        {data.personal_info.profession}
                    </p>
                )}

                <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                    {data.personal_info?.email && (
                        <div className="flex items-start gap-1">
                            <Mail className="mt-0.5 size-4 shrink-0" />
                            <span className="leading-5">{data.personal_info.email}</span>
                        </div>
                    )}
                    {data.personal_info?.phone && (
                        <div className="flex items-start gap-1">
                            <Phone className="mt-0.5 size-4 shrink-0" />
                            <span className="leading-5">{data.personal_info.phone}</span>
                        </div>
                    )}
                    {data.personal_info?.location && (
                        <div className="flex items-start gap-1">
                            <MapPin className="mt-0.5 size-4 shrink-0" />
                            <span className="leading-5">{data.personal_info.location}</span>
                        </div>
                    )}
                    {data.personal_info?.linkedin && (
                        <div className="flex items-start gap-1">
                            <LinkedInIcon className="mt-0.5 size-4 shrink-0" />
                            <span className="break-all leading-5">{data.personal_info.linkedin}</span>
                        </div>
                    )}
                    {data.personal_info?.website && (
                        <div className="flex items-start gap-1">
                            <Globe className="mt-0.5 size-4 shrink-0" />
                            <span className="break-all leading-5">{data.personal_info.website}</span>
                        </div>
                    )}
                </div>
            </header>

            {data.professional_summary && (
                <section className="mb-6">
                    <h2 className="mb-3 text-xl font-semibold" style={{ color: accentColor }}>
                        PROFESSIONAL SUMMARY
                    </h2>
                    <p className="leading-relaxed text-gray-700">{data.professional_summary}</p>
                </section>
            )}

            {data.experience && data.experience.length > 0 && (
                <section className="mb-6">
                    <h2 className="mb-4 text-xl font-semibold" style={{ color: accentColor }}>
                        PROFESSIONAL EXPERIENCE
                    </h2>

                    <div className="space-y-4">
                        {data.experience.map((exp, index) => (
                            <div key={index} className="border-l-[3px] pl-4" style={{ borderColor: accentColor }}>
                                <div className="mb-2 flex items-start justify-between">
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                                        <p className="font-medium text-gray-700">{exp.company}</p>
                                    </div>
                                    <div className="text-right text-sm text-gray-600">
                                        <p>{formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}</p>
                                    </div>
                                </div>
                                {exp.description && (
                                    <div className="whitespace-pre-line leading-relaxed text-gray-700">
                                        {exp.description}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {data.project && data.project.length > 0 && (
                <section className="mb-6">
                    <h2 className="mb-4 text-xl font-semibold" style={{ color: accentColor }}>
                        PROJECTS
                    </h2>

                    <div className="space-y-3">
                        {data.project.map((proj, index) => (
                            <div key={index} className="border-l-[3px] border-gray-300 pl-6">
                                <h3 className="font-semibold text-gray-800">{proj.name}</h3>
                                <p className="text-gray-600">{proj.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {data.education && data.education.length > 0 && (
                <section className="mb-6">
                    <h2 className="mb-4 text-xl font-semibold" style={{ color: accentColor }}>
                        EDUCATION
                    </h2>

                    <div className="space-y-3">
                        {data.education.map((edu, index) => (
                            <div key={index} className="flex items-start justify-between">
                                <div>
                                    <h3 className="font-semibold text-gray-900">
                                        {edu.degree} {edu.field && `in ${edu.field}`}
                                    </h3>
                                    <p className="text-gray-700">{edu.institution}</p>
                                    {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                                </div>
                                <div className="text-sm text-gray-600">
                                    <p>{formatDate(edu.graduation_date)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {data.skills && data.skills.length > 0 && (
                <section className="mb-6">
                    <h2 className="mb-4 text-xl font-semibold" style={{ color: accentColor }}>
                        CORE SKILLS
                    </h2>

                    <div className="flex flex-wrap gap-4">
                        {data.skills.map((skill, index) => (
                            <div key={index} className="text-gray-700">
                                * {skill}
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default ClassicTemplate;
