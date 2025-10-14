import React from 'react';
// Assuming cn is imported from a utility file
import { cn } from '@/lib/utils'; 

interface IconInfoProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    color?: string; // Optional prop to override stroke color
}

/**
 * An information icon (circle with 'i') with customizable size and classes.
 */
// Changed from named export 'export function IconInfo' to default export 'export default function IconInfo'
export default function IconInfo({ className, size = 'md', color }: IconInfoProps) {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8',
        xl: 'w-12 h-12',
    };

    // Use 'currentColor' if color prop is not provided, allowing it to inherit text color
    const strokeColor = color || 'currentColor'; 

    return (
        <svg 
            className={cn(sizeClasses[size], className)} 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none"
        >
            {/* The circle body */}
            <circle 
                cx="12" 
                cy="12" 
                r="10" 
                stroke={strokeColor} 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            />
            
            {/* The vertical line (body of the 'i') */}
            <path 
                d="M12 16V11.5" 
                stroke={strokeColor} 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            />
            
            {/* The dot (head of the 'i') */}
            <path 
                d="M12 8.01172V8.00172" 
                stroke={strokeColor} 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            />
        </svg>
    );
}
