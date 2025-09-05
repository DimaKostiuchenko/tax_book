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
            
            {/* Enhanced Background with Gradient */}
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
                <div className="container mx-auto py-12 px-4">
                    <div className="max-w-5xl mx-auto">
                        {/* Enhanced Header with Better Typography */}
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-6 shadow-lg">
                                <SettingsIcon className="w-8 h-8 text-white" />
                            </div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                Налаштування
                            </h1>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                                Керуйте вашим профілем, сповіщеннями та налаштуваннями системи
                            </p>
                        </div>

                        {/* Enhanced Settings Tabs with Better Styling */}
                        <Tabs defaultValue="profile" className="w-full">
                            <TabsList className="grid w-full grid-cols-4 mb-8 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-2 shadow-lg">
                                <TabsTrigger 
                                    value="profile" 
                                    className="flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-200 hover:bg-blue-50 hover:text-blue-700 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white data-[state=active]:shadow-md"
                                >
                                    <User className="w-5 h-5" />
                                    <span className="hidden sm:inline font-medium">Профіль</span>
                                </TabsTrigger>
                                <TabsTrigger 
                                    value="notifications" 
                                    className="flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-200 hover:bg-blue-50 hover:text-blue-700 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white data-[state=active]:shadow-md"
                                >
                                    <Bell className="w-5 h-5" />
                                    <span className="hidden sm:inline font-medium">Сповіщення</span>
                                </TabsTrigger>
                                <TabsTrigger 
                                    value="security" 
                                    className="flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-200 hover:bg-blue-50 hover:text-blue-700 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white data-[state=active]:shadow-md"
                                >
                                    <Shield className="w-5 h-5" />
                                    <span className="hidden sm:inline font-medium">Безпека</span>
                                </TabsTrigger>
                                <TabsTrigger 
                                    value="preferences" 
                                    className="flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-200 hover:bg-blue-50 hover:text-blue-700 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white data-[state=active]:shadow-md"
                                >
                                    <SettingsIcon className="w-5 h-5" />
                                    <span className="hidden sm:inline font-medium">Налаштування</span>
                                </TabsTrigger>
                            </TabsList>

                            {/* Profile Tab with Enhanced Card Design */}
                            <TabsContent value="profile">
                                <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden">
                                    <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100 px-8 py-8">
                                        <CardTitle className="flex items-center gap-3 text-2xl font-bold text-gray-900">
                                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                                                <User className="w-6 h-6 text-white" />
                                            </div>
                                            Профіль
                                        </CardTitle>
                                        <CardDescription className="text-lg text-gray-600 mt-2">
                                            Керуйте вашими особистими даними та податковою інформацією
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="p-8">
                                        <ProfileTab user={user} />
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* Notifications Tab with Enhanced Card Design */}
                            <TabsContent value="notifications">
                                <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden">
                                    <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-100 px-8 py-8">
                                        <CardTitle className="flex items-center gap-3 text-2xl font-bold text-gray-900">
                                            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                                                <Bell className="w-6 h-6 text-white" />
                                            </div>
                                            Сповіщення
                                        </CardTitle>
                                        <CardDescription className="text-lg text-gray-600 mt-2">
                                            Налаштуйте канали сповіщень та періоди нагадувань
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="p-8">
                                        <NotificationsTab user={user} />
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* Security Tab with Enhanced Card Design */}
                            <TabsContent value="security">
                                <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden">
                                    <CardHeader className="bg-gradient-to-r from-red-50 to-pink-50 border-b border-gray-100 px-8 py-8">
                                        <CardTitle className="flex items-center gap-3 text-2xl font-bold text-gray-900">
                                            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                                                <Shield className="w-6 h-6 text-white" />
                                            </div>
                                            Безпека
                                        </CardTitle>
                                        <CardDescription className="text-lg text-gray-600 mt-2">
                                            Керуйте паролем та налаштуваннями безпеки облікового запису
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="p-8">
                                        <SecurityTab />
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* Preferences Tab with Enhanced Card Design */}
                            <TabsContent value="preferences">
                                <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden">
                                    <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 border-b border-gray-100 px-8 py-8">
                                        <CardTitle className="flex items-center gap-3 text-2xl font-bold text-gray-900">
                                            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-500 rounded-xl flex items-center justify-center">
                                                <SettingsIcon className="w-6 h-6 text-white" />
                                            </div>
                                            Налаштування
                                        </CardTitle>
                                        <CardDescription className="text-lg text-gray-600 mt-2">
                                            Персоналізуйте інтерфейс та мову системи
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="p-8">
                                        <PreferencesTab user={user} />
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
