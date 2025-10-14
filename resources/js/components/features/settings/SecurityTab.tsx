import { useForm } from '@inertiajs/react';
import { PasswordInput } from '@/components/forms/fields/password-input';
import { FormAlert } from '@/components/forms/feedback/form-alert';
import { SubmitButton } from '@/components/forms/actions/submit-button';
import { usePasswordVisibility } from '@/hooks/use-password-visibility';
import { PASSWORD_REQUIREMENTS } from '@/lib/constants/form-options';

export default function SecurityTab() {
    const currentPassword = usePasswordVisibility();
    const newPassword = usePasswordVisibility();
    const confirmPassword = usePasswordVisibility();

    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('settings.security'));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Success/Error Messages */}
            {recentlySuccessful && (
                <FormAlert type="success" message="Пароль успішно змінено" />
            )}

            {errors.current_password && (
                <FormAlert type="error" message={errors.current_password} />
            )}

            {errors.password && (
                <FormAlert type="error" message={errors.password} />
            )}

            {/* Current Password */}
            <PasswordInput
                id="current_password"
                label="Поточний пароль *"
                tooltip="Введіть ваш поточний пароль для підтвердження"
                value={data.current_password}
                onChange={(e) => setData('current_password', e.target.value)}
                error={errors.current_password}
                visible={currentPassword.visible}
                onToggleVisibility={currentPassword.toggle}
            />

            {/* New Password */}
            <PasswordInput
                id="password"
                label="Новий пароль *"
                tooltip="Створіть новий надійний пароль"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                error={errors.password}
                visible={newPassword.visible}
                onToggleVisibility={newPassword.toggle}
            />

            {/* Confirm Password */}
            <PasswordInput
                id="password_confirmation"
                label="Підтвердження пароля *"
                tooltip="Повторіть новий пароль для перевірки"
                value={data.password_confirmation}
                onChange={(e) => setData('password_confirmation', e.target.value)}
                error={errors.password_confirmation}
                visible={confirmPassword.visible}
                onToggleVisibility={confirmPassword.toggle}
            />

            {/* Password Requirements */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6">
                <div className="mb-4">
                    <h4 className="text-lg font-semibold text-blue-900">Вимоги до пароля:</h4>
                </div>
                <ul className="text-base text-blue-800 space-y-2">
                    {PASSWORD_REQUIREMENTS.map((requirement, index) => (
                        <li key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            {requirement}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Submit Button */}
            <SubmitButton processing={processing}>
                {processing ? 'Зміна пароля...' : 'Змінити пароль'}
            </SubmitButton>
        </form>
    );
}
