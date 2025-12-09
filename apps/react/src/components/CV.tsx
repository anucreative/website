import type { Resume } from '@website/data-types'
import { getDates } from 'src/utils/date'
import '@website/ui/components'

interface CVProps {
  resume: Resume
}

export function CV({ resume }: CVProps) {
  const { basics, work, education, skills, languages, interests } = resume

  return (
    <div className="container">
      <cv-header
        name={basics.name}
        label={basics.label}
        summary={basics.summary}
        image={basics.image}
      ></cv-header>

      <cv-section class="overview">
        <cv-section-title>Contact</cv-section-title>
        <cv-subsection label="Contact">
          <div className="content">
            <div className="entry">
              <a href={`mailto:${basics.email}`}>{basics.email}</a>
            </div>
            <div className="entry">
              <a href={`tel:${basics.phone}`}>{basics.phone}</a>
            </div>
          </div>
        </cv-subsection>
        <cv-subsection label="Address">
          <div className="content">
            <div className="entry">
              {basics.location?.address}, {basics.location?.city}, {basics.location?.countryCode}
            </div>
          </div>
        </cv-subsection>
        {languages && languages.length > 0 && (
          <cv-subsection label="Languages">
            <div className="content">
              {languages.map(({ language, fluency }) => (
                <div key={language} className="entry">
                  <span className="language">{language}</span>
                  <span className="fluency">({fluency})</span>
                </div>
              ))}
            </div>
          </cv-subsection>
        )}
        {basics.profiles && basics.profiles.length > 0 && (
          <cv-subsection label="Profiles">
            <div className="content">
              {basics.profiles.map(({ network, url }) => (
                <div key={network} className="entry">
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    {network}
                  </a>
                </div>
              ))}
            </div>
          </cv-subsection>
        )}
      </cv-section>

      {skills && skills.length > 0 && (
        <cv-section class="skills">
          <cv-section-title>Skills & tools</cv-section-title>
          {skills.map(({ name, keywords }) => (
            <cv-subsection key={name} label={name}>
              {keywords && keywords.length > 0 && (
                <div className="content">
                  {keywords.map(keyword => (
                    <span key={keyword} className="entry">
                      {keyword}
                    </span>
                  ))}
                </div>
              )}
            </cv-subsection>
          ))}
        </cv-section>
      )}

      {work && work.length > 0 && (
        <cv-section class="experience">
          <cv-section-title>Experience</cv-section-title>
          {work.map(
            ({ name, position, startDate, endDate, location, summary, highlights, slug, url }) => {
              const dates = getDates({ startDate, endDate })
              return (
                <cv-subsection key={name} label={dates}>
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
                    {highlights && highlights.length > 0 && (
                      <ul className="highlights">
                        {highlights.map(highlight => (
                          <li key={highlight}>{highlight}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </cv-subsection>
              )
            }
          )}
        </cv-section>
      )}

      {education && education.length > 0 && (
        <cv-section class="education">
          <cv-section-title>Education</cv-section-title>
          {education.map(({ studyType, area, institution, startDate, endDate }) => (
            <cv-subsection key={institution} label={getDates({ startDate, endDate })}>
              <p>
                {studyType} ({area}), {institution}
              </p>
            </cv-subsection>
          ))}
        </cv-section>
      )}

      {interests && interests.length > 0 && (
        <cv-section class="interests">
          <cv-section-title>Interests</cv-section-title>
          {interests.map(({ name, keywords }) => (
            <cv-subsection key={name} label={name}>
              <p>{keywords?.join(', ')}</p>
            </cv-subsection>
          ))}
        </cv-section>
      )}
    </div>
  )
}
