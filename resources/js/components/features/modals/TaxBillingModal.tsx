"use client";

import { AppModal } from "@/components/features/modals/AppModal";
import { TaxForm } from "@/components/forms/tax/TaxForm";
import { Button } from "@/components/ui/button";

interface TaxBillingModalProps {
  event: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TaxBillingModal({ event, open, onOpenChange }: TaxBillingModalProps) {
  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Tax Billing"
      description={`Pay for ${event.title}`}
      footer={
        <>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" form="tax-form">
            Generate Receipt
          </Button>
        </>
      }
    >
      <TaxForm event={event} onSuccess={() => onOpenChange(false)} />
    </AppModal>
  );
}
