import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { IconHome } from '@/components/icons/icon-home';
import { IconEvents } from '@/components/icons/icon-events';
import {AppLogo} from '@/components/app-logo'

const mainNavItems: NavItem[] = [
    {
        title: 'Головна',
        href: '/dashboard',
        icon: IconHome,
    }, {
        title: 'Події',
        href: '/events',
        icon: IconEvents,
    },
];

const footerNavItems: NavItem[] = [];

export function AppSidebar() {
    return (
        <Sidebar className="bg-white" collapsible="icon" variant="sidebar">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem >
                        <SidebarMenuButton asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo size="lg" />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
