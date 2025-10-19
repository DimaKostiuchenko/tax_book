import { useForm } from '@inertiajs/react';
import { AppInput } from '@/components/forms/fields/app-input';
import { Select } from '@/components/forms/fields/select';
import { Toggle } from '@/components/forms/fields/toggle';
import { FormAlert } from '@/components/forms/feedback/form-alert';
import { SubmitButton } from '@/components/forms/actions/submit-button';
import { 
  USER_TYPE_OPTIONS, 
  TAX_REGIME_OPTIONS, 
  REPORTING_PERIOD_OPTIONS
} from '@/lib/constants/form-options';
import SettingsLayout from '@/layouts/settings-layout';
import type { User } from '@/types/forms';

interface ProfilePageProps {
    user: User;
}

export default function ProfilePage({ user }: ProfilePageProps) {
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
        post(route('settings.profile.update'));
    };

    const isFOP = data.user_type === 'fop';
    const isLegalEntity = data.user_type === 'legal_entity';

    return (
        <SettingsLayout 
            title="Профіль"
            description="Керуйте вашими особистими даними та податковою інформацією"
        >
            <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Success Message */}
                    {recentlySuccessful && (
                        <FormAlert type="success" message="Профіль успішно оновлено" />
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
                        <AppInput
                            label="ТИН (10 цифр)"
                            tooltip="Введіть 10-значний ідентифікаційний номер"
                            required
                            value={data.tin}
                            onChange={(e) => setData('tin', e.target.value)}
                            placeholder="1234567890"
                            maxLength={10}
                            error={errors.tin}
                        />
                    )}

                    {isLegalEntity && (
                        <AppInput
                            label="ЄДРПОУ (8 цифр)"
                            tooltip="Введіть 8-значний код Єдиного державного реєстру підприємств"
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
                        error={errors.tax_regime}
                    />

                    {/* VAT Payer */}
                    <Toggle
                        label="Платник ПДВ"
                        description="Чи є ви платником податку на додану вартість?"
                        checked={data.vat_payer}
                        onChange={(checked) => setData('vat_payer', checked)}
                    />

                    {/* VAT Number (conditional) */}
                    {data.vat_payer && (
                        <AppInput
                            label="ПДВ номер"
                            tooltip="Введіть номер платника податку на додану вартість"
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
                        error={errors.reporting_period}
                    />

                    {/* Phone Number */}
                    <AppInput
                        label="Номер телефону"
                        tooltip="Введіть номер телефону для зв'язку та сповіщень"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        placeholder="+380XXXXXXXXX"
                        error={errors.phone}
                    />

                    {/* Email (Read-only) */}
                    <AppInput
                        label="Email"
                        tooltip="Email використовується для входу в систему"
                        value={user.email}
                        onChange={() => {}}
                        disabled
                    />

                    {/* Submit Button */}
                    <SubmitButton processing={processing}>
                        {processing ? 'Збереження...' : 'Зберегти зміни'}
                    </SubmitButton>
                </form>
        </SettingsLayout>
    );
}
