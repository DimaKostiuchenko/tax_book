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
            
            <div className="container mx-auto py-8 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Налаштування
                        </h1>
                        <p className="text-gray-600">
                            Керуйте вашим профілем, сповіщеннями та налаштуваннями системи
                        </p>
                    </div>

                    {/* Settings Tabs */}
                    <Tabs defaultValue="profile" className="w-full">
                        <TabsList className="grid w-full grid-cols-4 mb-8">
                            <TabsTrigger value="profile" className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                <span className="hidden sm:inline">Профіль</span>
                            </TabsTrigger>
                            <TabsTrigger value="notifications" className="flex items-center gap-2">
                                <Bell className="w-4 h-4" />
                                <span className="hidden sm:inline">Сповіщення</span>
                            </TabsTrigger>
                            <TabsTrigger value="security" className="flex items-center gap-2">
                                <Shield className="w-4 h-4" />
                                <span className="hidden sm:inline">Безпека</span>
                            </TabsTrigger>
                            <TabsTrigger value="preferences" className="flex items-center gap-2">
                                <SettingsIcon className="w-4 h-4" />
                                <span className="hidden sm:inline">Налаштування</span>
                            </TabsTrigger>
                        </TabsList>

                        {/* Profile Tab */}
                        <TabsContent value="profile">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <User className="w-5 h-5" />
                                        Профіль
                                    </CardTitle>
                                    <CardDescription>
                                        Керуйте вашими особистими даними та податковою інформацією
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ProfileTab user={user} />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Notifications Tab */}
                        <TabsContent value="notifications">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Bell className="w-5 h-5" />
                                        Сповіщення
                                    </CardTitle>
                                    <CardDescription>
                                        Налаштуйте канали сповіщень та періоди нагадувань
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <NotificationsTab user={user} />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Security Tab */}
                        <TabsContent value="security">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Shield className="w-5 h-5" />
                                        Безпека
                                    </CardTitle>
                                    <CardDescription>
                                        Керуйте паролем та налаштуваннями безпеки облікового запису
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <SecurityTab />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Preferences Tab */}
                        <TabsContent value="preferences">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <SettingsIcon className="w-5 h-5" />
                                        Налаштування
                                    </CardTitle>
                                    <CardDescription>
                                        Персоналізуйте інтерфейс та мову системи
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <PreferencesTab user={user} />
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </>
    );
}
