import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-text">
          {label}
        </label>
      )}
      <input
        className={`block w-full px-4 py-3 bg-surface0 border border-surface1 rounded-lg text-text placeholder-subtext0 focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent transition-all duration-200 ${
          error ? 'border-red focus:ring-red' : ''
        } ${className}`}
        {...props}
      />
      {error && (
        <p className="text-sm text-red">{error}</p>
      )}
    </div>
  );
}