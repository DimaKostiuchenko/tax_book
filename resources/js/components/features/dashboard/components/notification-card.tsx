import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';

interface NotificationCardProps {
    children: ReactNode;
    className?: string;
}

export function NotificationCard({  children, className = "" }: NotificationCardProps) {
    return (
        <div className={`bg-white border border-gray-200 rounded-lg p-6 ${className}`}>
            {children}
        </div>
    );
}

interface StatusIndicatorProps {
    isConnected: boolean;
    label: string;
    className?: string;
}

export function StatusIndicator({ isConnected, label, className = "" }: StatusIndicatorProps) {
    return (
        <div className={`flex items-center space-x-3 p-4 rounded-lg border ${
            isConnected 
                ? 'bg-green-50 border-green-200' 
                : 'bg-gray-50 border-gray-200'
        } ${className}`}>
            <div className={`w-3 h-3 rounded-full ${
                isConnected ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
            }`}></div>
            <span className={`text-base font-medium ${
                isConnected ? 'text-green-700' : 'text-gray-600'
            }`}>
                {label}
            </span>
        </div>
    );
}

interface ActionButtonProps {
    onClick: () => void;
    disabled?: boolean;
    variant?: 'primary' | 'secondary' | 'danger';
    children: ReactNode;
    className?: string;
}

export function ActionButton({ 
    onClick, 
    disabled = false, 
    variant = 'secondary', 
    children, 
    className = "" 
}: ActionButtonProps) {
    const baseClasses = "h-10 px-4 rounded-lg font-medium transition-colors";
    
    const variantClasses = {
        primary: "bg-[#344CB7] text-white hover:bg-[#2a3a9e]",
        secondary: "border border-gray-300 text-gray-700 hover:bg-gray-50",
        danger: "border border-red-300 text-red-700 hover:bg-red-50"
    };

    return (
        <Button
            type="button"
            variant="outline"
            onClick={onClick}
            disabled={disabled}
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        >
            {children}
        </Button>
    );
}
