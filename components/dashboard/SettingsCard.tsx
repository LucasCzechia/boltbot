// components/dashboard/SettingsCard.tsx
import { LucideIcon } from 'lucide-react';

interface SettingsCardProps {
  title: string;
  children: React.ReactNode;
  icon?: LucideIcon;
  tag?: string;
  className?: string;
  cardClassName?: string;
}

export default function SettingsCard({
  title,
  children,
  icon: Icon,
  tag,
  className = '',
  cardClassName = ''
}: SettingsCardProps) {
  return (
    <div className={`bg-gray-800/50 border border-primary/10 rounded-xl p-6 transition-all hover:border-primary/20 ${cardClassName}`}>
      <div className="flex items-center gap-3 mb-4">
        {Icon && <Icon className="text-primary" size={20} />}
        <h3 className="text-lg font-medium text-primary">{title}</h3>
        {tag && (
          <span className="px-2 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full">
            {tag}
          </span>
        )}
      </div>
      <div className={className}>
        {children}
      </div>
    </div>
  );
} 
