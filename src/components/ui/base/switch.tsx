import * as React from 'react';
import { cn } from '@/lib/utils.ts';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  onCheckedChange?: (checked: boolean) => void;
  checkStatus?: boolean;
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, onCheckedChange, checkStatus, ...props }, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onCheckedChange?.(event.target.checked);
    };

    return (
      <label className="inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only" ref={ref} onChange={handleChange} {...props} />
        <div
          className={cn(
            'relative inline-flex h-6 w-11 items-center rounded-full duration-300 transition-colors outline-none',
            `bg-gray-200 ${checkStatus ? 'bg-blue-600' : ''}`,
            'disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
        >
          <span
            className={cn(
              'inline-block h-4 w-4 transform rounded-full bg-white duration-300 transition-transform',
              `translate-x-1 ${checkStatus ? 'translate-x-6' : ''}`
            )}
          />
        </div>
      </label>
    );
  }
);
Switch.displayName = 'Switch';

export { Switch };
