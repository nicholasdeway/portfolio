"use client"

import { useCallback, useState } from "react"

interface CodeBlockWithCopyProps {
  title: string
  language: string
  code: string
  explanation?: string
}

export function CodeBlockWithCopy({ title, language, code, explanation }: CodeBlockWithCopyProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [code])

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 bg-muted/50 border-b border-border">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">{title}</span>
          <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded font-mono">
            {language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Copiar codigo"
        >
          {copied ? (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copiado
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              Copiar
            </>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed bg-card">
        <code className="font-mono text-foreground/90">{code}</code>
      </pre>
      {explanation && (
        <div className="px-4 py-3 bg-muted/30 border-t border-border">
          <p className="text-sm text-muted-foreground leading-relaxed">{explanation}</p>
        </div>
      )}
    </div>
  )
}