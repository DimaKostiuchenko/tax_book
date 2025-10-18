import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { NotificationCard } from '@/components/features/dashboard/components/notification-card';
import { Toggle } from '@/components/forms/fields/toggle';
import { Input } from '@/components/forms/fields/input';
import { VerificationModal } from '@/components/ui/verification-modal';
import { CheckCircle, Mail, Phone, MessageSquare } from 'lucide-react';
import { useState } from 'react';

interface User {
    email?: string;
    phone?: string;
    telegram_connected?: boolean;
    telegram_chat_id?: string;
    viber_phone?: string;
    reminder_lead_time?: number[];
    email_notifications?: boolean;
    telegram_notifications?: boolean;
    viber_notifications?: boolean;
    reminder_notifications?: boolean;
}

interface NotificationsTabProps {
    user: User;
}

export default function NotificationsTab({ user }: NotificationsTabProps) {
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        email_notifications: user.email_notifications || false,
        telegram_notifications: user.telegram_notifications || false,
        viber_notifications: user.viber_notifications || false,
        reminder_notifications: user.reminder_notifications || false,
        email: user.email || '',
        phone: user.phone || '',
    });

    // State for modal and contact verification
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<'email' | 'telegram' | 'viber' | null>(null);
    const [inputValue, setInputValue] = useState('');
    const [emailVerified, setEmailVerified] = useState(!!user.email);
    const [telegramVerified, setTelegramVerified] = useState(!!user.phone);
    const [viberVerified, setViberVerified] = useState(!!user.phone);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('settings.notifications'));
    };

    // Handle toggle changes
    const handleEmailToggle = (checked: boolean) => {
        if (checked && !emailVerified) {
            setModalType('email');
            setInputValue(user.email || '');
            setShowModal(true);
        } else {
            setData('email_notifications', checked);
        }
    };

    const handleTelegramToggle = (checked: boolean) => {
        if (checked && !telegramVerified) {
            setModalType('telegram');
            setInputValue(user.phone || '');
            setShowModal(true);
        } else {
            setData('telegram_notifications', checked);
        }
    };

    const handleViberToggle = (checked: boolean) => {
        if (checked && !viberVerified) {
            setModalType('viber');
            setInputValue(user.phone || '');
            setShowModal(true);
        } else {
            setData('viber_notifications', checked);
        }
    };

    // Handle modal approval
    const handleModalApproval = () => {
        if (!modalType) return;

        switch (modalType) {
            case 'email':
                setEmailVerified(true);
                setData('email_notifications', true);
                break;
            case 'telegram':
                setTelegramVerified(true);
                setData('telegram_notifications', true);
                break;
            case 'viber':
                setViberVerified(true);
                setData('viber_notifications', true);
                break;
        }

        setShowModal(false);
        setModalType(null);
        setInputValue('');
    };

    // Handle modal close
    const handleModalClose = () => {
        setShowModal(false);
        setModalType(null);
        setInputValue('');
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
            <NotificationCard>
                <div className="space-y-4">
                    <Toggle
                        label="Увімкнути Email сповіщення"
                        tooltip="Важливі сповіщення про податкові події будуть надсилатися на ваш email"
                        description="Ви будете отримувати сповіщення про важливі події"
                        checked={data.email_notifications || false}
                        onChange={handleEmailToggle}
                    />
                    {data.email_notifications && emailVerified && (
                        <div className="space-y-3">

                            <Input
                                label="Email адрес"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="your@email.com"
                                error={errors.email}
                            />
                        </div>
                    )}
                </div>
            </NotificationCard>

            {/* Telegram Notifications */}
            <NotificationCard>
                <div className="space-y-4">
                    <Toggle
                        label="Увімкнути Telegram сповіщення"
                        tooltip="Отримувати сповіщення прямо в Telegram"
                        description="Ви будете отримувати сповіщення в Telegram боті"
                        checked={data.telegram_notifications || false}
                        onChange={handleTelegramToggle}
                    />
                    {data.telegram_notifications && telegramVerified && (
                        <div className="space-y-3">

                            <Input
                                label="Номер телефону"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                placeholder="+380XXXXXXXXX"
                                error={errors.phone}
                            />
                        </div>
                    )}
                </div>
            </NotificationCard>

            {/* Viber Notifications */}
            <NotificationCard>
                <div className="space-y-4">
                    <Toggle
                        label="Увімкнути Viber сповіщення"
                        tooltip="Отримувати сповіщення на ваш Viber"
                        description="Ви будете отримувати сповіщення на Viber"
                        checked={data.viber_notifications || false}
                        onChange={handleViberToggle}
                    />
                    {data.viber_notifications && viberVerified && (
                        <div className="space-y-3">

                            <Input
                                label="Номер телефону"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                placeholder="+380XXXXXXXXX"
                                error={errors.phone}
                            />
                        </div>
                    )}
                </div>
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

            {/* Verification Modal */}
            <VerificationModal
                isOpen={showModal}
                onClose={handleModalClose}
                onApprove={handleModalApproval}
                title={
                    modalType === 'email' ? 'Підтвердження Email' :
                        modalType === 'telegram' ? 'Підтвердження Telegram' :
                            modalType === 'viber' ? 'Підтвердження Viber' : ''
                }
                description={
                    modalType === 'email' ? 'Введіть ваш email адрес для отримання сповіщень:' :
                        modalType === 'telegram' ? 'Введіть ваш номер телефону для отримання сповіщень в Telegram:' :
                            modalType === 'viber' ? 'Введіть ваш номер телефону для отримання сповіщень в Viber:' : ''
                }
                inputLabel={
                    modalType === 'email' ? 'Email адрес' :
                        modalType === 'telegram' ? 'Номер телефону' :
                            modalType === 'viber' ? 'Номер телефону' : ''
                }
                inputPlaceholder={
                    modalType === 'email' ? 'your@email.com' :
                        modalType === 'telegram' ? '+380XXXXXXXXX' :
                            modalType === 'viber' ? '+380XXXXXXXXX' : ''
                }
                inputValue={inputValue}
                onInputChange={setInputValue}
            />
        </form>
    );
}
