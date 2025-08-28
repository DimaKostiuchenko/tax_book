import {cn} from '@/lib/utils'

interface AppLogoProps {
    className?: string
    size?: 'sm' | 'md' | 'lg' | 'xl'
}

export function IconRight({className, size = 'md'}: AppLogoProps) {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8',
        xl: 'w-12 h-12',
    }

    return (
        <svg className={cn(sizeClasses[size], className)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
             width="24" height="24" color="#000000" fill="none">
            <path d="M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    )
}
