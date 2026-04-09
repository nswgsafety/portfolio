import { notFound } from 'next/navigation'
import { projects, getProject } from '@/lib/projects'
import ProjectPage from '@/components/ProjectPage'

export async function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}
  return {
    title: `${project.title} — Ian Andujar`,
    description: project.description,
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()
  return <ProjectPage project={project} />
}
