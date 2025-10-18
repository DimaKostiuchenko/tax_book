import { Sun, Moon, Monitor } from 'lucide-react';

interface ThemeCardProps {
  theme: 'light' | 'dark' | 'system';
  isActive: boolean;
  onClick: () => void;
}

const themeConfig = {
  light: {
    icon: Sun,
    iconColor: 'text-yellow-500',
    bgColor: 'bg-white',
    borderColor: 'border-gray-300',
    textColor: 'text-gray-900',
    label: 'Світла'
  },
  dark: {
    icon: Moon,
    iconColor: 'text-blue-400',
    bgColor: 'bg-gray-900',
    borderColor: 'border-gray-700',
    textColor: 'text-white',
    label: 'Темна'
  },
  system: {
    icon: Monitor,
    iconColor: 'text-gray-600',
    bgColor: 'bg-gradient-to-r from-white via-gray-100 to-gray-900',
    borderColor: 'border-gray-300',
    textColor: 'text-gray-900',
    label: 'Системна'
  }
};

export function ThemeCard({ theme, isActive, onClick }: ThemeCardProps) {
  const config = themeConfig[theme];
  const IconComponent = config.icon;

  return (
    <div 
      className={`w-full h-24 ${config.bgColor} border-1 ${config.borderColor} rounded-lg flex items-center justify-center cursor-pointer transition-all duration-200  ${
        isActive ? 'ring-2 ring-blue-500' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
        <IconComponent className={`w-5 h-5 ${config.iconColor}`} />
        <span className={`${config.textColor} font-medium`}>{config.label}</span>
      </div>
    </div>
  );
}
