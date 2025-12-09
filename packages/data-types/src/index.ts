/**
 * @website/data-types
 * TypeScript interfaces for CV data following JSON Resume schema
 * @see https://jsonresume.org/schema
 *
 * These types define the shape of CV data throughout the application.
 * They're designed to match future API responses (Prisma models and FastAPI endpoints).
 */

/**
 * Location information
 */
export interface Location {
  address?: string
  postalCode?: string
  city?: string
  countryCode?: string
  region?: string
}

/**
 * Social profile link
 */
export interface Profile {
  network: string
  username?: string
  url?: string
}

/**
 * Basics section - personal information
 */
export interface Basics {
  name: string
  label?: string
  image?: string
  email?: string
  phone?: string
  url?: string
  summary?: string
  location?: Location
  profiles?: Profile[]
}

/**
 * Work experience entry
 */
export interface Work {
  name?: string
  position: string
  url?: string
  location?: string
  slug?: string
  startDate?: string // ISO 8601 format
  endDate?: string // ISO 8601 format
  summary?: string
  highlights?: string[]
}

/**
 * Volunteer entry
 */
export interface Volunteer {
  organization: string
  position?: string
  url?: string
  startDate?: string
  endDate?: string
  summary?: string
  highlights?: string[]
}

/**
 * Education entry
 */
export interface Education {
  institution: string
  url?: string
  area?: string
  studyType?: string
  startDate?: string
  endDate?: string
  score?: string
  courses?: string[]
}

/**
 * Award entry
 */
export interface Award {
  title: string
  date?: string
  awarder?: string
  summary?: string
}

/**
 * Certificate entry
 */
export interface Certificate {
  name: string
  date?: string
  issuer?: string
  url?: string
}

/**
 * Publication entry
 */
export interface Publication {
  name: string
  publisher?: string
  releaseDate?: string
  url?: string
  summary?: string
}

/**
 * Skill entry with keywords
 */
export interface Skill {
  name: string
  level?: string
  keywords?: string[]
}

/**
 * Language proficiency
 */
export interface Language {
  language: string
  fluency?: string
}

/**
 * Interest entry
 */
export interface Interest {
  name: string
  keywords?: string[]
}

/**
 * Reference entry
 */
export interface Reference {
  name: string
  reference?: string
}

/**
 * Project entry
 */
export interface Project {
  name: string
  startDate?: string
  endDate?: string
  description?: string
  highlights?: string[]
  url?: string
  keywords?: string[]
}

/**
 * Main resume/CV structure following JSON Resume schema
 */
export interface Resume {
  basics: Basics
  work?: Work[]
  volunteer?: Volunteer[]
  education?: Education[]
  awards?: Award[]
  certificates?: Certificate[]
  publications?: Publication[]
  skills?: Skill[]
  languages?: Language[]
  interests?: Interest[]
  references?: Reference[]
  projects?: Project[]
}

/**
 * Type guard to validate Resume
 */
export const isResume = (data: unknown): data is Resume => {
  if (typeof data !== 'object' || data === null) return false
  const resume = data as Record<string, unknown>
  return (
    typeof resume.basics === 'object' &&
    resume.basics !== null &&
    typeof (resume.basics as Record<string, unknown>).name === 'string'
  )
}
