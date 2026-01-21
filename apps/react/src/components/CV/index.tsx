import type { Resume } from '@website/data-types'
import { getDates } from '../../utils/date'
import '@website/ui'
import Header from './Header'
import Section from './Section'
import Item from './Item'
import styles from './styles.module.css'

interface CVProps {
  company?: string
  resume: Resume
}

export function CV({ resume, company }: CVProps) {
  const { basics, work, education, skills, languages, interests, volunteer } = resume

  return (
    <div className={styles.container}>
      <Header.Header>
        <Header.Image>
          <img
            src={'/favicon.png'}
            alt={basics.name}
            width={100}
            height={100}
            fetchPriority="high"
          />
        </Header.Image>
        {company && (
          <Header.Logo>
            <img
              src={`/brands/${company}.png`}
              alt={company}
              width={50}
              height={50}
              fetchPriority="high"
            />
          </Header.Logo>
        )}
        <Header.Title>{basics.name}</Header.Title>
        <Header.Byline>{basics.label}</Header.Byline>
        <Header.Summary>{basics.summary}</Header.Summary>
        <Header.Summary>{basics.future}</Header.Summary>
      </Header.Header>
      <Section.Section className={styles.overview}>
        <Section.Title>Contact</Section.Title>
        <Item.Item>
          <Item.Title>Contact</Item.Title>

          <Item.Content>
            <a href={`mailto:${basics.email}`}>{basics.email}</a>
          </Item.Content>
          <Item.Content>
            <a href={`tel:${basics.phone}`}>{basics.phone}</a>
          </Item.Content>
        </Item.Item>
        <Item.Item>
          <Item.Title>Address</Item.Title>
          <Item.Content>
            {basics.location?.address}, {basics.location?.city}, {basics.location?.countryCode}
          </Item.Content>
        </Item.Item>
        {basics.nationality && (
          <Item.Item>
            <Item.Title>Nationality</Item.Title>
            {basics.nationality?.length > 0 &&
              basics.nationality.map(nationality => (
                <Item.Content key={nationality}>{nationality}</Item.Content>
              ))}
          </Item.Item>
        )}
        {languages && languages.length > 0 && (
          <Item.Item>
            <Item.Title>Languages</Item.Title>
            {languages.map(({ language, fluency }) => (
              <Item.Content key={language}>
                <span className={styles.language}>{language}</span>
                <span className={styles.fluency}>({fluency})</span>
              </Item.Content>
            ))}
          </Item.Item>
        )}
        {basics.profiles && basics.profiles.length > 0 && (
          <Item.Item>
            <Item.Title>Profiles</Item.Title>

            {basics.profiles.map(({ network, url }) => (
              <Item.Content key={network}>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {network}
                </a>
              </Item.Content>
            ))}
          </Item.Item>
        )}
      </Section.Section>

      {skills && skills.length > 0 && (
        <Section.Section className={styles.skills}>
          <Section.Title>Skills & tools</Section.Title>
          {skills.map(({ name, keywords }) => (
            <Item.Item key={name}>
              <Item.Title>{name}</Item.Title>
              {keywords &&
                keywords.length > 0 &&
                keywords.map(keyword => <Item.Content key={keyword}>{keyword}</Item.Content>)}
            </Item.Item>
          ))}
        </Section.Section>
      )}

      {work && work.length > 0 && (
        <Section.Section className={styles.experience}>
          <Section.Title>Experience</Section.Title>
          {work.map(
            ({ name, position, startDate, endDate, location, summary, highlights, url }) => {
              const dates = getDates({ startDate, endDate })
              return (
                <Item.Item key={name}>
                  <div className={position ? styles.hasPosition : ''}>
                    <div className={styles.intro}>
                      <Item.Title as="span">{dates}</Item.Title>
                      {position && <h3 className={styles.position}>{position}</h3>}
                      <Item.Content>
                        {url ? (
                          <a href={url} target="_blank" rel="noopener noreferrer">
                            {name}
                          </a>
                        ) : (
                          name
                        )}
                      </Item.Content>
                      {summary && <Item.Content>{summary}</Item.Content>}
                      {location && <Item.Content>{location}</Item.Content>}
                    </div>
                    {highlights && highlights.length > 0 && (
                      <ul className={styles.highlights}>
                        {highlights.map(highlight => (
                          <li key={highlight}>{highlight}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Item.Item>
              )
            }
          )}
        </Section.Section>
      )}

      {volunteer && volunteer.length > 0 && (
        <Section.Section className={styles.volunteer}>
          <Section.Title>Volunteering</Section.Title>
          {volunteer.map(({ organization, position, startDate, endDate, summary }) => (
            <Item.Item key={organization}>
              <Item.Title>{getDates({ startDate, endDate })}</Item.Title>
              <Item.Content>
                {position}, {organization}
                <br />
                {summary}
              </Item.Content>
            </Item.Item>
          ))}
        </Section.Section>
      )}

      {education && education.length > 0 && (
        <Section.Section className={styles.education}>
          <Section.Title>Education</Section.Title>
          {education.map(({ studyType, area, institution, startDate, endDate }) => (
            <Item.Item key={institution}>
              <Item.Title>{getDates({ startDate, endDate })}</Item.Title>
              <Item.Content>
                {studyType} ({area}), {institution}
              </Item.Content>
            </Item.Item>
          ))}
        </Section.Section>
      )}

      {interests && interests.length > 0 && (
        <Section.Section className={styles.interests}>
          <Section.Title>Interests</Section.Title>
          {interests.map(({ name, keywords }) => (
            <Item.Item key={name}>
              <Item.Title>{name}</Item.Title>
              {keywords &&
                keywords.length > 0 &&
                keywords.map(keyword => <Item.Content key={keyword}>{keyword}</Item.Content>)}
            </Item.Item>
          ))}
        </Section.Section>
      )}
    </div>
  )
}
