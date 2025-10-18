import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/forms/fields/input';
import { X } from 'lucide-react';

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApprove: () => void;
  title: string;
  description: string;
  inputLabel: string;
  inputPlaceholder: string;
  inputValue: string;
  onInputChange: (value: string) => void;
  approveButtonText?: string;
  cancelButtonText?: string;
}

export function VerificationModal({
  isOpen,
  onClose,
  onApprove,
  title,
  description,
  inputLabel,
  inputPlaceholder,
  inputValue,
  onInputChange,
  approveButtonText = "Підтвердити",
  cancelButtonText = "Скасувати"
}: VerificationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <p className="text-gray-600 mb-4">
          {description}
        </p>
        
        <Input
          label={inputLabel}
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder={inputPlaceholder}
          className="mb-4"
        />
        
        <div className="flex gap-3 justify-end">
          <Button
            variant="outline"
            onClick={onClose}
          >
            {cancelButtonText}
          </Button>
          <Button
            onClick={onApprove}
            className="bg-[#344CB7] text-white"
          >
            {approveButtonText}
          </Button>
        </div>
      </div>
    </div>
  );
}
