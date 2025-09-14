// src/components/app/modals/TaxBillingModal.tsx
import { AppModal } from "@/components/app/modals/AppModal";
import { TaxForm } from "@/components/app/forms/TaxForm";

export function TaxBillingModal({ event }) {
  return (
    <AppModal
      title="Tax Billing"
      description={`Pay for ${event.title}`}
      footer={null} // or custom buttons if needed
    >
      <TaxForm event={event} />
    </AppModal>
  );
}
