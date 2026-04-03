import { notFound } from "next/navigation"
import { getAllSlugs, getProjectBySlug } from "@/lib/freelancer-projects/data"
import { ProjectDetailLayout } from "@/components/projetos/project-detail-layout"

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return { title: "Projeto não encontrado" }
  return {
    title: `${project.title} - Projetos Freelancer`,
    description: project.description,
  }
}

export default async function FreelancerProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return <ProjectDetailLayout project={project} />
}