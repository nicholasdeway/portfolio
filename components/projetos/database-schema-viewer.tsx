"use client"

import { useState } from "react"
import { CodeBlockWithCopy } from "./code-block-with-copy"

interface DatabaseSchemaItem {
  name: string
  description?: string
  entityCode: string
  sqlCode?: string
}

export function DatabaseSchemaViewer({ items }: { items: DatabaseSchemaItem[] }) {
  const [activeSchema, setActiveSchema] = useState(items[0]?.name || "")
  const activeItem = items.find((i) => i.name === activeSchema) || items[0]

  if (!items.length) return null

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2 items-center">
        {items.map((item) => (
          <button
            key={item.name}
            onClick={() => setActiveSchema(item.name)}
            className={`px-3 py-1.5 rounded-md text-sm font-mono transition-all duration-200 border ${
              activeSchema === item.name
                ? "bg-foreground text-background border-foreground shadow-sm"
                : "bg-muted/30 text-muted-foreground border-transparent hover:bg-muted hover:text-foreground hover:border-border"
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      {activeItem && (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-top-2 duration-300">
          {activeItem.description && (
            <p className="text-muted-foreground text-sm leading-relaxed border-l-2 border-primary/20 pl-4 py-1">
              {activeItem.description}
            </p>
          )}

          <div className="grid gap-6">
            <CodeBlockWithCopy
              title={`${activeItem.name} Entity`}
              language="csharp"
              code={activeItem.entityCode}
            />

            {activeItem.sqlCode && (
              <CodeBlockWithCopy
                title={`${activeItem.name} SQL Schema`}
                language="sql"
                code={activeItem.sqlCode}
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}