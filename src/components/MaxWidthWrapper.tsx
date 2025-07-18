import { cn } from '@/lib/utils'
import React from 'react'

const MaxWidthWrapper = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={cn("h-full w-full mx-auto max-w-screen-xl px-2.5 md:px-20", className)}>
      {children}</div>
  )
}

export default MaxWidthWrapper