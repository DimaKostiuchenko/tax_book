import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface User {
    name: string;
    email: string;
    user_type?: 'fop' | 'legal_entity';
    tin?: string;
    edrpou?: string;
    tax_regime?: 'single_tax_1' | 'single_tax_2' | 'single_tax_3' | 'general_system';
    vat_payer?: boolean;
    vat_number?: string;
    reporting_period?: 'monthly' | 'quarterly' | 'yearly';
    phone?: string;
}

interface ProfileTabProps {
    user: User;
}

export default function ProfileTab({ user }: ProfileTabProps) {
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        user_type: user.user_type || '',
        tin: user.tin || '',
        edrpou: user.edrpou || '',
        tax_regime: user.tax_regime || '',
        vat_payer: user.vat_payer || false,
        vat_number: user.vat_number || '',
        reporting_period: user.reporting_period || 'monthly',
        phone: user.phone || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('settings.profile'));
    };

    const isFOP = data.user_type === 'fop';
    const isLegalEntity = data.user_type === 'legal_entity';

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Success/Error Messages */}
            {recentlySuccessful && (
                <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>Профіль успішно оновлено</AlertDescription>
                </Alert>
            )}

            {errors.user_type && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{errors.user_type}</AlertDescription>
                </Alert>
            )}

            {/* User Type Selection */}
            <div className="space-y-2">
                <Label htmlFor="user_type">Тип користувача *</Label>
                <Select
                    value={data.user_type}
                    onValueChange={(value) => setData('user_type', value as 'fop' | 'legal_entity')}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Оберіть тип користувача" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="fop">ФОП (Фізична особа-підприємець)</SelectItem>
                        <SelectItem value="legal_entity">Юридична особа</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Conditional Fields Based on User Type */}
            {isFOP && (
                <div className="space-y-2">
                    <Label htmlFor="tin">ТИН (10 цифр) *</Label>
                    <Input
                        id="tin"
                        value={data.tin}
                        onChange={(e) => setData('tin', e.target.value)}
                        placeholder="1234567890"
                        maxLength={10}
                        className={errors.tin ? 'border-red-500' : ''}
                    />
                    {errors.tin && <p className="text-sm text-red-500">{errors.tin}</p>}
                </div>
            )}

            {isLegalEntity && (
                <div className="space-y-2">
                    <Label htmlFor="edrpou">ЄДРПОУ (8 цифр) *</Label>
                    <Input
                        id="edrpou"
                        value={data.edrpou}
                        onChange={(e) => setData('edrpou', e.target.value)}
                        placeholder="12345678"
                        maxLength={8}
                        className={errors.edrpou ? 'border-red-500' : ''}
                    />
                    {errors.edrpou && <p className="text-sm text-red-500">{errors.edrpou}</p>}
                </div>
            )}

            {/* Tax Regime */}
            <div className="space-y-2">
                <Label htmlFor="tax_regime">Податковий режим</Label>
                <Select
                    value={data.tax_regime}
                    onValueChange={(value) => setData('tax_regime', value as any)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Оберіть податковий режим" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="single_tax_1">Єдиний податок 1 група</SelectItem>
                        <SelectItem value="single_tax_2">Єдиний податок 2 група</SelectItem>
                        <SelectItem value="single_tax_3">Єдиний податок 3 група</SelectItem>
                        <SelectItem value="general_system">Загальна система</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* VAT Payer */}
            <div className="flex items-center space-x-2">
                <Checkbox
                    id="vat_payer"
                    checked={data.vat_payer}
                    onCheckedChange={(checked) => setData('vat_payer', checked as boolean)}
                />
                <Label htmlFor="vat_payer">Платник ПДВ</Label>
            </div>

            {/* VAT Number (conditional) */}
            {data.vat_payer && (
                <div className="space-y-2">
                    <Label htmlFor="vat_number">ПДВ номер *</Label>
                    <Input
                        id="vat_number"
                        value={data.vat_number}
                        onChange={(e) => setData('vat_number', e.target.value)}
                        placeholder="Введіть ПДВ номер"
                        className={errors.vat_number ? 'border-red-500' : ''}
                    />
                    {errors.vat_number && <p className="text-sm text-red-500">{errors.vat_number}</p>}
                </div>
            )}

            {/* Reporting Period */}
            <div className="space-y-2">
                <Label htmlFor="reporting_period">Період звітності *</Label>
                <Select
                    value={data.reporting_period}
                    onValueChange={(value) => setData('reporting_period', value as any)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Оберіть період звітності" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="monthly">Щомісячно</SelectItem>
                        <SelectItem value="quarterly">Щоквартально</SelectItem>
                        <SelectItem value="yearly">Щорічно</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
                <Label htmlFor="phone">Номер телефону</Label>
                <Input
                    id="phone"
                    value={data.phone}
                    onChange={(e) => setData('phone', e.target.value)}
                    placeholder="+380XXXXXXXXX"
                    className={errors.phone ? 'border-red-500' : ''}
                />
                {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                <p className="text-sm text-gray-500">Формат: +380XXXXXXXXX</p>
            </div>

            {/* Email (readonly) */}
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    value={user.email}
                    disabled
                    className="bg-gray-50"
                />
                <p className="text-sm text-gray-500">Email використовується для входу в систему</p>
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
