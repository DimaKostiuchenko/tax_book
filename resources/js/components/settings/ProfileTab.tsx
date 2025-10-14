import { useForm } from '@inertiajs/react';
import { Input } from '@/components/app/input';
import { Select } from '@/components/app/select';
import { RadioGroup } from '@/components/app/radio-group';
import { FormAlert } from '@/components/app/form-alert';
import { SubmitButton } from '@/components/app/submit-button';
import { 
  USER_TYPE_OPTIONS, 
  TAX_REGIME_OPTIONS, 
  REPORTING_PERIOD_OPTIONS,
  YES_NO_OPTIONS 
} from '@/lib/constants/form-options';
import type { User } from '@/types/forms';

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
                <FormAlert type="success" message="Профіль успішно оновлено" />
            )}

            {errors.user_type && (
                <FormAlert type="error" message={errors.user_type} />
            )}

            {/* User Type Selection */}
            <Select
                label="Тип користувача"
                placeholder="Оберіть тип користувача"
                required
                value={data.user_type}
                onValueChange={(value) => setData('user_type', value as 'fop' | 'legal_entity')}
                options={USER_TYPE_OPTIONS}
                error={errors.user_type}
            />

            {/* Conditional Fields Based on User Type */}
            {isFOP && (
              
                    <Input
                        label="ТИН (10 цифр)"
                        required
                        value={data.tin}
                        onChange={(e) => setData('tin', e.target.value)}
                        placeholder="1234567890"
                        maxLength={10}
                        error={errors.tin}
                    />
                   
            )}

            {isLegalEntity && (
              
                    <Input
                        label="ЄДРПОУ (8 цифр)"
                        required
                        value={data.edrpou}
                        onChange={(e) => setData('edrpou', e.target.value)}
                        placeholder="12345678"
                        maxLength={8}
                        error={errors.edrpou}
                    />
                  
            )}

            {/* Tax Regime */}
            <Select
                label="Податковий режим"
                placeholder="Оберіть податковий режим"
                value={data.tax_regime}
                onValueChange={(value) => setData('tax_regime', value as any)}
                options={TAX_REGIME_OPTIONS}
            />

            {/* VAT Payer */}
            <RadioGroup
                label="Платник ПДВ"
                name="vat_payer"
                options={YES_NO_OPTIONS as any}
                value={data.vat_payer}
                onChange={(value) => setData('vat_payer', value)}
                orientation="vertical"
            />

            {/* VAT Number (conditional) */}
            {data.vat_payer && (
              
                    <Input
                        label="ПДВ номер"
                        required
                        value={data.vat_number}
                        onChange={(e) => setData('vat_number', e.target.value)}
                        placeholder="Введіть ПДВ номер"
                        error={errors.vat_number}
                    />
              
            )}

            {/* Reporting Period */}
            <Select
                label="Період звітності"
                placeholder="Оберіть період звітності"
                required
                value={data.reporting_period}
                onValueChange={(value) => setData('reporting_period', value as any)}
                options={REPORTING_PERIOD_OPTIONS}
            />

            {/* Phone Number */}
            <div className="space-y-4">
                <Input
                    label="Номер телефону"
                    description="Для зв'язку та сповіщень"
                    value={data.phone}
                    onChange={(e) => setData('phone', e.target.value)}
                    placeholder="+380XXXXXXXXX"
                    error={errors.phone}
                />
                {/* <p className="text-teal-700 font-medium">Формат: +380XXXXXXXXX</p> */}
            </div>
 
           
                <Input
                    label="Email"
                    description="Використовується для входу в систему"
                    value={user.email}
                    disabled
                />
        

            {/* Submit Button */}
            <SubmitButton processing={processing}>
                {processing ? 'Збереження...' : 'Зберегти зміни'}
            </SubmitButton>
        </form>
    );
}
