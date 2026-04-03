"use client"

import { useState } from "react"
import type { Endpoint } from "@/lib/freelancer-projects/types"
import { cn } from "@/lib/utils"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { useEffect } from "react"

const ITEMS_PER_PAGE = 4

const methodColors: Record<string, string> = {
  GET: "bg-green-500/10 text-green-500",
  POST: "bg-blue-500/10 text-blue-500",
  PUT: "bg-amber-500/10 text-amber-500",
  PATCH: "bg-orange-500/10 text-orange-500",
  DELETE: "bg-red-500/10 text-red-500",
}

interface EndpointListProps {
  endpoints: Endpoint[]
}

export function EndpointList({ endpoints }: EndpointListProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  const chunks: Endpoint[][] = []
  for (let i = 0; i < endpoints.length; i += ITEMS_PER_PAGE) {
    chunks.push(endpoints.slice(i, i + ITEMS_PER_PAGE))
  }

  useEffect(() => {
    if (!api) {
      return
    }

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap() + 1)
      setExpandedIndex(null)
    }

    const onInit = () => {
      setCount(api.scrollSnapList().length)
      setCurrent(api.selectedScrollSnap() + 1)
    }

    onInit()

    api.on("select", onSelect)
    api.on("reInit", onInit)

    return () => {
      api.off("select", onSelect)
      api.off("reInit", onInit)
    }
  }, [api, endpoints])

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
      <Carousel setApi={setApi} className="w-full">
        <div className="flex items-center justify-between mb-4 mt-2 px-1">
          <div className="flex flex-col">
            <h4 className="text-sm font-medium text-muted-foreground font-mono tracking-wider">
              PÁGINA {current} DE {count}
            </h4>
          </div>
          <div className="flex items-center gap-2">
            <CarouselPrevious className="static translate-y-0 h-8 w-8 cursor-pointer" />
            <CarouselNext className="static translate-y-0 h-8 w-8 cursor-pointer" />
          </div>
        </div>

        <CarouselContent>
          {chunks.map((chunk, chunkIndex) => (
            <CarouselItem key={chunkIndex}>
              <div className="flex flex-col gap-2 p-1">
                {chunk.map((endpoint) => {
                  const globalIndex = endpoints.indexOf(endpoint)
                  const isExpanded = expandedIndex === globalIndex
                  return (
                    <div
                      key={`${endpoint.method}-${endpoint.path}-${globalIndex}`}
                      className="border border-border rounded-lg overflow-hidden bg-card"
                    >
                      <button
                        onClick={() => setExpandedIndex(isExpanded ? null : globalIndex)}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/30 transition-colors text-left"
                      >
                        <span
                          className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded shrink-0 ${
                            methodColors[endpoint.method] || ""
                          }`}
                        >
                          {endpoint.method}
                        </span>
                        <div className="flex flex-col items-start gap-0.5 min-w-0 flex-1">
                            <span className="text-[10px] text-muted-foreground font-mono tracking-wider uppercase">
                                {endpoint.module}
                            </span>
                             <code className="text-sm font-mono text-foreground break-all">{endpoint.path}</code>
                        </div>

                        {endpoint.authRequired && (
                          <svg
                            className="w-3.5 h-3.5 text-amber-500 shrink-0 ml-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                        <svg
                          className={`w-4 h-4 text-muted-foreground transition-transform duration-300 shrink-0 ml-2 ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {isExpanded && (
                        <div className="px-4 pb-4 flex flex-col gap-3 border-t border-border pt-3 animate-in fade-in slide-in-from-top-2 duration-200">
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>
                              Auth:{" "}
                              <span className={endpoint.authRequired ? "text-amber-500" : "text-green-500"}>
                                {endpoint.authRequired ? "Sim" : "Não"}
                              </span>
                            </span>
                            <span>
                                Module:{" "}
                                <span className="text-foreground font-medium">{endpoint.module}</span>
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">{endpoint.description}</p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-2 flex-wrap px-4">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={cn(
              "h-2 w-2 rounded-full transition-all duration-300 mb-1 cursor-pointer",
              current === index + 1 ? "bg-foreground w-6" : "bg-muted-foreground/30 hover:bg-muted-foreground/50",
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}