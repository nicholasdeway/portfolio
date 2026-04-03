import type { FreelancerProject } from "@/lib/freelancer-projects/types"

interface TOCItem {
  id: string
  label: string
  isVisible: (project: FreelancerProject) => boolean
}

const tocItems: TOCItem[] = [
  { id: "overview", label: "Visão Geral", isVisible: () => true },
  { id: "gallery", label: "Galeria", isVisible: (p) => !!p.galleryImages?.length },
  { id: "architecture", label: "Arquitetura", isVisible: (p) => !!(p.architectureExplanation || p.folderStructure || p.keyDecisions?.length) },
  { id: "database", label: "Banco de Dados", isVisible: (p) => !!p.databaseSchema },
  { id: "api", label: "API / Endpoints", isVisible: (p) => !!p.endpoints?.length },
  { id: "security", label: "Segurança", isVisible: (p) => !!(p.authStrategy || p.roles?.length || p.vulnerabilitiesAvoided?.length || p.storageStrategy || p.inputValidation) },
  { id: "config", label: "Configuração", isVisible: (p) => !!(p.envExample || p.configExplanation) },
  { id: "deployment", label: "Deploy", isVisible: (p) => !!(p.deploymentStrategy || p.cicdSummary || p.monitoringNotes) },
  { id: "lessons", label: "Aprendizados", isVisible: (p) => !!(p.whatWentWell?.length || p.whatToImprove?.length) },
  { id: "cta", label: "Contato", isVisible: () => true },
]

export function TableOfContents({ activeSection, project }: { activeSection: string; project: FreelancerProject }) {
  const visibleItems = tocItems.filter((item) => item.isVisible(project))

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return

    const offset = -120 // Acomoda o header fixo
    const y = el.getBoundingClientRect().top + window.scrollY + offset

    window.scrollTo({
      top: y,
      behavior: "smooth",
    })
  }

  return (
    <nav className="hidden xl:block sticky top-24 self-start w-48 shrink-0 max-h-[calc(100vh-8rem)] overflow-y-auto" aria-label="Indice">
      <div className="text-xs text-muted-foreground font-mono mb-4 tracking-wider">ÍNDICE</div>
      <ul className="flex flex-col gap-1">
        {visibleItems.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => handleScrollToSection(item.id)}
              className={`block w-full text-left text-sm py-1 pl-3 border-l-2 transition-all duration-300 ${
                activeSection === item.id
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/50"
              }`}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}