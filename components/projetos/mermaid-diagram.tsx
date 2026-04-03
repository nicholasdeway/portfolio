"use client"

import { useEffect, useRef, useState } from "react"
import mermaid from "mermaid"
import { useTheme } from "next-themes"

interface MermaidDiagramProps {
  chart: string
}

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const [svg, setSvg] = useState("")

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: theme === "dark" ? "dark" : "default",
      securityLevel: "loose",
      fontFamily: "inherit",
    })
  }, [theme])

  useEffect(() => {
    const renderDiagram = async () => {
      if (containerRef.current) {
        try {
          const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`
          const { svg } = await mermaid.render(id, chart)
          setSvg(svg)
        } catch (error) {
          console.error("Failed to render mermaid diagram:", error)
        }
      }
    }

    renderDiagram()
  }, [chart, theme])

  return (
    <div
      ref={containerRef}
      className="w-full overflow-x-auto p-4 bg-card border border-border rounded-lg flex justify-center"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}