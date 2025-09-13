/**
 * 日期输入组件 - 使用年月日分离的文本输入框
 */
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';
import { Select } from './select';
import { useState, useEffect, useCallback } from 'react';
import { 
  DATE_FORMATS, 
  type DateFormat, 
  formatDateDisplay, 
  migrateToISODate, 
  parseISODate,
  combineToISODate,
  validateYearInput,
  validateMonthInput,
  validateDayInput
} from '@/lib/dateUtils';

interface DatePickerProps {
  value?: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
  format?: DateFormat;
  onFormatChange?: (format: DateFormat) => void;
  showFormatSelector?: boolean;
}

export const DatePicker = ({
  value = '',
  onChange,
  label,
  className = '',
  format = 'dash-month',
  onFormatChange,
  showFormatSelector = false,
}: DatePickerProps) => {
  const [currentFormat, setCurrentFormat] = useState<DateFormat>(format);
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');

  // 获取当前格式的配置
  const currentFormatConfig = DATE_FORMATS.find(f => f.value === currentFormat) || DATE_FORMATS[0];

  // 同步外部格式变化
  useEffect(() => {
    setCurrentFormat(format);
  }, [format]);

  // 同步外部值变化
  useEffect(() => {
    if (value) {
      // 先迁移数据到 ISO 格式
      const migratedValue = migrateToISODate(value);
      
      // 如果值发生了迁移，通知父组件
      if (migratedValue !== value) {
        onChange(migratedValue);
        return;
      }
      
      // 解析 ISO 格式到年月日
      const parts = parseISODate(migratedValue);
      setYear(parts.year);
      setMonth(parts.month);
      setDay(parts.day);
    } else {
      setYear('');
      setMonth('');
      setDay('');
    }
  }, [value, onChange]);

  // 当年月日改变时，组合成 ISO 格式并通知父组件
  const handleDatePartsChange = useCallback(() => {
    const isoDate = combineToISODate(year, month, day, currentFormatConfig.hasDay);
    if (isoDate !== value) {
      onChange(isoDate);
    }
  }, [year, month, day, currentFormatConfig.hasDay, value, onChange]);

  useEffect(() => {
    // 只有当year或month有值时才触发更新，避免空值时的无限循环
    if (year || month || day) {
      handleDatePartsChange();
    }
  }, [year, month, day, currentFormatConfig.hasDay, handleDatePartsChange]);

  const handleFormatChange = (newFormat: string) => {
    const format = newFormat as DateFormat;
    setCurrentFormat(format);
    onFormatChange?.(format);
  };

  const handleClear = useCallback(() => {
    setYear('');
    setMonth('');
    setDay('');
    onChange('');
  }, [onChange]);


  // 获取预览显示
  const getPreviewText = (): string => {
    if (!year || !month) return '';
    return formatDateDisplay(combineToISODate(year, month, day, currentFormatConfig.hasDay), currentFormat);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && <Label className="text-sm font-medium text-gray-700">{label}</Label>}

      {/* 格式选择器 */}
      {showFormatSelector && (
        <div className="space-y-1">
          <Label className="text-xs text-gray-500">日期格式</Label>
          <Select
            value={currentFormat}
            onValueChange={handleFormatChange}
            options={DATE_FORMATS.map(f => ({ value: f.value, label: f.label }))}
            className="text-sm"
          />
        </div>
      )}

      {/* 年月日输入框 */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          {/* 年份输入 */}
          <div className="flex-1">
            <Label className="text-xs text-gray-500">年</Label>
            <Input
              type="number"
              value={year}
              onChange={(e) => {
                const value = e.target.value;
                // 限制年份最多4位数
                if (validateYearInput(value)) {
                  setYear(value);
                }
              }}
              placeholder="2025"
              className="text-center"
              max="9999"
              min="1"
            />
          </div>

          {/* 月份输入 */}
          <div className="flex-1">
            <Label className="text-xs text-gray-500">月</Label>
            <Input
              type="number"
              value={month}
              onChange={(e) => {
                const value = e.target.value;
                // 限制月份最多2位数
                if (validateMonthInput(value)) {
                  setMonth(value);
                }
              }}
              placeholder="01"
              min="1"
              max="12"
              className="text-center"
            />
          </div>

          {/* 日期输入（条件显示） */}
          {currentFormatConfig.hasDay && (
            <div className="flex-1">
              <Label className="text-xs text-gray-500">日</Label>
              <Input
                type="number"
                value={day}
                onChange={(e) => {
                  const value = e.target.value;
                  // 限制日期最多2位数
                  if (validateDayInput(value)) {
                    setDay(value);
                  }
                }}
                placeholder="01"
                min="1"
                max="31"
                className="text-center"
              />
            </div>
          )}

          {/* 清除按钮 */}
          {(year || month || day) && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="h-8 w-8 p-0 mb-1 hover:bg-gray-100 text-gray-400 hover:text-gray-600 self-end"
            >
              ×
            </Button>
          )}
        </div>

        {/* 预览显示 */}
        {getPreviewText() && (
          <div className="text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded border">
            <span className="text-xs text-gray-500">预览：</span>
            <span className="ml-2 font-medium">{getPreviewText()}</span>
          </div>
        )}
      </div>
    </div>
  );
};
