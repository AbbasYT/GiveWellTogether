import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-catppuccin-text">
          {label}
        </label>
      )}
      <input
        className={`block w-full px-3 py-2 border border-catppuccin-overlay0 rounded-md shadow-sm placeholder-catppuccin-overlay1 bg-catppuccin-surface0 text-catppuccin-text focus:outline-none focus:ring-catppuccin-mauve focus:border-catppuccin-mauve sm:text-sm ${
          error ? 'border-catppuccin-red focus:ring-catppuccin-red focus:border-catppuccin-red' : ''
        } ${className}`}
        {...props}
      />
      {error && (
        <p className="text-sm text-catppuccin-red">{error}</p>
      )}
    </div>
  );
}