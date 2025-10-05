import { type SharedData } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Mail, Lock, User, AlertCircle } from 'lucide-react';
import AuthSplitLayout from '@/layouts/auth/auth-split-layout';

export default function Register() {
    const { auth, errors } = usePage<SharedData>().props;
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { data, setData, post, processing, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        terms: false,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Register" />
            
            <AuthSplitLayout 
                title="Створіть новий обліковий запис"
                description="Заповніть форму для реєстрації"
            >
                {/* Social Registration Buttons */}
                <div className="space-y-3">
                    <Button
                        asChild
                        variant="outline"
                        className="w-full border-gray-200 hover:bg-gray-50 text-gray-700 font-medium py-3"
                    >
                        <Link href={route('auth.google')}>
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                <path
                                    fill="#4285F4"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="#EA4335"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            Зареєструватися через Google
                        </Link>
                    </Button>

                    <Button
                        asChild
                        variant="outline"
                        className="w-full border-gray-200 hover:bg-gray-50 text-gray-700 font-medium py-3"
                    >
                        <Link href={route('auth.facebook')}>
                            <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                            Зареєструватися через Facebook
                        </Link>
                    </Button>
                </div>

                {/* Divider */}
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-gray-500">або зареєструватися через</span>
                    </div>
                </div>

                {/* Error Alert */}
                {(errors.name || errors.email || errors.password) && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                            {errors.name || errors.email || errors.password}
                        </AlertDescription>
                    </Alert>
                )}

                {/* Registration Form */}
                <form onSubmit={submit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-base font-medium text-gray-700">
                            Ім'я
                        </Label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="pl-10 bg-gray-50 border-gray-200 focus:border-[#344CB7] focus:ring-[#344CB7]"
                                placeholder="Ваше ім'я"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-base font-medium text-gray-700">
                            Email
                        </Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="pl-10 bg-gray-50 border-gray-200 focus:border-[#344CB7] focus:ring-[#344CB7]"
                                placeholder="your@email.com"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-base font-medium text-gray-700">
                            Пароль
                        </Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="pl-10 pr-10 bg-gray-50 border-gray-200 focus:border-[#344CB7] focus:ring-[#344CB7]"
                                placeholder="••••••••"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password_confirmation" className="text-base font-medium text-gray-700">
                            Підтвердження пароля
                        </Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                                id="password_confirmation"
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                className="pl-10 pr-10 bg-gray-50 border-gray-200 focus:border-[#344CB7] focus:ring-[#344CB7]"
                                placeholder="••••••••"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-start space-x-2">
                        <input
                            type="checkbox"
                            id="terms"
                            checked={data.terms}
                            onChange={(e) => setData('terms', e.target.checked)}
                            className="mt-1 rounded border-gray-300 text-[#344CB7] focus:ring-[#344CB7]"
                            required
                        />
                        <label htmlFor="terms" className="text-base text-gray-600">
                            Я погоджуюся з{' '}
                            <Link
                                href="#"
                                className="text-[#344CB7] hover:text-[#577BC1] font-medium"
                            >
                                умовами використання
                            </Link>
                            {' '}та{' '}
                            <Link
                                href="#"
                                className="text-[#344CB7] hover:text-[#577BC1] font-medium"
                            >
                                політикою конфіденційності
                            </Link>
                        </label>
                    </div>

                    <Button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-[#344CB7] hover:bg-[#577BC1] text-white font-medium py-3 rounded-lg transition-colors"
                    >
                        {processing ? 'Реєстрація...' : 'Зареєструватися'}
                    </Button>
                </form>

                {/* Login Link */}
                <div className="text-center pt-4">
                    <p className="text-base text-gray-600">
                        Вже маєте обліковий запис?{' '}
                        <Link
                            href={route('login')}
                            className="font-medium text-[#344CB7] hover:text-[#577BC1]"
                        >
                            Увійти
                        </Link>
                    </p>
                </div>
            </AuthSplitLayout>
        </>
    );
}
