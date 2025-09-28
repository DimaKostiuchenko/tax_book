import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';


export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();
    return (
        <SidebarGroup className="px-2 py-0">
            {/*<SidebarGroupLabel>Платформа</SidebarGroupLabel>*/}
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                            asChild
                            isActive={page.url.startsWith(item.href)}
                            tooltip={{ children: item.title }}
                            className={`flex text-lg items-center space-x-3 p-2 rounded-lg transition-colors ${
                                page.url.startsWith(item.href)
                                    ? 'font-bold text-blue-900'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                        >
                            <Link href={item.href} prefetch>
                                <div className={page.url.startsWith(item.href) ? 'text-blue-900' : 'text-gray-500'}>
                                    {item.icon && <item.icon/>}
                                </div>
                                <span className="font-medium">{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
