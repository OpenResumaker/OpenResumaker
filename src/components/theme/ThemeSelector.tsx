import { Button } from '@/components/ui/base/button.tsx';
import { LayoutGrid } from 'lucide-react';

interface LayoutSelectorProps {
  onLayoutChange: (layout: 'side-by-side' | 'top-bottom') => void;
}
/**
 *  todo: 未来可能支持其他主题，暂时没用
 */

export const LayoutSelector = ({ onLayoutChange }: LayoutSelectorProps) => {
  return (
    <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
      <Button
        onClick={() => onLayoutChange('top-bottom')}
        size="sm"
        className="flex items-center space-x-2 px-3 py-1.5 text-xs transition-all bg-blue-600 text-white shadow-sm hover:bg-blue-700"
      >
        <LayoutGrid className="h-3 w-3" />
        <span className="hidden sm:inline">简约主题</span>
      </Button>
    </div>
  );
};
