import { useForm } from '@inertiajs/react';
import { Select } from '@/components/forms/fields/select';
import { ThemeCard } from '@/components/forms/fields/theme-card';
import { LabelWithTooltip } from '@/components/forms/fields/label-with-tooltip';
import { FormSection } from '@/components/forms/feedback/form-section';
import { FormAlert } from '@/components/forms/feedback/form-alert';
import { SubmitButton } from '@/components/forms/actions/submit-button';
import { 
  LANGUAGE_OPTIONS, 
  THEME_OPTIONS
} from '@/lib/constants/form-options';
import type { User } from '@/types/forms';

interface PreferencesTabProps {
    user: User;
}

export default function PreferencesTab({ user }: PreferencesTabProps) {
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        language: user.language || 'uk',
        theme: user.theme || 'system',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('settings.preferences'));
    };

    const handleThemeChange = (theme: 'light' | 'dark' | 'system') => {
        setData('theme', theme);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Success Message */}
            {recentlySuccessful && (
                <FormAlert type="success" message="Налаштування збережено" />
            )}

            {/* Language Selection */}
            <FormSection>
              
                <Select
                    label="Мова інтерфейсу *"
                    tooltip="Мова буде застосована до всього інтерфейсу системи"
                    value={data.language}
                    onValueChange={(value) => setData('language', value as 'uk' | 'en')}
                    placeholder="Оберіть мову"
                    options={LANGUAGE_OPTIONS}
                />
            </FormSection>

            {/* Theme Selection */}
            <FormSection>
                <LabelWithTooltip
                    htmlFor="theme"
                    label="Тема інтерфейсу *"
                    tooltip="Персоналізуйте зовнішній вигляд системи"
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <ThemeCard
                        theme="light"
                        isActive={data.theme === 'light'}
                        onClick={() => handleThemeChange('light')}
                    />
                    <ThemeCard
                        theme="dark"
                        isActive={data.theme === 'dark'}
                        onClick={() => handleThemeChange('dark')}
                    />
                    <ThemeCard
                        theme="system"
                        isActive={data.theme === 'system'}
                        onClick={() => handleThemeChange('system')}
                    />
                </div>
            </FormSection>

            {/* Submit Button */}
            <SubmitButton processing={processing}>
                {processing ? 'Збереження...' : 'Зберегти мову та тему'}
            </SubmitButton>
        </form>
    );
}
