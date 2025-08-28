import { type ReactNode } from 'react'
import { IconHome } from '@/components/icons/icon-home'
import { IconEvents } from '@/components/icons/icon-events'

interface NavItem {
    icon: React.ReactNode
    label: string
    active?: boolean
}

interface ClientManagementLayoutProps {
    children: ReactNode
    activeNavItem?: string
}

export default function ClientManagementLayout({ children, activeNavItem = 'events' }: ClientManagementLayoutProps) {
    const navItems: NavItem[] = [
        { icon: <IconHome className="w-5 h-5" />, label: "Кабінет", active: activeNavItem === 'dashboard' },
        { icon: <IconEvents className="w-5 h-5" />, label: "Події", active: activeNavItem === 'events' },
    ]

    return (
        <>

            <div className="min-h-screen bg-gradient-to-b from-slate-200 to-gray-100 flex" style={{ fontFamily: 'Roboto, sans-serif' }}>
                {/* Left Sidebar - Navigation */}
                <aside className="bg-white">
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
                                <a
                                    key={index}
                                    href="#"
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
                                </a>
                            ))}
                        </nav>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 flex flex-col">
                    {children}
                </main>
            </div>
        </>
    )
}
