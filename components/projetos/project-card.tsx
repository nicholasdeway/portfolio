"use client"

import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import type { FreelancerProject } from "@/lib/freelancer-projects/types"

const statusColors: Record<string, string> = {
  Ativo: "bg-green-500/10 text-green-500 border-green-500/20",
  Finalizado: "bg-red-500/10 text-red-500 border-red-500/20",
  "Em manutenção": "bg-amber-500/10 text-amber-500 border-amber-500/20",
}

export function ProjectCard({ project, index }: { project: FreelancerProject; index: number }) {
  return (
    <Link href={`/projetos/${project.slug}`} className="group block">
      <article className="grid grid-cols-1 md:grid-cols-[340px_1fr] min-h-[220px] rounded-xl border border-border bg-card overflow-hidden transition-all duration-500 hover:border-muted-foreground/40 hover:shadow-xl hover:shadow-black/20">

        {/* Imagem */}
        <div className="relative aspect-video md:aspect-auto overflow-hidden bg-muted">
          <Image
            src={project.coverImage || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Overlay gradiente sutil */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/30 hidden md:block" />

          {/* Badge de status */}
          <div className="absolute top-3 left-3">
            <span
              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium backdrop-blur-sm ${statusColors[project.status] || ""}`}
            >
              {project.status}
            </span>
          </div>

          {/* Número do projeto */}
          <div className="absolute bottom-3 left-3 hidden md:block">
            <span className="text-4xl font-bold text-white/10 select-none font-mono">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="p-6 md:p-8 flex flex-col gap-4 justify-between">
          <div className="flex flex-col gap-3">
            {/* Cabeçalho */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs text-muted-foreground font-mono mb-1.5">
                  <time>
                    {new Date(project.date).toLocaleDateString("pt-BR", {
                      month: "short",
                      year: "numeric",
                    })}
                  </time>
                </div>
                <h3 className="text-xl md:text-2xl font-medium text-foreground group-hover:text-muted-foreground transition-colors duration-300">
                  {project.title}
                </h3>
              </div>
            </div>

            {/* Descrição */}
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 max-w-xl">
              {project.description}
            </p>

            {/* Tags de stack */}
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-[10px] px-2 py-0 font-normal">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Rodapé */}
          <div className="flex items-center gap-4 pt-3 border-t border-border/40">
            {project.deployUrl && (
              <span
                className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                onClick={(e) => {
                  e.preventDefault()
                  window.open(project.deployUrl, "_blank")
                }}
                role="link"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") window.open(project.deployUrl, "_blank")
                }}
              >
                Deploy ↗
              </span>
            )}

            {project.repoUrl && (
              <span
                className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                onClick={(e) => {
                  e.preventDefault()
                  window.open(project.repoUrl, "_blank")
                }}
                role="link"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") window.open(project.repoUrl, "_blank")
                }}
              >
                Repositório ↗
              </span>
            )}

            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300 flex items-center gap-1.5 ml-auto">
              Ver detalhes
              <svg
                className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}