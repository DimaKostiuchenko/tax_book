import { useForm } from '@inertiajs/react';
import { Select } from '@/components/app/select';
import { FormAlert } from '@/components/app/form-alert';
import { SubmitButton } from '@/components/app/submit-button';
import { 
  LANGUAGE_OPTIONS, 
  THEME_OPTIONS, 
  TIMEZONE_OPTIONS 
} from '@/lib/constants/form-options';
import type { User } from '@/types/forms';

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
                <FormAlert type="success" message="Налаштування збережено" />
            )}

            {/* Language Selection */}
            <div className="space-y-4">
                <div className="mb-4">
                    <label htmlFor="language" className="text-lg font-semibold text-gray-900">Мова інтерфейсу *</label>
                    <p className="text-base text-gray-500">Оберіть мову для відображення системи</p>
                </div>
                <Select
                    label=""
                    value={data.language}
                    onValueChange={(value) => setData('language', value as 'uk' | 'en')}
                    placeholder="Оберіть мову"
                    options={LANGUAGE_OPTIONS}
                />
                <p className="text-base text-blue-700 font-medium">
                    Мова буде застосована до всього інтерфейсу системи
                </p>
            </div>

            {/* Theme Selection */}
            <div className="space-y-4">
                <div className="mb-4">
                    <label htmlFor="theme" className="text-lg font-semibold text-gray-900">Тема інтерфейсу *</label>
                    <p className="text-base text-gray-500">Персоналізуйте зовнішній вигляд системи</p>
                </div>
                <Select
                    label=""
                    value={data.theme}
                    onValueChange={(value) => setData('theme', value as 'light' | 'dark' | 'system')}
                    placeholder="Оберіть тему"
                    options={THEME_OPTIONS}
                />
                <p className="text-base text-purple-700 font-medium">
                    Системна тема автоматично використовує налаштування вашої операційної системи
                </p>
            </div>

            {/* Timezone Selection */}
            <div className="space-y-4">
                <div className="mb-4">
                    <label htmlFor="timezone" className="text-lg font-semibold text-gray-900">Часовий пояс *</label>
                    <p className="text-base text-gray-500">Для правильного відображення часу та дат</p>
                </div>
                <Select
                    label=""
                    value={data.timezone}
                    onValueChange={(value) => setData('timezone', value)}
                    placeholder="Оберіть часовий пояс"
                    options={TIMEZONE_OPTIONS}
                />
                <p className="text-base text-emerald-700 font-medium">
                    Часовий пояс використовується для відображення дат та часу в системі
                </p>
            </div>

            {/* Theme Preview */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 border-2 border-gray-200 rounded-2xl p-6">
                <div className="mb-6">
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
                        <p className="text-base text-gray-600 font-medium">Світла тема</p>
                    </div>
                    <div className="text-center">
                        <div className="w-full h-24 bg-gray-900 border-2 border-gray-700 rounded-xl mb-3 flex items-center justify-center shadow-lg">
                            <div className="flex items-center gap-2">
                                <Moon className="w-5 h-5 text-blue-400" />
                                <span className="text-white font-medium">Темна</span>
                            </div>
                        </div>
                        <p className="text-base text-gray-600 font-medium">Темна тема</p>
                    </div>
                    <div className="text-center">
                        <div className="w-full h-24 bg-gradient-to-r from-white via-gray-100 to-gray-900 border-2 border-gray-300 rounded-xl mb-3 flex items-center justify-center shadow-lg">
                            <div className="flex items-center gap-2">
                                <Monitor className="w-5 h-5 text-gray-600" />
                                <span className="text-gray-900 font-medium">Системна</span>
                            </div>
                        </div>
                        <p className="text-base text-gray-600 font-medium">Системна тема</p>
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <SubmitButton processing={processing}>
                {processing ? 'Збереження...' : 'Зберегти зміни'}
            </SubmitButton>
        </form>
    );
}
