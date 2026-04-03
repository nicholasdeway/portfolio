export type ProjectStatus = "Ativo" | "Finalizado" | "Em manutenção"

export type StackCategory = "Frontend" | "Backend" | "Database" | "Infra"

export interface StackBreakdown {
  frontend: string[]
  backend: string[]
  database: string[]
  infra: string[]
}

export interface Endpoint {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
  path: string
  description: string
  authRequired: boolean
  module: string
  requestExample?: string
  responseExample?: string
}

export interface CodeExcerpt {
  title: string
  language: string
  code: string
  explanation: string
}

export interface GalleryImage {
  src: string
  alt: string
  caption?: string
}

export interface FreelancerProject {
  slug: string
  title: string
  description: string
  date: string
  status: ProjectStatus
  tags: string[]
  complexity?: number
  stack: StackBreakdown
  highlights: string[]
  coverImage: string
  galleryImages: GalleryImage[]
  architectureImage?: string
  architectureMermaid?: string

  // Overview
  summary: string
  problemStatement: string
  objectives: string[]
  targetUsers: string
  keyFeatures: string[]

  // Architecture
  architectureExplanation?: string
  folderStructure?: string
  keyDecisions?: { decision: string; reason: string }[]

  // Database
  databaseType?: string
  databaseSchema?: {
    name: string
    description?: string
    entityCode: string
    sqlCode?: string
  }[]
  relationshipsExplanation?: string
  indexesNotes?: string

  // API
  endpoints?: Endpoint[]

  // Security
  authStrategy?: string
  roles?: string[]
  vulnerabilitiesAvoided?: string[]
  storageStrategy?: string
  inputValidation?: string

  // Code Insights
  codeExcerpts?: CodeExcerpt[]

  // Config
  envExample?: string
  configExplanation?: string

  // Deployment
  deploymentStrategy?: string
  cicdSummary?: string
  monitoringNotes?: string

  // Results
  performanceMetrics?: string[]
  lighthouseNotes?: string

  // Lessons
  whatWentWell?: string[]
  whatToImprove?: string[]

  // Links
  deployUrl?: string
  repoUrl?: string
}