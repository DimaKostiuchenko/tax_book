import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ProfileTab from '@/components/settings/ProfileTab';
import NotificationsTab from '@/components/settings/NotificationsTab';
import SecurityTab from '@/components/settings/SecurityTab';
import PreferencesTab from '@/components/settings/PreferencesTab';
import ClientManagementLayout from '@/layouts/client-management-layout';
import QuarterCircle from "@/components/decorators/quarter-circle"
import { IconRight } from '@/components/icons/icon-right'
import React, { useMemo } from 'react'

// Extracted components
const Breadcrumb = React.memo(() => (
    <div className="flex space-x-2 items-center">
        <span>
            <a href="/">Кабінет</a>
        </span>
        <span className="text-xs"><IconRight size="sm" /></span>
        <span className="text-gray-400">Події</span>
    </div>
))

const PageHeader = React.memo(() => (
    <div>
        <div className="p-4 bg-white">
            <h1 className="text-2xl font-semibold mt-3 text-gray-900">Налаштування</h1>
            <p className="text-gray-400 pb-3">Податкові події ФОП 3 групи, Костюченка Дмитра</p>
        </div>
        <QuarterCircle size="sm" className="bg-gray-50" />
    </div>
))

export default function Settings() {
    const { user } = usePage<SharedData>().props;
    const [activeTab, setActiveTab] = React.useState('profile');

    // Helper function to generate tab button styling
    const getTabButtonStyles = (tabValue: string, hasRightBorder: boolean = true) => {
        const baseStyles = "px-6 font-medium transition-colors flex items-center justify-center hover:bg-gray-50";
        const borderStyles = hasRightBorder ? "border-r border-r-gray-100" : "";
        const activeStyles = activeTab === tabValue 
            ? "bg-[#344CB7] text-white border-[#344CB7]" 
            : "bg-white text-gray-900";
        
        return `${baseStyles} ${borderStyles} ${activeStyles}`;
    };

    return (
        <ClientManagementLayout activeNavItem="settings">

            <div className="p-6">
                <div className="flex flex-col">
                    <div className="flex flex-col space-y-3">
                        <Breadcrumb />
                        <PageHeader />
                    </div>
                </div>
            </div>

            {/* <div className="px-6">
            <div className="text-center mb-12">
                    <h1 className="text-4xl font-semibold text-gray-900 mb-4">
                        Налаштування
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Керуйте вашим профілем, сповіщеннями та налаштуваннями системи
                    </p>
                </div>
            </div> */}


            {/* Timeline Content
              <div className="px-6">
                <div className="bg-white">
                    <NavigationTabs />
                    <QuarterTabs />

                    <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Податкові події</h3>
                        <EventsGrid events={taxEvents} />
                    </div>
                </div>
            </div> */}

            {/* <Head title="Налаштування" /> */}

            <div className="p-6">

                {/* Apply Page A header styling */}
                {/* <div className="text-center mb-12">
                    <h1 className="text-4xl font-semibold text-gray-900 mb-4">
                        Налаштування
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Керуйте вашим профілем, сповіщеннями та налаштуваннями системи
                    </p>
                </div> */}

                {/* Apply Page A tabs styling */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                     <TabsList className="grid w-full grid-cols-4 bg-white border-b border-b-gray-200 p-0 h-16 items-stretch">
                         <button
                             onClick={() => setActiveTab('profile')}
                             className={`relative ${getTabButtonStyles('profile')}`}
                         >
                             Профіль
                         </button>
                         <button
                             onClick={() => setActiveTab('notifications')}
                             className={getTabButtonStyles('notifications')}
                         >
                             Сповіщення
                         </button>
                         <button
                             onClick={() => setActiveTab('security')}
                             className={getTabButtonStyles('security')}
                         >
                             Безпека
                         </button>
                         <button
                             onClick={() => setActiveTab('preferences')}
                             className={getTabButtonStyles('preferences', false)}
                         >
                             Налаштування
                         </button>
                     </TabsList>

                    {/* Tab Content */}
                    {activeTab === 'profile' && (
                        <Card className="bg-white rounded-none border-0 shadow-none">
                            <CardHeader className="bg-white border-b border-b-gray-200 px-6 py-6">
                                <CardTitle className="text-xl font-bold text-gray-900">
                                    Профіль
                                </CardTitle>
                                <CardDescription className="text-base text-gray-500 mt-2">
                                    Керуйте вашими особистими даними та податковою інформацією
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-6">
                                <ProfileTab user={user as any} />
                            </CardContent>
                        </Card>
                    )}

                    {activeTab === 'notifications' && (
                        <Card className="bg-white rounded-none border-0 shadow-none">
                            <CardHeader className="bg-white border-b border-b-gray-200 px-6 py-6">
                                <CardTitle className="text-xl font-semibold text-gray-900">
                                    Сповіщення
                                </CardTitle>
                                <CardDescription className="text-base text-gray-500 mt-2">
                                    Налаштуйте канали сповіщень та періоди нагадувань
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-6">
                                <NotificationsTab user={user as any} />
                            </CardContent>
                        </Card>
                    )}

                    {activeTab === 'security' && (
                        <Card className="bg-white rounded-none border-0 shadow-none">
                            <CardHeader className="bg-white border-b border-b-gray-200 px-6 py-6">
                                <CardTitle className="text-xl font-semibold text-gray-900">
                                    Безпека
                                </CardTitle>
                                <CardDescription className="text-base text-gray-500 mt-2">
                                    Керуйте паролем та налаштуваннями безпеки облікового запису
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-6">
                                <SecurityTab />
                            </CardContent>
                        </Card>
                    )}

                    {activeTab === 'preferences' && (
                        <Card className="bg-white rounded-none border-0 shadow-none">
                            <CardHeader className="bg-white border-b border-b-gray-200 px-6 py-6">
                                <CardTitle className="text-xl font-semibold text-gray-900">
                                    Налаштування
                                </CardTitle>
                                <CardDescription className="text-base text-gray-500 mt-2">
                                    Персоналізуйте інтерфейс та мову системи
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-6">
                                <PreferencesTab user={user as any} />
                            </CardContent>
                        </Card>
                    )}
                </Tabs>
            </div>



        </ClientManagementLayout>
    );
}
