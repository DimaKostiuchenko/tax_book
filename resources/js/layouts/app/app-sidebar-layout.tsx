import { AppContent } from '@/components/layout/shell/app-content';
import { AppShell } from '@/components/layout/shell/app-shell';
import { AppSidebar } from '@/components/layout/sidebar/app-sidebar';
import { AppSidebarHeader } from '@/components/layout/header/app-sidebar-header';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';

export default function AppSidebarLayout({ children, breadcrumbs = [] }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    return (
        <AppShell variant="sidebar">

            <AppSidebar/>

            <AppContent variant="sidebar"
            className="bg-gradient-to-b from-slate-200 to-gray-100 overflow-x-hidden">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                {children}
            </AppContent>

        </AppShell>
    );
}
