import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import IconInfo from '@/components/common/icons/icon-info';

interface LabelWithTooltipProps {
  htmlFor: string;
  label: string;
  tooltip: string;
  className?: string;
}

export function LabelWithTooltip({ htmlFor, label, tooltip, className = '' }: LabelWithTooltipProps) {
  const hasTooltip = tooltip && tooltip.trim().length > 0;

  return (
    <div className={`mb-4 flex items-center gap-2 ${className}`}>
      <Label htmlFor={htmlFor} className="text-lg font-semibold text-gray-900">
        {label}
      </Label>
      {hasTooltip && (
        <Tooltip>
          <TooltipTrigger asChild>
            <button type="button" className="text-gray-900 hover:text-gray-600">
              <IconInfo size="md" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}

