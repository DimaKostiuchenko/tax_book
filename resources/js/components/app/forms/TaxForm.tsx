"use client";

import { useForm } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface TaxFormProps {
  event: {
    id: number;
    title: string;
    amount: number;
    user?: { name?: string; taxId?: string; email?: string };
  };
  onSuccess?: () => void; // optional callback after submission
}

export function TaxForm({ event, onSuccess }: TaxFormProps) {
  const { data, setData, post, processing, errors } = useForm({
    fullName: event.user?.name || "",
    taxId: event.user?.taxId || "",
    email: event.user?.email || "",
    amount: event.amount || 0,
    eventId: event.id,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route("tax.receipt.store"), {
      onSuccess: () => {
        onSuccess?.(); // close modal or show toast
      },
    });
  };

  return (
    <form id="tax-form" onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          name="fullName"
          value={data.fullName}
          onChange={e => setData("fullName", e.target.value)}
        />
        {errors.fullName && <p className="text-sm text-red-500">{errors.fullName}</p>}
      </div>

      <div>
        <Label htmlFor="taxId">Tax ID</Label>
        <Input
          id="taxId"
          name="taxId"
          value={data.taxId}
          onChange={e => setData("taxId", e.target.value)}
        />
        {errors.taxId && <p className="text-sm text-red-500">{errors.taxId}</p>}
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={data.email}
          onChange={e => setData("email", e.target.value)}
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
      </div>

      <div>
        <Label htmlFor="amount">Amount</Label>
        <Input id="amount" name="amount" type="number" value={data.amount} disabled />
      </div>
    </form>
  );
}
