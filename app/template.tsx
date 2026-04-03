"use client"

import { motion } from "framer-motion"
import { usePathname } from "next/navigation"

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const bricks = Array.from({ length: 121 })

  return (
    <div key={pathname} className="relative">
      <motion.div
        className="fixed inset-0 z-50 pointer-events-none grid grid-cols-11 overflow-hidden"
        aria-hidden="true"
      >
        {bricks.map((_, i) => (
          <motion.div
            key={i}
            className="w-full h-[9.09vh] bg-foreground/10 border-[0.5px] border-transparent"
            initial={{ opacity: 0, scale: 1 }}
            animate={{ 
              opacity: [1, 0], 
              scale: [1, 0.8],
              transition: { 
                duration: 0.3,
                delay: i * 0.002,
                ease: "easeInOut"
              }
            }}
          />
        ))}
      </motion.div>
      {children}
    </div>
  )
}