// components/dashboard/SettingsCard.tsx
import { LucideIcon } from 'lucide-react';

interface SettingsCardProps {
  title: string;
  children: React.ReactNode;
  icon?: LucideIcon;
  tag?: string;
  description?: string;
  className?: string;
}

export default function SettingsCard({
  title,
  children,
  icon: Icon,
  tag,
  description,
  className = ''
}: SettingsCardProps) {
  return (
    <div className={`dashboard-card ${className}`}>
      <div className="card-header">
        {Icon && <Icon className="text-primary" size={20} />}
        <div>
          <h3 className="card-title">{title}</h3>
          {tag && <span className="card-tag">{tag}</span>}
        </div>
      </div>
      {description && (
        <p className="text-sm text-light/70 mb-4">{description}</p>
      )}
      {children}
    </div>
  );
}
