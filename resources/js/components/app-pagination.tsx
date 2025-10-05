import { Link } from '@inertiajs/react'
import { cn } from '@/lib/utils'

export interface PaginationLink {
  url: string | null
  label: string
  active: boolean
}

export interface PaginationProps {
  links: PaginationLink[]
  className?: string
}

export function Pagination({ links, className }: PaginationProps) {
  if (links.length === 0) {
    return null
  }

  const formatLabel = (label: string) => {
    return label
      .replace('&laquo; Previous', 'Prev')
      .replace('Next &raquo;', 'Next')
  }

  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      {links.map((link, index) => (
        <Link
          key={`${link.label}-${index}`}
          href={link.url ?? '#'}
          className={cn(
            'rounded px-3 py-2 text-base transition-colors',
            link.active 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
          )}
          preserveScroll
          preserveState
        >
          {formatLabel(link.label)}
        </Link>
      ))}
    </div>
  )
}
