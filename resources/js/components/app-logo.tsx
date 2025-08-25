import { cn } from '@/lib/utils'

interface AppLogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export function AppLogo({ className, size = 'md' }: AppLogoProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  }

  return (
    <img 
      src="/user/login/assets/pixso-logo.2c54243d.svg"
      alt="Pixso Logo"
      className={cn(sizeClasses[size], className)}
    />
  )
}
