import { useState, useEffect } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import type { GalleryImage } from "@/lib/freelancer-projects/types"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"

interface GalleryModalProps {
  images: GalleryImage[]
}

export function GalleryModal({ images }: GalleryModalProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  const selectedImage = selectedIndex !== null ? images[selectedIndex] : null

  const chunks = []
  for (let i = 0; i < images.length; i += 6) {
    chunks.push(images.slice(i, i + 6))
  }

  useEffect(() => {
    if (!api) {
      return
    }

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap() + 1)
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
  }, [api])

  return (
    <div className="flex flex-col gap-6 w-full">
      <Carousel setApi={setApi} className="w-full">
        {count > 1 && (
          <div className="flex items-center justify-between mb-4 px-1">
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-muted-foreground font-mono tracking-wider">
                PÁGINA {current} DE {count}
              </h4>
            </div>
            <div className="flex items-center gap-2">
              <CarouselPrevious className="static translate-y-0 h-8 w-8" />
              <CarouselNext className="static translate-y-0 h-8 w-8" />
            </div>
          </div>
        )}

        <CarouselContent>
          {chunks.map((chunk, chunkIndex) => (
            <CarouselItem key={chunkIndex}>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {chunk.map((img, imgIndex) => {
                  const globalIndex = chunkIndex * 6 + imgIndex
                  return (
                    <button
                      key={img.src + globalIndex}
                      onClick={() => setSelectedIndex(globalIndex)}
                      className="group relative aspect-video rounded-lg overflow-hidden bg-muted border border-border hover:border-muted-foreground/50 transition-all duration-300"
                    >
                      <Image
                        src={img.src || "/placeholder.svg"}
                        alt={img.alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300 flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-background opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                          />
                        </svg>
                      </div>
                      {img.caption && (
                        <div className="absolute bottom-0 left-0 right-0 bg-foreground/70 px-2 py-1">
                          <span className="text-[10px] text-background truncate block">
                            {img.caption}
                          </span>
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Dots */}
      {count > 1 && (
        <div className="flex justify-center gap-2 mt-2 flex-wrap px-4">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "h-2 w-2 rounded-full transition-all duration-300 mb-1",
                current === index + 1
                  ? "bg-foreground w-6"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50",
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      <Dialog open={selectedIndex !== null} onOpenChange={() => setSelectedIndex(null)}>
        <DialogContent className="w-[95vw] sm:w-full max-w-4xl sm:max-w-5xl lg:max-w-6xl p-0 overflow-hidden bg-card">
          <DialogTitle className="sr-only">Galeria de Imagens</DialogTitle>
          {selectedImage && (
            <div className="flex flex-col">
              <div className="relative aspect-video">
                <Image
                  src={selectedImage.src || "/placeholder.svg"}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex items-center justify-between p-4 border-t border-border">
                <div>
                  <p className="text-sm font-medium text-foreground">{selectedImage.alt}</p>
                  {selectedImage.caption && (
                    <p className="text-xs text-muted-foreground mt-0.5">{selectedImage.caption}</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setSelectedIndex((prev) =>
                        prev !== null && prev > 0 ? prev - 1 : images.length - 1,
                      )
                    }
                    className="p-2 rounded-lg border border-border hover:border-muted-foreground/50 transition-colors"
                    aria-label="Imagem anterior"
                  >
                    <svg className="w-4 h-4 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <span className="text-xs text-muted-foreground font-mono">
                    {selectedIndex !== null ? selectedIndex + 1 : 0} / {images.length}
                  </span>
                  <button
                    onClick={() =>
                      setSelectedIndex((prev) =>
                        prev !== null && prev < images.length - 1 ? prev + 1 : 0,
                      )
                    }
                    className="p-2 rounded-lg border border-border hover:border-muted-foreground/50 transition-colors"
                    aria-label="Proxima imagem"
                  >
                    <svg className="w-4 h-4 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}