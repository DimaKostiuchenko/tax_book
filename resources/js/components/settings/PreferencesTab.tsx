import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle } from 'lucide-react';

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
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Success Message */}
            {recentlySuccessful && (
                <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>Налаштування збережено</AlertDescription>
                </Alert>
            )}

            {/* Language Selection */}
            <div className="space-y-2">
                <Label htmlFor="language">Мова інтерфейсу *</Label>
                <Select
                    value={data.language}
                    onValueChange={(value) => setData('language', value as 'uk' | 'en')}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Оберіть мову" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="uk">Українська</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                </Select>
                <p className="text-sm text-gray-500">
                    Мова буде застосована до всього інтерфейсу системи
                </p>
            </div>

            {/* Theme Selection */}
            <div className="space-y-2">
                <Label htmlFor="theme">Тема інтерфейсу *</Label>
                <Select
                    value={data.theme}
                    onValueChange={(value) => setData('theme', value as 'light' | 'dark' | 'system')}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Оберіть тему" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Світла</SelectItem>
                        <SelectItem value="dark">Темна</SelectItem>
                        <SelectItem value="system">Системна</SelectItem>
                    </SelectContent>
                </Select>
                <p className="text-sm text-gray-500">
                    Системна тема автоматично використовує налаштування вашої операційної системи
                </p>
            </div>

            {/* Timezone Selection */}
            <div className="space-y-2">
                <Label htmlFor="timezone">Часовий пояс *</Label>
                <Select
                    value={data.timezone}
                    onValueChange={(value) => setData('timezone', value)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Оберіть часовий пояс" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Europe/Kyiv">Київ (UTC+2/+3)</SelectItem>
                        <SelectItem value="Europe/London">Лондон (UTC+0/+1)</SelectItem>
                        <SelectItem value="Europe/Paris">Париж (UTC+1/+2)</SelectItem>
                        <SelectItem value="America/New_York">Нью-Йорк (UTC-5/-4)</SelectItem>
                        <SelectItem value="America/Los_Angeles">Лос-Анджелес (UTC-8/-7)</SelectItem>
                        <SelectItem value="Asia/Tokyo">Токіо (UTC+9)</SelectItem>
                        <SelectItem value="Australia/Sydney">Сідней (UTC+10/+11)</SelectItem>
                    </SelectContent>
                </Select>
                <p className="text-sm text-gray-500">
                    Часовий пояс використовується для відображення дат та часу в системі
                </p>
            </div>

            {/* Theme Preview */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Попередній перегляд теми:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                        <div className="w-full h-20 bg-white border border-gray-300 rounded-lg mb-2 flex items-center justify-center">
                            <span className="text-gray-900">Світла</span>
                        </div>
                        <p className="text-sm text-gray-600">Світла тема</p>
                    </div>
                    <div className="text-center">
                        <div className="w-full h-20 bg-gray-900 border border-gray-700 rounded-lg mb-2 flex items-center justify-center">
                            <span className="text-white">Темна</span>
                        </div>
                        <p className="text-sm text-gray-600">Темна тема</p>
                    </div>
                    <div className="text-center">
                        <div className="w-full h-20 bg-gradient-to-r from-white to-gray-900 border border-gray-300 rounded-lg mb-2 flex items-center justify-center">
                            <span className="text-gray-900">Системна</span>
                        </div>
                        <p className="text-sm text-gray-600">Системна тема</p>
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
                <Button type="submit" disabled={processing}>
                    {processing ? 'Збереження...' : 'Зберегти зміни'}
                </Button>
            </div>
        </form>
    );
}
