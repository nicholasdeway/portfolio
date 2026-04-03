"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Badge } from "@/components/ui/badge"
import type { FreelancerProject } from "@/lib/freelancer-projects/types"
import { CodeBlockWithCopy } from "./code-block-with-copy"
import { EndpointList } from "./endpoint-list"
import { GalleryModal } from "./gallery-modal"
import { MermaidDiagram } from "./mermaid-diagram"
import { TableOfContents } from "./table-of-contents"
import { DatabaseSchemaViewer } from "./database-schema-viewer"

const statusColors: Record<string, string> = {
  Ativo: "bg-green-500/10 text-green-500 border-green-500/20",
  Finalizado: "bg-red-500/10 text-red-500 border-red-500/20",
  "Em manutenção": "bg-amber-500/10 text-amber-500 border-amber-500/20",
}

function SectionHeading({ id, title }: { id: string; title: string }) {
  return (
    <h3 id={id} className="text-2xl font-light pt-12 pb-4 scroll-mt-24 border-b border-border/50 text-foreground">
      {title}
    </h3>
  )
}

function StackPill({ items, label }: { items: string[]; label: string }) {
  if (!items.length) return null
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs text-muted-foreground font-mono tracking-wider">{label}</span>
      <div className="flex flex-wrap gap-1.5">
        {items.map((t) => (
          <Badge key={t} variant="outline" className="text-xs font-normal">
            {t}
          </Badge>
        ))}
      </div>
    </div>
  )
}

