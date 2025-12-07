import type { Resume } from '@monorepo/data-types'
import { getDates } from 'src/utils/date'

interface CVProps {
  resume: Resume
}

export function CV({ resume }: CVProps) {
  const { basics, work, education, skills, languages, interests } = resume

  return (
    <div className="container">
      <header className="section header">
        <div className="subsection">
          <div className="label">
            <img src={basics.image} alt={basics.name} className="avatar" />
          </div>
          <div className="content">
            <h1>{basics.name}</h1>
            {basics.label && <p className="byline">{basics.label}</p>}
          </div>
        </div>
        {basics.summary && (
          <div className="subsection">
            <div className="label"></div>
            <div className="content">
              <p className="intro">{basics.summary}</p>
            </div>
          </div>
        )}
      </header>

      <section className="section overview">
        <div className="subsection">
          <h3 className="label">Contact</h3>
          <div className="content">
            <div className="entry">
              <a href={`mailto:${basics.email}`}>{basics.email}</a>
            </div>
            <div className="entry">
              <a href={`tel:${basics.phone}`}>{basics.phone}</a>
            </div>
          </div>
        </div>
        <div className="subsection">
          <h3 className="label">Address</h3>
          <div className="content">
            <div className="entry">
              {basics.location?.address}, {basics.location?.city}, {basics.location?.countryCode}
            </div>
          </div>
        </div>
        {languages && languages?.length > 0 && (
          <div className="subsection">
            <h3 className="label">Languages</h3>
            <div className="content">
              {languages.map(({ language, fluency }) => (
                <div key={language} className="entry">
                  <span className="language">{language}</span>
                  <span className="fluency">({fluency})</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {basics.profiles && basics.profiles?.length > 0 && (
          <div className="subsection">
            <h3 className="label">Profiles</h3>
            <div className="content">
              {basics.profiles.map(({ network, url }) => (
                <div className="entry">
                  <a key={network} href={url} target="_blank" rel="noopener noreferrer">
                    {network}
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {skills && skills?.length > 0 && (
        <section className="section skills">
          <h2 className="title">Skills & tools</h2>
          {skills.map(({ name, keywords }) => (
            <div key={name} className="subsection">
              <h3 className="label">{name}</h3>
              {keywords && keywords?.length > 0 && (
                <div className="content">
                  {keywords.map(keyword => (
                    <span key={keyword} className="entry">
                      {keyword}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {work && work?.length > 0 && (
        <section className="section experience">
          <h2 className="title">Experience</h2>
          {work.map(
            ({ name, position, startDate, endDate, location, summary, highlights, slug, url }) => {
              const dates = getDates({ startDate, endDate })
              return (
                <div key={name} className="subsection">
                  <p className="label">{dates}</p>
                  <div className={`content ${position ? 'has-position' : ''}`}>
                    <div className="intro">
                      {slug && (
                        <a href={url} target="_blank" rel="noopener noreferrer">
                          <img src={`/logos/${slug}.png`} alt={`${name} logo`} className="logo" />
                        </a>
                      )}
                      <div className="position-company">
                        {position && <h3 className="position">{position}</h3>}
                        <p className="company">
                          <a href={url} target="_blank" rel="noopener noreferrer">
                            {name}
                          </a>
                          {summary && <span className="summary">{summary}</span>}
                          {location && <span className="summary">{location}</span>}
                        </p>
                      </div>
                    </div>
                    {highlights && highlights?.length > 0 && (
                      <ul className="highlights">
                        {highlights.map(highlight => (
                          <li key={highlight}>{highlight}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              )
            }
          )}
        </section>
      )}

      {education && education?.length > 0 && (
        <section className="section education">
          <h2 className="title">Education</h2>
          {education.map(({ studyType, area, institution, startDate, endDate }) => (
            <div key={institution} className="subsection">
              <p className="label">{getDates({ startDate, endDate })}</p>
              <p>
                {studyType} ({area}), {institution}
              </p>
            </div>
          ))}
        </section>
      )}

      {interests && interests?.length > 0 && (
        <section className="section interests">
          <h2 className="title">Interests</h2>
          {interests.map(({ name, keywords }) => (
            <div key={name} className="subsection">
              <p className="label">{name}</p>
              <p>{keywords?.join(', ')}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  )
}
