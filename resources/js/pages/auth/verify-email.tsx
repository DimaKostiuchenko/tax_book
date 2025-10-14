import { type SharedData } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';
import AuthSplitLayout from '@/layouts/auth/auth-split-layout';

export default function VerifyEmail() {
    const { auth, status, errors } = usePage<SharedData>().props;

    const { post, processing } = useForm();

    const resendVerificationEmail = () => {
        post(route('verification.send'));
    };

    return (
        <>
            <Head title="Підтвердження Email" />
            
            <AuthSplitLayout 
                title="Підтвердження Email"
                description="Перевірте вашу email адресу для завершення реєстрації"
            >
                <Card className="w-full">
                    <CardHeader className="text-center">
                        <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                            <Mail className="w-8 h-8 text-blue-600" />
                        </div>
                        <CardTitle className="text-2xl font-semibold">
                            Перевірте вашу email адресу
                        </CardTitle>
                        <CardDescription className="text-base">
                            Ми надіслали посилання для підтвердження на адресу{' '}
                            <span className="font-medium text-gray-900">{auth.user?.email}</span>
                        </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                        {status && (
                            <Alert>
                                <CheckCircle className="h-4 w-4" />
                                <AlertDescription>{status}</AlertDescription>
                            </Alert>
                        )}

                        {errors.email && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>{errors.email}</AlertDescription>
                            </Alert>
                        )}

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h3 className="font-medium text-blue-900 mb-2">Що далі?</h3>
                            <ul className="text-base text-blue-800 space-y-1">
                                <li>• Перевірте вашу email скриньку</li>
                                <li>• Натисніть на посилання "Підтвердити Email"</li>
                                <li>• Якщо не бачите лист, перевірте папку "Спам"</li>
                                <li>• Посилання дійсне протягом 24 годин</li>
                            </ul>
                        </div>

                        <div className="space-y-4">
                            <Button
                                onClick={resendVerificationEmail}
                                disabled={processing}
                                className="w-full"
                            >
                                {processing ? 'Відправлення...' : 'Надіслати лист повторно'}
                            </Button>

                            <div className="text-center">
                                <p className="text-base text-gray-600">
                                    Не отримали лист?{' '}
                                    <button
                                        onClick={resendVerificationEmail}
                                        disabled={processing}
                                        className="text-blue-600 hover:text-blue-800 font-medium"
                                    >
                                        Надіслати ще раз
                                    </button>
                                </p>
                            </div>
                        </div>

                        <div className="border-t pt-4">
                            <div className="text-center">
                                <p className="text-base text-gray-600 mb-2">
                                    Хочете використати іншу email адресу?
                                </p>
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="text-base text-gray-500 hover:text-gray-700"
                                >
                                    Вийти та зареєструватися знову
                                </Link>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </AuthSplitLayout>
        </>
    );
}
