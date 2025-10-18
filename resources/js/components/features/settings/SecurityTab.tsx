import { useForm } from '@inertiajs/react';
import { PasswordInput } from '@/components/forms/fields/password-input';
import { PasswordRequirements } from '@/components/forms/fields/password-requirements';
import { FormAlert } from '@/components/forms/feedback/form-alert';
import { SubmitButton } from '@/components/forms/actions/submit-button';
import { usePasswordVisibility } from '@/hooks/use-password-visibility';

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
            {/* Success Message */}
            {recentlySuccessful && (
                <FormAlert type="success" message="Пароль успішно змінено" />
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
            <PasswordRequirements password={data.password} />

            {/* Submit Button */}
            <SubmitButton processing={processing}>
                {processing ? 'Зміна пароля...' : 'Змінити пароль'}
            </SubmitButton>
        </form>
    );
}
