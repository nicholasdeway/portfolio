"use client"

import { useMemo, useState } from "react"
import { projects } from "@/lib/freelancer-projects/data"
import type { StackCategory } from "@/lib/freelancer-projects/types"
import { ProjectCard } from "./project-card"
import { ProjectFilters } from "./project-filters"

type SortOption = "recent" | "az" | "complex"

export function ProjectHubSection() {
  const [search, setSearch] = useState("")
  const [activeCategories, setActiveCategories] = useState<StackCategory[]>([])
  const [sort, setSort] = useState<SortOption>("complex")

  const handleCategoryToggle = (cat: StackCategory) => {
    setActiveCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    )
  }

  const filtered = useMemo(() => {
    let result = [...projects]

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)),
      )
    }

    // Category filter
    if (activeCategories.length > 0) {
      result = result.filter((p) =>
        activeCategories.some((cat) => {
          const key = cat.toLowerCase() as keyof typeof p.stack
          return p.stack[key] && p.stack[key].length > 0
        }),
      )
    }

    switch (sort) {
      case "recent":
        result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        break
      case "az":
        result.sort((a, b) => a.title.localeCompare(b.title))
        break
      case "complex":
        result.sort((a, b) => {
          const scoreA = a.complexity ?? 0
          const scoreB = b.complexity ?? 0
          return scoreB - scoreA
        })
        break
    }

    return result
  }, [search, activeCategories, sort])

  return (
    <section className="py-20 sm:py-32">
      <div className="flex flex-col gap-12 sm:gap-16">
        <div className="flex flex-col gap-3">
          <div className="text-sm text-muted-foreground font-mono tracking-wider">FREELANCER / HUB</div>
          <h2 className="text-3xl sm:text-4xl font-light text-balance">Projetos Freelancers</h2>
          <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
            Casos reais, decisões técnicas e implementação completa.
          </p>
        </div>

        <ProjectFilters
          search={search}
          onSearchChange={setSearch}
          activeCategories={activeCategories}
          onCategoryToggle={handleCategoryToggle}
          sort={sort}
          onSortChange={setSort}
        />

        {filtered.length > 0 ? (
          <div className="flex flex-col gap-5">
            {filtered.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground">Nenhum projeto encontrado para esta busca.</p>
          </div>
        )}
      </div>
    </section>
  )
}