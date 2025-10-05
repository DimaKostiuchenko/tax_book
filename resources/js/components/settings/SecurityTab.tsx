import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertCircle, Eye, EyeOff, Lock, Shield, Key } from 'lucide-react';
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
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Success/Error Messages */}
            {recentlySuccessful && (
                <Alert className="border-green-200 bg-green-50 text-green-800 rounded-xl">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <AlertDescription className="font-medium">Пароль успішно змінено</AlertDescription>
                </Alert>
            )}

            {errors.current_password && (
                <Alert variant="destructive" className="rounded-xl">
                    <AlertCircle className="h-5 w-5" />
                    <AlertDescription>{errors.current_password}</AlertDescription>
                </Alert>
            )}

            {errors.password && (
                <Alert variant="destructive" className="rounded-xl">
                    <AlertCircle className="h-5 w-5" />
                    <AlertDescription>{errors.password}</AlertDescription>
                </Alert>
            )}

            {/* Current Password */}
            <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#344CB7] rounded-lg flex items-center justify-center">
                        <Lock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <Label htmlFor="current_password" className="text-lg font-semibold text-gray-900">Поточний пароль *</Label>
                        <p className="text-base text-gray-500">Введіть ваш поточний пароль для підтвердження</p>
                    </div>
                </div>
                <div className="relative">
                    <Input
                        id="current_password"
                        type={showCurrentPassword ? 'text' : 'password'}
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        className={`h-12 text-base border-2 rounded-xl transition-colors ${
                            errors.current_password ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-red-500'
                        }`}
                    />
                    <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {/* New Password */}
            <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#344CB7] rounded-lg flex items-center justify-center">
                        <Key className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <Label htmlFor="password" className="text-lg font-semibold text-gray-900">Новий пароль *</Label>
                        <p className="text-base text-gray-500">Створіть новий надійний пароль</p>
                    </div>
                </div>
                <div className="relative">
                    <Input
                        id="password"
                        type={showNewPassword ? 'text' : 'password'}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        className={`h-12 text-base border-2 rounded-xl transition-colors ${
                            errors.password ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                        }`}
                    />
                    <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                </div>
                <p className="text-base text-blue-700 font-medium">
                    Пароль повинен містити мінімум 8 символів
                </p>
            </div>

            {/* Confirm Password */}
            <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#344CB7] rounded-lg flex items-center justify-center">
                        <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <Label htmlFor="password_confirmation" className="text-lg font-semibold text-gray-900">Підтвердження пароля *</Label>
                        <p className="text-base text-gray-500">Повторіть новий пароль для перевірки</p>
                    </div>
                </div>
                <div className="relative">
                    <Input
                        id="password_confirmation"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        className={`h-12 text-base border-2 rounded-xl transition-colors ${
                            errors.password_confirmation ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                        }`}
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                </div>
                {errors.password_confirmation && (
                    <p className="text-base text-red-600 font-medium">{errors.password_confirmation}</p>
                )}
            </div>

            {/* Password Requirements */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-[#344CB7] rounded-lg flex items-center justify-center">
                        <Shield className="w-4 h-4 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-blue-900">Вимоги до пароля:</h4>
                </div>
                <ul className="text-base text-blue-800 space-y-2 ml-11">
                    <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        Мінімум 8 символів
                    </li>
                    <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        Рекомендується використовувати літери, цифри та спеціальні символи
                    </li>
                    <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        Уникайте використання особистої інформації
                    </li>
                </ul>
            </div>

            {/* Submit Button - Apply Page A styling */}
            <div className="flex justify-end pt-6">
                <Button 
                    type="submit" 
                    disabled={processing}
                    className="bg-[#344CB7] text-white rounded-full px-6 py-2 font-semibold"
                >
                    {processing ? 'Зміна пароля...' : 'Змінити пароль'}
                </Button>
            </div>
        </form>
    );
}
