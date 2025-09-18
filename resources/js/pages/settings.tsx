import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Bell, Shield, Settings as SettingsIcon } from 'lucide-react';
import ProfileTab from '@/components/settings/ProfileTab';
import NotificationsTab from '@/components/settings/NotificationsTab';
import SecurityTab from '@/components/settings/SecurityTab';
import PreferencesTab from '@/components/settings/PreferencesTab';

export default function Settings() {
    const { user } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Налаштування" />
            
            {/* Apply Page A styling - Background and Layout */}
            <div className="min-h-screen bg-gradient-to-b from-slate-200 to-gray-100" style={{ fontFamily: 'Roboto, sans-serif' }}>
                <div className="p-6">
                    <div className="max-w-5xl mx-auto">
                        {/* Apply Page A header styling */}
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#344CB7] rounded-2xl mb-6">
                                <SettingsIcon className="w-8 h-8 text-white" />
                            </div>
                            <h1 className="text-4xl font-semibold text-gray-900 mb-4">
                                Налаштування
                            </h1>
                            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                                Керуйте вашим профілем, сповіщеннями та налаштуваннями системи
                            </p>
                        </div>

                        {/* Apply Page A tabs styling */}
                        <Tabs defaultValue="profile" className="w-full">
                            <TabsList className="grid w-full grid-cols-4 mb-8 bg-white border-b border-b-gray-200 rounded-none p-0">
                                <TabsTrigger 
                                    value="profile" 
                                    className="flex items-center gap-3 px-6 py-4 rounded-none transition-all duration-200 hover:bg-gray-50 hover:text-gray-700 data-[state=active]:bg-[#344CB7] data-[state=active]:text-white data-[state=active]:font-semibold"
                                >
                                    <User className="w-5 h-5" />
                                    <span className="hidden sm:inline font-medium">Профіль</span>
                                </TabsTrigger>
                                <TabsTrigger 
                                    value="notifications" 
                                    className="flex items-center gap-3 px-6 py-4 rounded-none transition-all duration-200 hover:bg-gray-50 hover:text-gray-700 data-[state=active]:bg-[#344CB7] data-[state=active]:text-white data-[state=active]:font-semibold"
                                >
                                    <Bell className="w-5 h-5" />
                                    <span className="hidden sm:inline font-medium">Сповіщення</span>
                                </TabsTrigger>
                                <TabsTrigger 
                                    value="security" 
                                    className="flex items-center gap-3 px-6 py-4 rounded-none transition-all duration-200 hover:bg-gray-50 hover:text-gray-700 data-[state=active]:bg-[#344CB7] data-[state=active]:text-white data-[state=active]:font-semibold"
                                >
                                    <Shield className="w-5 h-5" />
                                    <span className="hidden sm:inline font-medium">Безпека</span>
                                </TabsTrigger>
                                <TabsTrigger 
                                    value="preferences" 
                                    className="flex items-center gap-3 px-6 py-4 rounded-none transition-all duration-200 hover:bg-gray-50 hover:text-gray-700 data-[state=active]:bg-[#344CB7] data-[state=active]:text-white data-[state=active]:font-semibold"
                                >
                                    <SettingsIcon className="w-5 h-5" />
                                    <span className="hidden sm:inline font-medium">Налаштування</span>
                                </TabsTrigger>
                            </TabsList>

                            {/* Apply Page A card styling - Profile Tab */}
                            <TabsContent value="profile">
                                <Card className="bg-white rounded-none border-0 shadow-none">
                                    <CardHeader className="bg-white border-b border-b-gray-200 px-6 py-6">
                                        <CardTitle className="flex items-center gap-3 text-xl font-semibold text-gray-900">
                                            <div className="w-12 h-12 bg-[#344CB7] rounded-xl flex items-center justify-center">
                                                <User className="w-6 h-6 text-white" />
                                            </div>
                                            Профіль
                                        </CardTitle>
                                        <CardDescription className="text-gray-400 mt-2">
                                            Керуйте вашими особистими даними та податковою інформацією
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="p-6">
                                        <ProfileTab user={user as any} />
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* Apply Page A card styling - Notifications Tab */}
                            <TabsContent value="notifications">
                                <Card className="bg-white rounded-none border-0 shadow-none">
                                    <CardHeader className="bg-white border-b border-b-gray-200 px-6 py-6">
                                        <CardTitle className="flex items-center gap-3 text-xl font-semibold text-gray-900">
                                            <div className="w-12 h-12 bg-[#344CB7] rounded-xl flex items-center justify-center">
                                                <Bell className="w-6 h-6 text-white" />
                                            </div>
                                            Сповіщення
                                        </CardTitle>
                                        <CardDescription className="text-gray-400 mt-2">
                                            Налаштуйте канали сповіщень та періоди нагадувань
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="p-6">
                                        <NotificationsTab user={user as any} />
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* Apply Page A card styling - Security Tab */}
                            <TabsContent value="security">
                                <Card className="bg-white rounded-none border-0 shadow-none">
                                    <CardHeader className="bg-white border-b border-b-gray-200 px-6 py-6">
                                        <CardTitle className="flex items-center gap-3 text-xl font-semibold text-gray-900">
                                            <div className="w-12 h-12 bg-[#344CB7] rounded-xl flex items-center justify-center">
                                                <Shield className="w-6 h-6 text-white" />
                                            </div>
                                            Безпека
                                        </CardTitle>
                                        <CardDescription className="text-gray-400 mt-2">
                                            Керуйте паролем та налаштуваннями безпеки облікового запису
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="p-6">
                                        <SecurityTab />
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* Apply Page A card styling - Preferences Tab */}
                            <TabsContent value="preferences">
                                <Card className="bg-white rounded-none border-0 shadow-none">
                                    <CardHeader className="bg-white border-b border-b-gray-200 px-6 py-6">
                                        <CardTitle className="flex items-center gap-3 text-xl font-semibold text-gray-900">
                                            <div className="w-12 h-12 bg-[#344CB7] rounded-xl flex items-center justify-center">
                                                <SettingsIcon className="w-6 h-6 text-white" />
                                            </div>
                                            Налаштування
                                        </CardTitle>
                                        <CardDescription className="text-gray-400 mt-2">
                                            Персоналізуйте інтерфейс та мову системи
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="p-6">
                                        <PreferencesTab user={user as any} />
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </>
    );
}
