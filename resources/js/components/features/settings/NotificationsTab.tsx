import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/forms/fields/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { NotificationCard, StatusIndicator, ActionButton } from '@/components/features/dashboard/components/notification-card';
import { CheckCircle } from 'lucide-react';

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
                <Alert className="border-green-200 bg-green-50 text-green-800 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <AlertDescription className="font-medium">Налаштування сповіщень оновлено</AlertDescription>
                </Alert>
            )}

            {/* Email Notifications */}
            <NotificationCard
                title="Email сповіщення"
                description="Важливі сповіщення про податкові події будуть надсилатися на ваш email"
            >
                <div className="space-y-4">
                    <StatusIndicator 
                        isConnected={true} 
                        label="Email сповіщення завжди увімкнені" 
                    />
                </div>
            </NotificationCard>

            {/* Telegram Notifications */}
            <NotificationCard
                title="Telegram сповіщення"
                description="Отримуйте сповіщення прямо в Telegram"
            >
                <div className="space-y-4">
                    <StatusIndicator 
                        isConnected={!!user.telegram_connected} 
                        label={user.telegram_connected ? "Telegram бот підключено" : "Telegram бот не підключено"} 
                    />
                    <ActionButton
                        variant={user.telegram_connected ? "danger" : "primary"}
                        onClick={user.telegram_connected ? disconnectTelegram : connectTelegram}
                        disabled={processing}
                    >
                        {user.telegram_connected ? "Відключити" : "Включити"}
                    </ActionButton>
                </div>
            </NotificationCard>

            {/* Viber Notifications */}
            <NotificationCard
                title="Viber сповіщення"
                description="Отримуйте сповіщення на ваш Viber"
            >
                <div className="space-y-4">
                    <StatusIndicator 
                        isConnected={!!data.viber_phone} 
                        label={data.viber_phone ? "Viber налаштовано" : "Viber не налаштовано"} 
                    />
                    <Input
                        label="Номер Viber"
                        value={data.viber_phone}
                        onChange={(e) => setData('viber_phone', e.target.value)}
                        placeholder="+380XXXXXXXXX"
                        error={errors.viber_phone}
                    />
                </div>
            </NotificationCard>

            {/* Reminder Lead Time */}
            <NotificationCard
                title="Періоди нагадувань"
                description="Оберіть, за скільки днів до події надсилати нагадування"
            >
                <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                        <Checkbox
                            id="reminder_7"
                            checked={data.reminder_lead_time.includes(7)}
                            onCheckedChange={(checked) => handleReminderChange(7, checked as boolean)}
                            className="w-5 h-5"
                        />
                        <Label htmlFor="reminder_7" className="text-base font-medium text-gray-900">7 днів перед подією</Label>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                        <Checkbox
                            id="reminder_3"
                            checked={data.reminder_lead_time.includes(3)}
                            onCheckedChange={(checked) => handleReminderChange(3, checked as boolean)}
                            className="w-5 h-5"
                        />
                        <Label htmlFor="reminder_3" className="text-base font-medium text-gray-900">3 дні перед подією</Label>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                        <Checkbox
                            id="reminder_1"
                            checked={data.reminder_lead_time.includes(1)}
                            onCheckedChange={(checked) => handleReminderChange(1, checked as boolean)}
                            className="w-5 h-5"
                        />
                        <Label htmlFor="reminder_1" className="text-base font-medium text-gray-900">1 день перед подією</Label>
                    </div>
                </div>
                
                {errors.reminder_lead_time && (
                    <p className="text-base text-red-600 font-medium mt-4">{errors.reminder_lead_time}</p>
                )}
            </NotificationCard>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
                <Button 
                    type="submit" 
                    disabled={processing}
                    className="bg-[#344CB7] text-white rounded-lg px-6 py-2 h-10 font-medium"
                >
                    {processing ? 'Збереження...' : 'Зберегти зміни'}
                </Button>
            </div>
        </form>
    );
}
