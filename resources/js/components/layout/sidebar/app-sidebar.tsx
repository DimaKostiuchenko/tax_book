import { NavFooter } from '@/components/common/navigation/nav-footer';
import { NavMain } from '@/components/common/navigation/nav-main';
import { NavUser } from '@/components/common/navigation/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { IconHome } from '@/components/common/icons/icon-home';
import { IconEvents } from '@/components/common/icons/icon-events';
import {AppLogo} from '@/components/common/branding/app-logo'

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
        <Sidebar className="p-4 pt-6" collapsible="icon" variant="sidebar">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem >

                            <Link href="/dashboard" prefetch>
                                <AppLogo size="xl" />
                            </Link>

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
