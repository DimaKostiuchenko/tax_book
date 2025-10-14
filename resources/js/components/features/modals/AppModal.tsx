"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose, // <- Shadcn provides this
} from "@/components/ui/dialog";
import { X } from "lucide-react"; // optional icon
import { Button } from "@/components/ui/button";

interface AppModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function AppModal({ open, onOpenChange, title, description, children, footer }: AppModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg relative">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}

          {/* Close button */}
          <DialogClose asChild>
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 p-1"
            >
              <X className="w-4 h-4" />
            </Button>
          </DialogClose>
        </DialogHeader>

        <div className="py-4">{children}</div>

        {footer && <div className="pt-4">{footer}</div>}
      </DialogContent>
    </Dialog>
  );
}
