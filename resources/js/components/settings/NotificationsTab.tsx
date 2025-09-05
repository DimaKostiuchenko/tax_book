import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertCircle, Send, Mail, MessageCircle, Smartphone, Clock } from 'lucide-react';

interface User {
    telegram_connected?: boolean;
    telegram_chat_id?: string;
    viber_phone?: string;
    reminder_lead_time?: number[];
}

interface NotificationsTabProps {
    user: User;
}

export default function NotificationsTab({ user }: NotificationsTabProps) {
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        viber_phone: user.viber_phone || '',
        reminder_lead_time: user.reminder_lead_time || [7, 3, 1],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('settings.notifications'));
    };

    const handleReminderChange = (days: number, checked: boolean) => {
        const current = data.reminder_lead_time;
        if (checked) {
            setData('reminder_lead_time', [...current, days]);
        } else {
            setData('reminder_lead_time', current.filter(d => d !== days));
        }
    };

    const sendTestNotification = (channel: string) => {
        post(route('settings.test-notification'), {
            data: { channel },
            preserveScroll: true,
        });
    };

    const connectTelegram = () => {
        post(route('settings.connect-telegram'), {
            preserveScroll: true,
        });
    };

    const disconnectTelegram = () => {
        post(route('settings.disconnect-telegram'), {
            preserveScroll: true,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Success/Error Messages */}
            {recentlySuccessful && (
                <Alert className="border-green-200 bg-green-50 text-green-800 rounded-xl">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <AlertDescription className="font-medium">Налаштування сповіщень оновлено</AlertDescription>
                </Alert>
            )}

            {/* Email Notifications */}
            <div className="space-y-6 p-6 bg-blue-50 rounded-2xl border border-blue-200">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                        <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900">Email сповіщення</h3>
                        <p className="text-blue-700">Важливі сповіщення про податкові події будуть надсилатися на ваш email</p>
                    </div>
                </div>
                <div className="flex items-center space-x-3 ml-16">
                    <Checkbox id="email_enabled" checked={true} disabled className="w-5 h-5" />
                    <Label htmlFor="email_enabled" className="text-lg font-medium text-gray-900">Email сповіщення (завжди увімкнені)</Label>
                </div>
            </div>

            {/* Telegram Notifications */}
            <div className="space-y-6 p-6 bg-green-50 rounded-2xl border border-green-200">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                        <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900">Telegram сповіщення</h3>
                        <p className="text-green-700">Отримуйте сповіщення прямо в Telegram</p>
                    </div>
                </div>
                
                {user.telegram_connected ? (
                    <div className="space-y-4 ml-16">
                        <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-lg font-medium text-green-700">Telegram бот підключено</span>
                        </div>
                        <div className="flex space-x-3">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => sendTestNotification('telegram')}
                                disabled={processing}
                                className="h-11 px-6 rounded-xl border-2 border-green-300 text-green-700 hover:bg-green-100 hover:border-green-400 transition-colors"
                            >
                                <Send className="w-4 h-4 mr-2" />
                                Надіслати тест
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={disconnectTelegram}
                                disabled={processing}
                                className="h-11 px-6 rounded-xl border-2 border-red-300 text-red-700 hover:bg-red-100 hover:border-red-400 transition-colors"
                            >
                                Відключити
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4 ml-16">
                        <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                            <span className="text-lg font-medium text-gray-600">Telegram бот не підключено</span>
                        </div>
                        <Button
                            type="button"
                            onClick={connectTelegram}
                            disabled={processing}
                            className="h-11 px-8 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                        >
                            Підключити Telegram бот
                        </Button>
                    </div>
                )}
            </div>

            {/* Viber Notifications */}
            <div className="space-y-6 p-6 bg-purple-50 rounded-2xl border border-purple-200">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-600 rounded-xl flex items-center justify-center">
                        <Smartphone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900">Viber сповіщення</h3>
                        <p className="text-purple-700">Отримуйте сповіщення на ваш Viber</p>
                    </div>
                </div>
                <div className="space-y-4 ml-16">
                    <div>
                        <Label htmlFor="viber_phone" className="text-lg font-medium text-gray-900">Номер Viber</Label>
                        <Input
                            id="viber_phone"
                            value={data.viber_phone}
                            onChange={(e) => setData('viber_phone', e.target.value)}
                            placeholder="+380XXXXXXXXX"
                            className={`h-12 text-base border-2 rounded-xl transition-colors ${
                                errors.viber_phone ? 'border-red-300 focus:border-red-500' : 'border-purple-300 focus:border-purple-500'
                            }`}
                        />
                        {errors.viber_phone && <p className="text-sm text-red-600 font-medium mt-2">{errors.viber_phone}</p>}
                        <p className="text-sm text-purple-700 mt-2">Формат: +380XXXXXXXXX</p>
                    </div>
                    
                    {data.viber_phone && (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => sendTestNotification('viber')}
                            disabled={processing}
                            className="h-11 px-6 rounded-xl border-2 border-purple-300 text-purple-700 hover:bg-purple-100 hover:border-purple-400 transition-colors"
                        >
                            <Send className="w-4 h-4 mr-2" />
                            Надіслати тест
                        </Button>
                    )}
                </div>
            </div>

            {/* Reminder Lead Time */}
            <div className="space-y-6 p-6 bg-amber-50 rounded-2xl border border-amber-200">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                        <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900">Періоди нагадувань</h3>
                        <p className="text-amber-700">Оберіть, за скільки днів до події надсилати нагадування</p>
                    </div>
                </div>
                
                <div className="space-y-4 ml-16">
                    <div className="flex items-center space-x-3">
                        <Checkbox
                            id="reminder_7"
                            checked={data.reminder_lead_time.includes(7)}
                            onCheckedChange={(checked) => handleReminderChange(7, checked as boolean)}
                            className="w-5 h-5 border-2 border-amber-400 rounded-lg"
                        />
                        <Label htmlFor="reminder_7" className="text-lg font-medium text-gray-900">7 днів перед подією</Label>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                        <Checkbox
                            id="reminder_3"
                            checked={data.reminder_lead_time.includes(3)}
                            onCheckedChange={(checked) => handleReminderChange(3, checked as boolean)}
                            className="w-5 h-5 border-2 border-amber-400 rounded-lg"
                        />
                        <Label htmlFor="reminder_3" className="text-lg font-medium text-gray-900">3 дні перед подією</Label>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                        <Checkbox
                            id="reminder_1"
                            checked={data.reminder_lead_time.includes(1)}
                            onCheckedChange={(checked) => handleReminderChange(1, checked as boolean)}
                            className="w-5 h-5 border-2 border-amber-400 rounded-lg"
                        />
                        <Label htmlFor="reminder_1" className="text-lg font-medium text-gray-900">1 день перед подією</Label>
                    </div>
                </div>
                
                {errors.reminder_lead_time && (
                    <p className="text-sm text-red-600 font-medium ml-16">{errors.reminder_lead_time}</p>
                )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6">
                <Button 
                    type="submit" 
                    disabled={processing}
                    className="h-12 px-8 text-base font-semibold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                >
                    {processing ? 'Збереження...' : 'Зберегти зміни'}
                </Button>
            </div>
        </form>
    );
}
