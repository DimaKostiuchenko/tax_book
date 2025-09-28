import {cn} from '@/lib/utils'

interface AppLogoProps {
    className?: string
    size?: 'sm' | 'md' | 'lg' | 'xl'
}

export function IconUser({className, size = 'md'}: AppLogoProps) {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8',
        xl: 'w-12 h-12',
    }

    return (
        <svg className={cn(sizeClasses[size], className)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" color="#000000" fill="none">
            <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="1.5"></path>
            <path d="M14 14H10C7.23858 14 5 16.2386 5 19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19C19 16.2386 16.7614 14 14 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"></path>
        </svg>
    )
}
