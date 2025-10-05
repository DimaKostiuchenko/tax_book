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
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Success/Error Messages */}
            {recentlySuccessful && (
                <Alert className="border-green-200 bg-green-50 text-green-800 ">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <AlertDescription className="font-medium">Профіль успішно оновлено</AlertDescription>
                </Alert>
            )}

            {errors.user_type && (
                <Alert variant="destructive" className="">
                    <AlertCircle className="h-5 w-5" />
                    <AlertDescription>{errors.user_type}</AlertDescription>
                </Alert>
            )}

            {/* User Type Selection */}
            <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                
                    <div>
                        <Label htmlFor="user_type" className="text-lg font-semibold text-gray-900">Тип користувача *</Label>
                        <p className="text-gray-500">Оберіть тип вашого підприємства</p>
                    </div>
                </div>
                <Select
                    value={data.user_type}
                    onValueChange={(value) => setData('user_type', value as 'fop' | 'legal_entity')}
                >
                     <SelectTrigger className="h-12 border border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100 rounded-sm shadow-none hover:border-gray-400 focus:border-gray-400 focus:shadow-none transition-colors">
                         <SelectValue placeholder="Оберіть тип користувача" />
                     </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value="fop" className="py-3">ФОП (Фізична особа-підприємець)</SelectItem>
                        <SelectItem value="legal_entity" className="py-3">Юридична особа</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Conditional Fields Based on User Type */}
            {isFOP && (
                <div className="space-y-4 p-6 bg-blue-50 border-blue-200">
                    <div className="flex items-center gap-3 mb-4">
                        <Label htmlFor="tin" className="text-lg font-semibold text-gray-900">ТИН (10 цифр) *</Label>
                    </div>
                     <Input
                         id="tin"
                         value={data.tin}
                         onChange={(e) => setData('tin', e.target.value)}
                         placeholder="1234567890"
                         maxLength={10}
                         className={`h-12 border border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100 rounded-sm shadow-none transition-colors ${
                             errors.tin ? 'border-red-300 focus:border-red-400 focus:shadow-none' : 'focus:border-gray-400 focus:shadow-none'
                         }`}
                     />
                    {errors.tin && <p className="text-red-600 font-medium">{errors.tin}</p>}
                    <p className="text-blue-700">ТИН - це ваш індивідуальний податковий номер</p>
                </div>
            )}

            {isLegalEntity && (
                <div className="space-y-4 p-6 bg-green-50">
                <div className="flex items-center gap-3 mb-4">
                        <Label htmlFor="edrpou" className="text-lg font-semibold text-gray-900">ЄДРПОУ (8 цифр) *</Label>
                    </div>
                     <Input
                         id="edrpou"
                         value={data.edrpou}
                         onChange={(e) => setData('edrpou', e.target.value)}
                         placeholder="12345678"
                         maxLength={8}
                         className={`h-12 border border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 rounded-sm shadow-none transition-colors ${
                             errors.edrpou ? 'border-red-300 focus:border-red-400 focus:shadow-none' : 'focus:border-gray-400 focus:shadow-none'
                         }`}
                     />
                    {errors.edrpou && <p className="text-red-600 font-medium">{errors.edrpou}</p>}
                    <p className="text-green-700">ЄДРПОУ - це код юридичної особи в Україні</p>
                </div>
            )}

            {/* Tax Regime */}
            <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                    <div>
                        <Label htmlFor="tax_regime" className="text-lg font-semibold text-gray-900">Податковий режим</Label>
                        <p className="text-gray-500">Оберіть систему оподаткування</p>
                    </div>
                </div>
                <Select
                    value={data.tax_regime}
                    onValueChange={(value) => setData('tax_regime', value as any)}
                >
                     <SelectTrigger className="h-12 border border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 rounded-sm shadow-none hover:border-gray-400 focus:border-gray-400 focus:shadow-none transition-colors">
                         <SelectValue placeholder="Оберіть податковий режим" />
                     </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value="single_tax_1" className="py-3">Єдиний податок 1 група</SelectItem>
                        <SelectItem value="single_tax_2" className="py-3">Єдиний податок 2 група</SelectItem>
                        <SelectItem value="single_tax_3" className="py-3">Єдиний податок 3 група</SelectItem>
                        <SelectItem value="general_system" className="py-3">Загальна система</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* VAT Payer */}
            <div className="space-y-4 p-6 bg-amber-50 border border-amber-200">
                <div className="flex items-center space-x-3">
                    <Checkbox
                        id="vat_payer"
                        checked={data.vat_payer}
                        onCheckedChange={(checked) => setData('vat_payer', checked as boolean)}
                        className="w-5 h-5 border-2 border-amber-400"
                    />
                    <Label htmlFor="vat_payer" className="text-lg font-semibold text-gray-900">Платник ПДВ</Label>
                </div>
                <p className="text-amber-700 ml-8">Відмітьте, якщо ви є платником податку на додану вартість</p>
            </div>

            {/* VAT Number (conditional) */}
            {data.vat_payer && (
                <div className="space-y-4 p-6 bg-amber-50 border border-amber-200">
                    <Label htmlFor="vat_number" className="text-lg font-semibold text-gray-900">ПДВ номер *</Label>
                     <Input
                         id="vat_number"
                         value={data.vat_number}
                         onChange={(e) => setData('vat_number', e.target.value)}
                         placeholder="Введіть ПДВ номер"
                         className={`h-12 border border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 rounded-sm shadow-none transition-colors ${
                             errors.vat_number ? 'border-red-300 focus:border-red-400 focus:shadow-none' : 'focus:border-gray-400 focus:shadow-none'
                         }`}
                     />
                    {errors.vat_number && <p className="text-red-600 font-medium">{errors.vat_number}</p>}
                </div>
            )}

            {/* Reporting Period */}
            <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                    <div>
                        <Label htmlFor="reporting_period" className="text-lg font-semibold text-gray-900">Період звітності *</Label>
                        <p className="text-gray-500">Частота подачі податкових звітів</p>
                    </div>
                </div>
                <Select
                    value={data.reporting_period}
                    onValueChange={(value) => setData('reporting_period', value as any)}
                >
                     <SelectTrigger className="h-12 border border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 rounded-sm shadow-none hover:border-gray-400 focus:border-gray-400 focus:shadow-none transition-colors">
                         <SelectValue placeholder="Оберіть період звітності" />
                     </SelectTrigger>
                    <SelectContent className="">
                        <SelectItem value="monthly" className="py-3">Щомісячно</SelectItem>
                        <SelectItem value="quarterly" className="py-3">Щоквартально</SelectItem>
                        <SelectItem value="yearly" className="py-3">Щорічно</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Phone Number */}
            <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                    <div>
                        <Label htmlFor="phone" className="text-lg font-semibold text-gray-900">Номер телефону</Label>
                        <p className="text-gray-500">Для зв'язку та сповіщень</p>
                    </div>
                </div>
                 <Input
                     id="phone"
                     value={data.phone}
                     onChange={(e) => setData('phone', e.target.value)}
                     placeholder="+380XXXXXXXXX"
                     className={`h-12 border border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 rounded-sm shadow-none transition-colors ${
                         errors.phone ? 'border-red-300 focus:border-red-400 focus:shadow-none' : 'focus:border-gray-400 focus:shadow-none'
                     }`}
                 />
                {errors.phone && <p className="text-red-600 font-medium">{errors.phone}</p>}
                <p className="text-teal-700 font-medium">Формат: +380XXXXXXXXX</p>
            </div>

            {/* Email (readonly) */}
            <div className="space-y-4 p-6 bg-gray-50 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                    <div>
                        <Label htmlFor="email" className="text-lg font-semibold text-gray-900">Email</Label>
                        <p className="text-gray-500">Використовується для входу в систему</p>
                    </div>
                </div>
                 <Input
                     id="email"
                     value={user.email}
                     disabled
                     className="h-12 border border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 rounded-sm shadow-none text-gray-600 cursor-not-allowed"
                 />
            </div>

            {/* Submit Button - Apply Page A styling */}
            <div className="flex justify-end pt-6">
                <Button 
                    type="submit" 
                    disabled={processing}
                    className="bg-[#344CB7] text-white rounded-full px-6 py-2 font-semibold"
                >
                    {processing ? 'Збереження...' : 'Зберегти зміни'}
                </Button>
            </div>
        </form>
    );
}
