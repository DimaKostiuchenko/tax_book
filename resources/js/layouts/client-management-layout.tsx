import { type ReactNode } from 'react'
import { Link } from '@inertiajs/react'
import { IconHome } from '@/components/icons/icon-home'
import { IconEvents } from '@/components/icons/icon-events'
import { Settings } from 'lucide-react'

interface NavItem {
    icon: React.ReactNode
    label: string
    href: string
    active?: boolean
}

interface ClientManagementLayoutProps {
    children: ReactNode
    activeNavItem?: string
}

export default function ClientManagementLayout({ children, activeNavItem = 'events' }: ClientManagementLayoutProps) {
    const navItems: NavItem[] = [
        { icon: <IconHome className="w-5 h-5" />, label: "Кабінет", href: "/dashboard", active: activeNavItem === 'dashboard' },
        { icon: <IconEvents className="w-5 h-5" />, label: "Події", href: "/events", active: activeNavItem === 'events' },
        { icon: <Settings className="w-5 h-5" />, label: "Налаштування", href: "/settings", active: activeNavItem === 'settings' },
    ]

    return (
        <>
            {/* Fixed Left Sidebar - Navigation */}
            <aside className="fixed left-0 top-0 h-full w-46 bg-white z-50 overflow-y-auto">
                <div className="p-6">
                    {/* Logo/Avatar */}
                    <div className="flex items-center space-x-2 mb-8 rounded-full">
                        <img
                            className="photo rounded-full"
                            width="48"
                            height="48"
                            src="https://cdn.dribbble.com/users/16210634/avatars/normal/3887fa4eefec745603aa5a22ff0ececf.png?1684165676"
                            alt="User Avatar"
                        />
                    </div>

                    {/* Navigation Menu */}
                    <nav className="space-y-2">
                        {navItems.map((item, index) => (
                            <Link
                                key={index}
                                href={item.href}
                                className={`flex text-lg items-center space-x-3 p-2 rounded-lg transition-colors ${
                                    item.active
                                        ? 'font-bold text-blue-900'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                            >
                                <div className={item.active ? 'text-blue-900' : 'text-gray-500'}>
                                    {item.icon}
                                </div>
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        ))}
                    </nav>
                </div>
            </aside>

            {/* Main Content Area with left margin to account for fixed sidebar */}
            <main className="ml-46 min-h-screen bg-gradient-to-b from-slate-200 to-gray-100" style={{ fontFamily: 'Roboto, sans-serif' }}>
                {children}
            </main>
        </>
    )
}
