import { Head, Link } from '@inertiajs/react';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import ClientLayout from '@/layouts/client-layout';
import { IconUser } from '@/components/common/icons/icon-user';
import { IconEvents } from '@/components/common/icons/icon-bell';
import { Shield, Settings as SettingsIcon } from 'lucide-react';
import QuarterCircle from "@/components/common/decorators/quarter-circle";
import { IconRight } from '@/components/common/icons/icon-right';
import React from 'react';

interface SettingsCard {
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    description: string;
    color: string;
}

const settingsCards: SettingsCard[] = [
    {
        name: 'Профіль',
        href: '/settings/profile',
        icon: IconUser,
        description: 'Керуйте вашими особистими даними та податковою інформацією',
        color: 'bg-blue-500'
    },
    {
        name: 'Сповіщення',
        href: '/settings/notifications',
        icon: IconEvents,
        description: 'Налаштуйте канали сповіщень та періоди нагадувань',
        color: 'bg-green-500'
    },
    {
        name: 'Безпека',
        href: '/settings/security',
        icon: Shield,
        description: 'Керуйте паролем та налаштуваннями безпеки облікового запису',
        color: 'bg-red-500'
    },
    {
        name: 'Налаштування',
        href: '/settings/preferences',
        icon: SettingsIcon,
        description: 'Персоналізуйте інтерфейс та мову системи',
        color: 'bg-purple-500'
    }
];

export default function SettingsIndex() {
    const { user } = usePage<SharedData>().props;

    return (
        <ClientLayout activeNavItem="settings">
            <Head title="Налаштування" />
            
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

            {/* Settings Cards */}
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {settingsCards.map((card) => {
                        const Icon = card.icon;
                        
                        return (
                            <Link
                                key={card.href}
                                href={card.href}
                                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200 group"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className={`${card.color} p-3 rounded-lg`}>
                                        <Icon className="h-6 w-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900 group-hover:text-[#344CB7] transition-colors">
                                            {card.name}
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {card.description}
                                        </p>
                                    </div>
                                    <IconRight className="h-5 w-5 text-gray-400 group-hover:text-[#344CB7] transition-colors" />
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </ClientLayout>
    );
}
