import { Input } from '@/components/ui/base/input.tsx';
import { Label } from '@/components/ui/base/label.tsx';

interface BasicInfoFieldItemProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

export const BasicInfoFieldItem = ({
  id,
  label,
  type = 'text',
  value,
  placeholder,
  onChange,
}: BasicInfoFieldItemProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};
