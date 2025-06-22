import React from 'react';
import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';

interface AlertProps {
  type?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Alert({ type = 'info', title, children, className = '' }: AlertProps) {
  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
  };

  const colors = {
    success: 'bg-catppuccin-green/10 border-catppuccin-green text-catppuccin-green',
    error: 'bg-catppuccin-red/10 border-catppuccin-red text-catppuccin-red',
    warning: 'bg-catppuccin-yellow/10 border-catppuccin-yellow text-catppuccin-yellow',
    info: 'bg-catppuccin-blue/10 border-catppuccin-blue text-catppuccin-blue',
  };

  const iconColors = {
    success: 'text-catppuccin-green',
    error: 'text-catppuccin-red',
    warning: 'text-catppuccin-yellow',
    info: 'text-catppuccin-blue',
  };

  const Icon = icons[type];

  return (
    <div className={`border rounded-md p-4 ${colors[type]} ${className}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon className={`h-5 w-5 ${iconColors[type]}`} />
        </div>
        <div className="ml-3">
          {title && (
            <h3 className="text-sm font-medium mb-1">{title}</h3>
          )}
          <div className="text-sm">{children}</div>
        </div>
      </div>
    </div>
  );
}