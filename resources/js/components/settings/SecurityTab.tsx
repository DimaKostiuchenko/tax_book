import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export default function SecurityTab() {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Success/Error Messages */}
            {recentlySuccessful && (
                <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>Пароль успішно змінено</AlertDescription>
                </Alert>
            )}

            {errors.current_password && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{errors.current_password}</AlertDescription>
                </Alert>
            )}

            {errors.password && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{errors.password}</AlertDescription>
                </Alert>
            )}

            {/* Current Password */}
            <div className="space-y-2">
                <Label htmlFor="current_password">Поточний пароль *</Label>
                <div className="relative">
                    <Input
                        id="current_password"
                        type={showCurrentPassword ? 'text' : 'password'}
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        className={errors.current_password ? 'border-red-500' : ''}
                    />
                    <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                        {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                </div>
            </div>

            {/* New Password */}
            <div className="space-y-2">
                <Label htmlFor="password">Новий пароль *</Label>
                <div className="relative">
                    <Input
                        id="password"
                        type={showNewPassword ? 'text' : 'password'}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        className={errors.password ? 'border-red-500' : ''}
                    />
                    <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                        {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                </div>
                <p className="text-sm text-gray-500">
                    Пароль повинен містити мінімум 8 символів
                </p>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
                <Label htmlFor="password_confirmation">Підтвердження пароля *</Label>
                <div className="relative">
                    <Input
                        id="password_confirmation"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        className={errors.password_confirmation ? 'border-red-500' : ''}
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                </div>
                {errors.password_confirmation && (
                    <p className="text-sm text-red-500">{errors.password_confirmation}</p>
                )}
            </div>

            {/* Password Requirements */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Вимоги до пароля:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Мінімум 8 символів</li>
                    <li>• Рекомендується використовувати літери, цифри та спеціальні символи</li>
                    <li>• Уникайте використання особистої інформації</li>
                </ul>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
                <Button type="submit" disabled={processing}>
                    {processing ? 'Зміна пароля...' : 'Змінити пароль'}
                </Button>
            </div>
        </form>
    );
}
