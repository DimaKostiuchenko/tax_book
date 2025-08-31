import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertCircle, Send } from 'lucide-react';

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
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Success/Error Messages */}
            {recentlySuccessful && (
                <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>Налаштування сповіщень оновлено</AlertDescription>
                </Alert>
            )}

            {/* Email Notifications */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium">Email сповіщення</h3>
                <div className="flex items-center space-x-2">
                    <Checkbox id="email_enabled" checked={true} disabled />
                    <Label htmlFor="email_enabled">Email сповіщення (завжди увімкнені)</Label>
                </div>
                <p className="text-sm text-gray-500">
                    Важливі сповіщення про податкові події будуть надсилатися на ваш email
                </p>
            </div>

            {/* Telegram Notifications */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium">Telegram сповіщення</h3>
                
                {user.telegram_connected ? (
                    <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-sm text-green-600">Telegram бот підключено</span>
                        </div>
                        <div className="flex space-x-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => sendTestNotification('telegram')}
                                disabled={processing}
                            >
                                <Send className="w-4 h-4 mr-2" />
                                Надіслати тест
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={disconnectTelegram}
                                disabled={processing}
                            >
                                Відключити
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                            <span className="text-sm text-gray-600">Telegram бот не підключено</span>
                        </div>
                        <Button
                            type="button"
                            onClick={connectTelegram}
                            disabled={processing}
                        >
                            Підключити Telegram бот
                        </Button>
                        <p className="text-sm text-gray-500">
                            Отримуйте сповіщення прямо в Telegram
                        </p>
                    </div>
                )}
            </div>

            {/* Viber Notifications */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium">Viber сповіщення</h3>
                <div className="space-y-2">
                    <Label htmlFor="viber_phone">Номер Viber</Label>
                    <Input
                        id="viber_phone"
                        value={data.viber_phone}
                        onChange={(e) => setData('viber_phone', e.target.value)}
                        placeholder="+380XXXXXXXXX"
                        className={errors.viber_phone ? 'border-red-500' : ''}
                    />
                    {errors.viber_phone && <p className="text-sm text-red-500">{errors.viber_phone}</p>}
                    <p className="text-sm text-gray-500">Формат: +380XXXXXXXXX</p>
                </div>
                
                {data.viber_phone && (
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => sendTestNotification('viber')}
                        disabled={processing}
                    >
                        <Send className="w-4 h-4 mr-2" />
                        Надіслати тест
                    </Button>
                )}
            </div>

            {/* Reminder Lead Time */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium">Періоди нагадувань</h3>
                <p className="text-sm text-gray-500">
                    Оберіть, за скільки днів до події надсилати нагадування
                </p>
                
                <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="reminder_7"
                            checked={data.reminder_lead_time.includes(7)}
                            onCheckedChange={(checked) => handleReminderChange(7, checked as boolean)}
                        />
                        <Label htmlFor="reminder_7">7 днів перед подією</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="reminder_3"
                            checked={data.reminder_lead_time.includes(3)}
                            onCheckedChange={(checked) => handleReminderChange(3, checked as boolean)}
                        />
                        <Label htmlFor="reminder_3">3 дні перед подією</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="reminder_1"
                            checked={data.reminder_lead_time.includes(1)}
                            onCheckedChange={(checked) => handleReminderChange(1, checked as boolean)}
                        />
                        <Label htmlFor="reminder_1">1 день перед подією</Label>
                    </div>
                </div>
                
                {errors.reminder_lead_time && (
                    <p className="text-sm text-red-500">{errors.reminder_lead_time}</p>
                )}
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