export function ProjectDetailLayout({ project }: { project: FreelancerProject }) {
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const sectionsRef = useRef<Record<string, HTMLElement | null>>({})

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      let currentSection = ""
      const scrollPosition = window.scrollY + 140

      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10

      const sections = Object.values(sectionsRef.current)
        .filter(Boolean) as HTMLElement[]
      
      sections.sort((a, b) => a.offsetTop - b.offsetTop)

      if (isAtBottom && sections.length > 0) {
        currentSection = sections[sections.length - 1].id
      } else {
        sections.forEach((section) => {
          if (section.offsetTop <= scrollPosition) {
            currentSection = section.id
          }
        });
      }

      if (currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar aos projetos
          </Link>
          <div className="flex items-center gap-3">
            {project.deployUrl && (
              <a
                href={project.deployUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition-colors"
              >
                Deploy
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm px-4 py-2 rounded-lg bg-foreground text-background hover:opacity-90 transition-opacity"
              >
                Repositório
              </a>
            )}
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-12 sm:py-16">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusColors[project.status] || ""}`}
            >
              {project.status}
            </span>
            <time className="text-sm text-muted-foreground font-mono">
              {new Date(project.date).toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}
            </time>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-balance">
            {project.title}
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="font-normal">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Main content with TOC */}
      <div className="max-w-6xl mx-auto px-6 pb-60 flex gap-12">
        <TableOfContents activeSection={activeSection} project={project} />

        <article className="flex-1 min-w-0 flex flex-col gap-4">
          {/* Overview */}
          <section id="overview" ref={(el) => { sectionsRef.current["overview"] = el }} className="scroll-mt-24">
          <SectionHeading id="overview-heading" title="Visão Geral" />
          <div className="flex flex-col gap-8">
            <p className="text-muted-foreground leading-relaxed">{project.summary}</p>


            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-medium text-muted-foreground font-mono tracking-wider">PROBLEMA</h4>
              <p className="text-muted-foreground leading-relaxed">{project.problemStatement}</p>
            </div>

            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-medium text-muted-foreground font-mono tracking-wider">OBJETIVOS</h4>
              <ul className="flex flex-col gap-2">
                {project.objectives.map((obj) => (
                  <li key={obj} className="flex items-start gap-2 text-muted-foreground">
                    <svg className="w-4 h-4 mt-1 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {obj}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-medium text-muted-foreground font-mono tracking-wider">PÚBLICO-ALVO</h4>
              <p className="text-muted-foreground">{project.targetUsers}</p>
            </div>

            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-medium text-muted-foreground font-mono tracking-wider">
                FUNCIONALIDADES PRINCIPAIS
              </h4>
              <ul className="grid sm:grid-cols-2 gap-2">
                {project.keyFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-muted-foreground text-sm">
                    <span className="w-1.5 h-1.5 mt-1.5 bg-foreground/40 rounded-full shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 rounded-lg border border-border bg-card">
              <StackPill items={project.stack.frontend} label="FRONTEND" />
              <StackPill items={project.stack.backend} label="BACKEND" />
              <StackPill items={project.stack.database} label="DATABASE" />
              <StackPill items={project.stack.infra} label="INFRA" />
            </div>
          </div>
          </section>

          {/* Gallery */}
          <section id="gallery" ref={(el) => { sectionsRef.current["gallery"] = el }} className="scroll-mt-24">
          <SectionHeading id="gallery-heading" title="Galeria" />
          <GalleryModal images={project.galleryImages} />
          </section>

          {/* Architecture */}
          {(project.architectureMermaid || project.architectureImage || project.architectureExplanation || project.folderStructure || (project.keyDecisions && project.keyDecisions.length > 0)) && (
          <section id="architecture" ref={(el) => { sectionsRef.current["architecture"] = el }} className="scroll-mt-24">
          <SectionHeading id="architecture-heading" title="Arquitetura" />
          <div className="flex flex-col gap-6">
            {project.architectureMermaid ? (
              <MermaidDiagram chart={project.architectureMermaid} />
            ) : (
              project.architectureImage && (
                <div className="relative aspect-video rounded-lg overflow-hidden border border-border bg-muted">
                  <Image
                    src={project.architectureImage || "/placeholder.svg"}
                    alt="Diagrama de arquitetura"
                    fill
                    className="object-contain"
                  />
                </div>
              )
            )}
            {project.architectureExplanation && (
              <p className="text-muted-foreground leading-relaxed">{project.architectureExplanation}</p>
            )}

            {project.folderStructure && (
              <div className="flex flex-col gap-3">
                <h4 className="text-sm font-medium text-muted-foreground font-mono tracking-wider">
                  ESTRUTURA DE PASTAS
                </h4>
                <pre className="p-4 rounded-lg bg-card border border-border overflow-x-auto text-sm font-mono text-foreground/90 leading-relaxed">
                  {project.folderStructure}
                </pre>
              </div>
            )}

            {project.keyDecisions && project.keyDecisions.length > 0 && (
              <div className="flex flex-col gap-3">
                <h4 className="text-sm font-medium text-muted-foreground font-mono tracking-wider">
                  DECISÕES TÉCNICAS
                </h4>
                <div className="flex flex-col gap-3">
                  {project.keyDecisions?.map((d) => (
                    <div
                      key={d.decision}
                      className="p-4 rounded-lg border border-border bg-card"
                    >
                      <p className="text-sm font-medium text-foreground">{d.decision}</p>
                      <p className="text-sm text-muted-foreground mt-1">{d.reason}</p>
                    </div>
                  ))}
              </div>
              </div>
            )}
          </div>
          </section>
          )}

          {/* Database */}
          {(project.databaseType || (project.databaseSchema && project.databaseSchema.length > 0) || project.relationshipsExplanation || project.indexesNotes) && (
          <section id="database" ref={(el) => { sectionsRef.current["database"] = el }} className="scroll-mt-24">
          <SectionHeading id="database-heading" title="Banco de Dados" />
          <div className="flex flex-col gap-6">
            {project.databaseType && (
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Tipo:</span>
                <Badge variant="outline" className="font-normal">{project.databaseType}</Badge>
              </div>
            )}

            {project.databaseSchema && project.databaseSchema.length > 0 && (
              <DatabaseSchemaViewer items={project.databaseSchema} />
            )}

            {project.relationshipsExplanation && (
              <div className="flex flex-col gap-3">
                <h4 className="text-sm font-medium text-muted-foreground font-mono tracking-wider">
                  RELACIONAMENTOS
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{project.relationshipsExplanation}</p>
              </div>
            )}

            {project.indexesNotes && (
              <div className="flex flex-col gap-3">
                <h4 className="text-sm font-medium text-muted-foreground font-mono tracking-wider">
                  ÍNDICES E PERFORMANCE
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{project.indexesNotes}</p>
              </div>
            )}
          </div>
          </section>
          )}

          {/* API */}
          {project.endpoints && project.endpoints.length > 0 && (
          <section id="api" ref={(el) => { sectionsRef.current["api"] = el }} className="scroll-mt-24">
          <SectionHeading id="api-heading" title="API / Endpoints" />
          <EndpointList endpoints={project.endpoints} />
          </section>
          )}

          {/* Security */}
          {(project.authStrategy || (project.roles && project.roles.length > 0) || (project.vulnerabilitiesAvoided && project.vulnerabilitiesAvoided.length > 0) || project.storageStrategy || project.inputValidation) && (
          <section id="security" ref={(el) => { sectionsRef.current["security"] = el }} className="scroll-mt-24">
          <SectionHeading id="security-heading" title="Segurança" />
          <div className="flex flex-col gap-6">
            {project.authStrategy && (
              <div className="flex flex-col gap-3">
                <h4 className="text-sm font-medium text-muted-foreground font-mono tracking-wider">
                  ESTRATÉGIA DE AUTENTICAÇÃO
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{project.authStrategy}</p>
              </div>
            )}

            {project.roles && project.roles.length > 0 && (
              <div className="flex flex-col gap-3">
                <h4 className="text-sm font-medium text-muted-foreground font-mono tracking-wider">ROLES / RBAC</h4>
                <div className="flex flex-wrap gap-2">
                  {project.roles.map((role) => (
                    <Badge key={role} variant="secondary" className="font-normal">
                      {role}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {project.vulnerabilitiesAvoided && project.vulnerabilitiesAvoided.length > 0 && (
              <div className="flex flex-col gap-3">
                <h4 className="text-sm font-medium text-muted-foreground font-mono tracking-wider">
                  VULNERABILIDADES EVITADAS
                </h4>
                <ul className="flex flex-col gap-2">
                  {project.vulnerabilitiesAvoided.map((v) => (
                    <li key={v} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <svg className="w-4 h-4 mt-0.5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      {v}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.storageStrategy && (
              <div className="flex flex-col gap-3">
                <h4 className="text-sm font-medium text-muted-foreground font-mono tracking-wider">
                  ARMAZENAMENTO
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{project.storageStrategy}</p>
              </div>
            )}

            {project.inputValidation && (
              <div className="flex flex-col gap-3">
                <h4 className="text-sm font-medium text-muted-foreground font-mono tracking-wider">
                  VALIDAÇÃO DE INPUT
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{project.inputValidation}</p>
              </div>
            )}
          </div>
          </section>
          )}

          {/* Configuration */}
          {(project.envExample || project.configExplanation) && (
          <section id="config" ref={(el) => { sectionsRef.current["config"] = el }} className="scroll-mt-24">
          <SectionHeading id="config-heading" title="Configuração e Ambiente" />
          <div className="flex flex-col gap-6">
            {project.envExample && (
              <CodeBlockWithCopy
                title="Variaveis de Ambiente (exemplo)"
                language="env"
                code={project.envExample}
              />
            )}
            {project.configExplanation && (
              <p className="text-muted-foreground text-sm leading-relaxed">{project.configExplanation}</p>
            )}
          </div>
          </section>
          )}

          {/* Deployment */}
          {(project.deploymentStrategy || project.cicdSummary || project.monitoringNotes) && (
          <section id="deployment" ref={(el) => { sectionsRef.current["deployment"] = el }} className="scroll-mt-24">
          <SectionHeading id="deployment-heading" title="Deploy" />
          <div className="flex flex-col gap-6">
            {project.deploymentStrategy && (
              <div className="flex flex-col gap-3">
                <h4 className="text-sm font-medium text-muted-foreground font-mono tracking-wider">ESTRATÉGIA</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{project.deploymentStrategy}</p>
              </div>
            )}

            {project.cicdSummary && (
              <div className="flex flex-col gap-3">
                <h4 className="text-sm font-medium text-muted-foreground font-mono tracking-wider">CI/CD PIPELINE</h4>
                <pre className="p-4 rounded-lg bg-card border border-border overflow-x-auto text-sm font-mono text-foreground/90 leading-relaxed">
                  {project.cicdSummary}
                </pre>
              </div>
            )}

            {project.monitoringNotes && (
              <div className="flex flex-col gap-3">
                <h4 className="text-sm font-medium text-muted-foreground font-mono tracking-wider">
                  MONITORAMENTO
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{project.monitoringNotes}</p>
              </div>
            )}
          </div>
          </section>
          )}

          {/* Lessons */}
          {((project.whatWentWell && project.whatWentWell.length > 0) || (project.whatToImprove && project.whatToImprove.length > 0)) && (
          <section id="lessons" ref={(el) => { sectionsRef.current["lessons"] = el }} className="scroll-mt-24">
          <SectionHeading id="lessons-heading" title="Lições Aprendidas" />
          <div className="grid sm:grid-cols-2 gap-6">
            {project.whatWentWell && project.whatWentWell.length > 0 && (
              <div className="flex flex-col gap-3">
                <h4 className="text-sm font-medium text-green-500 font-mono tracking-wider">O QUE DEU CERTO</h4>
                <ul className="flex flex-col gap-2">
                  {project.whatWentWell.map((w) => (
                    <li key={w} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <svg className="w-4 h-4 mt-0.5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {project.whatToImprove && project.whatToImprove.length > 0 && (
              <div className="flex flex-col gap-3">
                <h4 className="text-sm font-medium text-amber-500 font-mono tracking-wider">O QUE MELHORAR</h4>
                <ul className="flex flex-col gap-2">
                  {project.whatToImprove.map((w) => (
                    <li key={w} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <svg className="w-4 h-4 mt-0.5 text-amber-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          </section>
          )}

          {/* CTA */}
          <section id="cta" ref={(el) => { sectionsRef.current["cta"] = el }} className="scroll-mt-24 pt-20">
          <h3 id="cta-heading" className="text-2xl font-light pt-12 pb-4 scroll-mt-24 text-foreground">Contato</h3>
          <div className="p-8 rounded-lg border border-border bg-card text-center flex flex-col items-center gap-4">
            <h4 className="text-2xl font-light text-foreground text-balance">Quer um projeto parecido?</h4>
            <p className="text-muted-foreground max-w-md">
              Entre em contato para discutir seu projeto. Posso te ajudar!
            </p>
            <div className="flex items-center gap-3 mt-2">
              <Link
                href="mailto:nicholasdeway@hotmail.com"
                className="px-6 py-2.5 rounded-lg bg-foreground text-background text-sm hover:opacity-90 transition-opacity"
              >
                Mande um e-mail
              </Link>
              <Link
                href="/#contato"
                className="px-6 py-2.5 rounded-lg border border-border text-sm text-foreground hover:bg-muted transition-colors"
              >
                Outras formas
              </Link>
              
              <Link
                href="https://wa.me/5522997540815"
                target="_blank"
                className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300"
                aria-label="Contact on WhatsApp"
              >
                <svg
                  className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </Link>
            </div>
          </div>
          </section>
        </article>
      </div>
    </div>
  )
}