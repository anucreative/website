import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import sampleResume from '@monorepo/data-types/sample.json'
import { createServerFn } from '@tanstack/react-start'

const fetchResume = createServerFn({ method: 'GET' }).handler(async () => {
  return sampleResume
})

export const Route = createFileRoute('/cv')({
  component: CVPage,
})

function CVPage() {
  const {
    data: resume,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['resume'],
    queryFn: fetchResume,
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
  })

  if (isLoading) {
    return <div className="container">Loading resume...</div>
  }

  if (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return <div className="container error">Error: {message}</div>
  }

  if (!resume) {
    return <div className="container">No resume data found</div>
  }

  const { basics, work, education, skills, languages } = resume

  return (
    <div className="container">
      <header className="header">
        <h1>{basics.name}</h1>
        {basics.label && <p className="label">{basics.label}</p>}
        {basics.summary && <p className="summary">{basics.summary}</p>}

        {basics.profiles && basics.profiles?.length > 0 && (
          <div className="profiles">
            {basics.profiles.map(profile => (
              <a
                key={profile.network}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="profile-link"
              >
                {profile.network}
              </a>
            ))}
          </div>
        )}
      </header>

      {work && work?.length > 0 && (
        <section className="section">
          <h2>Experience</h2>
          <div className="entries">
            {work.map((job, idx) => (
              <div key={idx} className="entry">
                <h3>{job.position}</h3>
                {job.name && <p className="company">{job.name}</p>}
                <p className="date">
                  {job.startDate} {job.endDate ? `— ${job.endDate}` : '— Present'}
                </p>
                {job.summary && <p className="description">{job.summary}</p>}
                {job.highlights && job.highlights?.length > 0 && (
                  <ul className="highlights">
                    {job.highlights.map((highlight, hIdx) => (
                      <li key={hIdx}>{highlight}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {education && education?.length > 0 && (
        <section className="section">
          <h2>Education</h2>
          <div className="entries">
            {education.map((edu, idx) => (
              <div key={idx} className="entry">
                <h3>
                  {edu.studyType} in {edu.area}
                </h3>
                <p className="institution">{edu.institution}</p>
                <p className="date">
                  {edu.startDate} {edu.endDate ? `— ${edu.endDate}` : ''}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {skills && skills?.length > 0 && (
        <section className="section">
          <h2>Skills</h2>
          <div className="skills-grid">
            {skills.map((skillGroup, idx) => (
              <div key={idx} className="skill-group">
                <h4>{skillGroup.name}</h4>
                {skillGroup.level && <p className="level">{skillGroup.level}</p>}
                {skillGroup.keywords && skillGroup.keywords?.length > 0 && (
                  <div className="keywords">
                    {skillGroup.keywords.map((kw, kIdx) => (
                      <span key={kIdx} className="keyword">
                        {kw}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {languages && languages?.length > 0 && (
        <section className="section">
          <h2>Languages</h2>
          <div className="languages">
            {languages.map((lang, idx) => (
              <div key={idx} className="language">
                <span className="lang-name">{lang.language}</span>
                <span className="fluency">{lang.fluency}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
