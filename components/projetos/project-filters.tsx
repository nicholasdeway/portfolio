"use client"

import type { StackCategory } from "@/lib/freelancer-projects/types"

const categories: StackCategory[] = ["Frontend", "Backend", "Database", "Infra"]

type SortOption = "recent" | "az" | "complex"

const sortLabels: Record<SortOption, string> = {
  recent: "Mais recente",
  az: "A-Z",
  complex: "Mais complexo",
}

interface ProjectFiltersProps {
  search: string
  onSearchChange: (v: string) => void
  activeCategories: StackCategory[]
  onCategoryToggle: (c: StackCategory) => void
  sort: SortOption
  onSortChange: (s: SortOption) => void
}

export function ProjectFilters({
  search,
  onSearchChange,
  activeCategories,
  onCategoryToggle,
  sort,
  onSortChange,
}: ProjectFiltersProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Buscar por título, descrição ou tags..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-muted/50 border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring transition-all"
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isActive = activeCategories.includes(cat)
            return (
              <button
                key={cat}
                onClick={() => onCategoryToggle(cat)}
                className={`px-3 py-1.5 text-xs rounded-full border transition-all duration-300 ${
                  isActive
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent text-muted-foreground border-border hover:border-muted-foreground/50"
                }`}>
                {cat}
              </button>
            )
          })}
        </div>

        <div className="flex items-center gap-1.5">
          {(Object.keys(sortLabels) as SortOption[]).map((key) => (
            <button
              key={key}
              onClick={() => onSortChange(key)}
              className={`px-2.5 py-1 text-xs rounded transition-all duration-300 ${
                sort === key
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {sortLabels[key]}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}