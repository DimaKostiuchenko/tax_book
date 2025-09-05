import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, Globe, Palette, Clock, Sun, Moon, Monitor } from 'lucide-react';

interface User {
    language?: 'uk' | 'en';
    theme?: 'light' | 'dark' | 'system';
    timezone?: string;
}

interface PreferencesTabProps {
    user: User;
}

export default function PreferencesTab({ user }: PreferencesTabProps) {
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        language: user.language || 'uk',
        theme: user.theme || 'system',
        timezone: user.timezone || 'Europe/Kyiv',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('settings.preferences'));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Success Message */}
            {recentlySuccessful && (
                <Alert className="border-green-200 bg-green-50 text-green-800 rounded-xl">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <AlertDescription className="font-medium">Налаштування збережено</AlertDescription>
                </Alert>
            )}

            {/* Language Selection */}
            <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                        <Globe className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <Label htmlFor="language" className="text-lg font-semibold text-gray-900">Мова інтерфейсу *</Label>
                        <p className="text-sm text-gray-500">Оберіть мову для відображення системи</p>
                    </div>
                </div>
                <Select
                    value={data.language}
                    onValueChange={(value) => setData('language', value as 'uk' | 'en')}
                >
                    <SelectTrigger className="h-12 text-base border-2 border-gray-200 rounded-xl hover:border-blue-300 focus:border-blue-500 transition-colors">
                        <SelectValue placeholder="Оберіть мову" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value="uk" className="text-base py-3">🇺🇦 Українська</SelectItem>
                        <SelectItem value="en" className="text-base py-3">🇬🇧 English</SelectItem>
                    </SelectContent>
                </Select>
                <p className="text-sm text-blue-700 font-medium">
                    Мова буде застосована до всього інтерфейсу системи
                </p>
            </div>

            {/* Theme Selection */}
            <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <Palette className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <Label htmlFor="theme" className="text-lg font-semibold text-gray-900">Тема інтерфейсу *</Label>
                        <p className="text-sm text-gray-500">Персоналізуйте зовнішній вигляд системи</p>
                    </div>
                </div>
                <Select
                    value={data.theme}
                    onValueChange={(value) => setData('theme', value as 'light' | 'dark' | 'system')}
                >
                    <SelectTrigger className="h-12 text-base border-2 border-gray-200 rounded-xl hover:border-purple-300 focus:border-purple-500 transition-colors">
                        <SelectValue placeholder="Оберіть тему" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value="light" className="text-base py-3 flex items-center gap-2">
                            <Sun className="w-4 h-4" /> Світла
                        </SelectItem>
                        <SelectItem value="dark" className="text-base py-3 flex items-center gap-2">
                            <Moon className="w-4 h-4" /> Темна
                        </SelectItem>
                        <SelectItem value="system" className="text-base py-3 flex items-center gap-2">
                            <Monitor className="w-4 h-4" /> Системна
                        </SelectItem>
                    </SelectContent>
                </Select>
                <p className="text-sm text-purple-700 font-medium">
                    Системна тема автоматично використовує налаштування вашої операційної системи
                </p>
            </div>

            {/* Timezone Selection */}
            <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                        <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <Label htmlFor="timezone" className="text-lg font-semibold text-gray-900">Часовий пояс *</Label>
                        <p className="text-sm text-gray-500">Для правильного відображення часу та дат</p>
                    </div>
                </div>
                <Select
                    value={data.timezone}
                    onValueChange={(value) => setData('timezone', value)}
                >
                    <SelectTrigger className="h-12 text-base border-2 border-gray-200 rounded-xl hover:border-emerald-300 focus:border-emerald-500 transition-colors">
                        <SelectValue placeholder="Оберіть часовий пояс" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value="Europe/Kyiv" className="text-base py-3">🇺🇦 Київ (UTC+2/+3)</SelectItem>
                        <SelectItem value="Europe/London" className="text-base py-3">🇬🇧 Лондон (UTC+0/+1)</SelectItem>
                        <SelectItem value="Europe/Paris" className="text-base py-3">🇫🇷 Париж (UTC+1/+2)</SelectItem>
                        <SelectItem value="America/New_York" className="text-base py-3">🇺🇸 Нью-Йорк (UTC-5/-4)</SelectItem>
                        <SelectItem value="America/Los_Angeles" className="text-base py-3">🇺🇸 Лос-Анджелес (UTC-8/-7)</SelectItem>
                        <SelectItem value="Asia/Tokyo" className="text-base py-3">🇯🇵 Токіо (UTC+9)</SelectItem>
                        <SelectItem value="Australia/Sydney" className="text-base py-3">🇦🇺 Сідней (UTC+10/+11)</SelectItem>
                    </SelectContent>
                </Select>
                <p className="text-sm text-emerald-700 font-medium">
                    Часовий пояс використовується для відображення дат та часу в системі
                </p>
            </div>

            {/* Theme Preview */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 border-2 border-gray-200 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                        <Palette className="w-4 h-4 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900">Попередній перегляд теми:</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                        <div className="w-full h-24 bg-white border-2 border-gray-300 rounded-xl mb-3 flex items-center justify-center shadow-lg">
                            <div className="flex items-center gap-2">
                                <Sun className="w-5 h-5 text-yellow-500" />
                                <span className="text-gray-900 font-medium">Світла</span>
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 font-medium">Світла тема</p>
                    </div>
                    <div className="text-center">
                        <div className="w-full h-24 bg-gray-900 border-2 border-gray-700 rounded-xl mb-3 flex items-center justify-center shadow-lg">
                            <div className="flex items-center gap-2">
                                <Moon className="w-5 h-5 text-blue-400" />
                                <span className="text-white font-medium">Темна</span>
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 font-medium">Темна тема</p>
                    </div>
                    <div className="text-center">
                        <div className="w-full h-24 bg-gradient-to-r from-white via-gray-100 to-gray-900 border-2 border-gray-300 rounded-xl mb-3 flex items-center justify-center shadow-lg">
                            <div className="flex items-center gap-2">
                                <Monitor className="w-5 h-5 text-gray-600" />
                                <span className="text-gray-900 font-medium">Системна</span>
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 font-medium">Системна тема</p>
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6">
                <Button 
                    type="submit" 
                    disabled={processing}
                    className="h-12 px-8 text-base font-semibold bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                >
                    {processing ? 'Збереження...' : 'Зберегти зміни'}
                </Button>
            </div>
        </form>
    );
}
