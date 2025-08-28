import React from 'react'
import { IconHome } from '@/components/icons/icon-home'

interface BreadcrumbItem {
    label: string
    href?: string
    active?: boolean
}

interface PageHeaderProps {
    title: string
    subtitle?: string
    breadcrumbs: BreadcrumbItem[]
}

export const PageHeader: React.FC<PageHeaderProps> = ({ 
    title, 
    subtitle, 
    breadcrumbs 
}) => {
    return (
        <div className="p-6">
            <div className="flex flex-col space-y-2">
                <h1 className="text-2xl font-semibold mt-3 text-gray-900">{title}</h1>
                {subtitle && (
                    <p className="text-gray-400 pb-3">{subtitle}</p>
                )}
                
                <div className="flex space-x-2 items-center">
                    {breadcrumbs.map((item, index) => (
                        <React.Fragment key={index}>
                            {index === 0 && <IconHome className="w-5 h-5" />}
                            {item.href ? (
                                <a 
                                    href={item.href}
                                    className={item.active ? 'text-gray-400' : 'text-gray-600 hover:text-gray-900'}
                                >
                                    {item.label}
                                </a>
                            ) : (
                                <span className={item.active ? 'text-gray-400' : 'text-gray-600'}>
                                    {item.label}
                                </span>
                            )}
                            {index < breadcrumbs.length - 1 && (
                                <span className="text-xs">/</span>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    )
}
