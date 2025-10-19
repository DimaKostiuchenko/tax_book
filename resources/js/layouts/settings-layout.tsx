import { Head, Link, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';
import ClientLayout from '@/layouts/client-layout';
import QuarterCircle from "@/components/common/decorators/quarter-circle";
import { IconRight } from '@/components/common/icons/icon-right';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';

interface SettingsLayoutProps {
    children: React.ReactNode;
    title: string;
    description?: string;
}

export default function SettingsLayout({ children, title, description }: SettingsLayoutProps) {
    const { user } = usePage<SharedData>().props;

    // Helper function to generate tab button styling
    const getTabButtonStyles = (tabValue: string, hasRightBorder: boolean = true) => {
        const isActive = tabValue === title;
        const baseStyles = "px-6 font-medium transition-colors flex items-center justify-center";
        const borderStyles = hasRightBorder ? "border-r border-r-gray-100" : "";
        
        // Different hover effects for active vs inactive tabs
        const hoverStyles = isActive 
            ? "hover:bg-[#344CB7] hover:bg-opacity-90" // Subtle darkening for active tabs
            : "hover:bg-gray-50"; // Normal hover for inactive tabs
            
        const activeStyles = isActive 
            ? "bg-[#344CB7] text-white border-[#344CB7]" 
            : "bg-white text-gray-900";
        
        return `${baseStyles} ${borderStyles} ${hoverStyles} ${activeStyles}`;
    };

    return (
        <ClientLayout activeNavItem="settings">
            <Head title={`Налаштування - ${title}`} />

            <div className="p-6">
                <div className="flex flex-col">
                    <div className="flex flex-col space-y-3">
                        {/* Breadcrumb */}
                        <div className="flex space-x-2 items-center">
                            <span>
                                <Link href="/" className="text-gray-600 hover:text-gray-900">
                                    Кабінет
                                </Link>
                            </span>
                            <span className="text-xs text-gray-400">
                                <IconRight size="sm" />
                            </span>
                            <span className="text-gray-400">Налаштування</span>
                        </div>

                        {/* Page Header */}
                        <div>
                            <div className="p-4 bg-white">
                                <h1 className="text-2xl font-semibold mt-3 text-gray-900">Налаштування</h1>
                                <p className="text-gray-400 pb-3">Податкові події ФОП 3 групи, Костюченка Дмитра</p>
                            </div>
                            <QuarterCircle size="sm" className="bg-gray-50" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6">
                {/* Tab Navigation */}
                <div className="grid w-full grid-cols-4 bg-white border-b border-b-gray-200 p-0 h-16 items-stretch">
                    <Link
                        href="/settings/profile"
                        className={`relative ${getTabButtonStyles('Профіль')}`}
                    >
                        Профіль
                    </Link>
                    <Link
                        href="/settings/notifications"
                        className={getTabButtonStyles('Сповіщення')}
                    >
                        Сповіщення
                    </Link>
                    <Link
                        href="/settings/security"
                        className={getTabButtonStyles('Безпека')}
                    >
                        Безпека
                    </Link>
                    <Link
                        href="/settings/preferences"
                        className={getTabButtonStyles('Налаштування', false)}
                    >
                        Налаштування
                    </Link>
                </div>

                {/* Content Card */}
                <Card className="bg-white rounded-none border-0 shadow-none">
                    <CardHeader className="bg-white border-b border-b-gray-200 px-6 py-6">
                        <CardTitle className="text-xl font-bold text-gray-900">
                            {title}
                        </CardTitle>
                        <CardDescription className="text-base text-gray-500 mt-2">
                            {description}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                        {children}
                    </CardContent>
                </Card>
            </div>
        </ClientLayout>
    );
}
