"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

import { flushSync } from "react-dom"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const ref = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = async () => {
    const newTheme = resolvedTheme === "dark" ? "light" : "dark"

    if (!ref.current || !document.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTheme(newTheme)
      return
    }

    const { top, left, width, height } = ref.current.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const right = window.innerWidth - left
    const bottom = window.innerHeight - top
    const maxRadius = Math.hypot(
      Math.max(left, right),
      Math.max(top, bottom)
    )

    document.documentElement.classList.add("view-transitioning")

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setTheme(newTheme)
      })
    })

    try {
      await transition.ready

      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 350,
          easing: "cubic-bezier(0.16, 1, 0.3, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      )

      if (transition.finished) {
        await transition.finished
      } else {
        await new Promise((resolve) => setTimeout(resolve, 350))
      }
    } catch (e) {
      console.error(e)
    } finally {
      document.documentElement.classList.remove("view-transitioning")
    }
  }

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" disabled={true} className="opacity-50">
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <Button 
      ref={ref} 
      variant="outline" 
      size={null} 
      onClick={toggleTheme} 
      className="group theme-toggle-btn p-3 h-auto w-auto rounded-lg border-border bg-transparent hover:bg-transparent hover:border-muted-foreground/50 transition-all duration-300 relative overflow-hidden cursor-pointer"
    >
      <Sun 
        className={`w-4 h-4 transition-all duration-500 ${
          resolvedTheme === 'dark' ? '-rotate-90 scale-0 opacity-0 absolute' : 'rotate-0 scale-100 opacity-100'
        } text-muted-foreground group-hover:text-foreground`} 
      />
      <Moon 
        className={`w-4 h-4 transition-all duration-500 ${
          resolvedTheme === 'dark' ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0 absolute'
        } text-muted-foreground group-hover:text-foreground`} 
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}