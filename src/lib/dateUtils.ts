/**
 * 日期相关的工具函数和常量
 */

// 日期格式选项
export const DATE_FORMATS = [
  { value: 'zh-full', label: 'xxxx年xx月xx日 (2024年01月15日)', hasDay: true },
  { value: 'zh-month', label: 'xxxx年xx月 (2024年01月)', hasDay: false },
  { value: 'dash-full', label: 'xxxx-xx-xx (2024-01-15)', hasDay: true },
  { value: 'dash-month', label: 'xxxx-xx (2024-01)', hasDay: false },
  { value: 'dot-full', label: 'xxxx.xx.xx (2024.01.15)', hasDay: true },
  { value: 'dot-month', label: 'xxxx.xx (2024.01)', hasDay: false },
] as const;

export type DateFormat = typeof DATE_FORMATS[number]['value'];

// 解析 ISO 日期字符串为年月日对象
interface DateParts {
  year: string;
  month: string;
  day: string;
}

const parseISODate = (isoDate: string): DateParts => {
  if (!isoDate) return { year: '', month: '', day: '' };
  
  const parts = isoDate.split('-');
  return {
    year: parts[0] || '',
    month: parts[1] || '',
    day: parts[2] || '01'
  };
};

// 将年月日组合为 ISO 格式字符串
const combineToISODate = (year: string, month: string, day: string, hasDay: boolean): string => {
  if (!year || !month) return '';
  
  const paddedMonth = month.padStart(2, '0');
  const paddedDay = day.padStart(2, '0');
  
  if (hasDay && day) {
    return `${year}-${paddedMonth}-${paddedDay}`;
  } else {
    return `${year}-${paddedMonth}`;
  }
};

// 统一的日期格式化函数
export const formatDateDisplay = (dateValue: string, formatType: DateFormat): string => {
  if (!dateValue) return '';
  
  const parts = parseISODate(dateValue);
  if (!parts.year || !parts.month) return '';
  
  const formatConfig = DATE_FORMATS.find(f => f.value === formatType);
  const year = parts.year;
  const month = parts.month.padStart(2, '0');
  const day = parts.day.padStart(2, '0');
  
  switch (formatType) {
    case 'zh-full':
      return `${year}年${month}月${day}日`;
    case 'zh-month':
      return `${year}年${month}月`;
    case 'dash-full':
      return `${year}-${month}-${day}`;
    case 'dash-month':
      return `${year}-${month}`;
    case 'dot-full':
      return `${year}.${month}.${day}`;
    case 'dot-month':
      return `${year}.${month}`;
    default:
      return formatConfig?.hasDay ? `${year}-${month}-${day}` : `${year}-${month}`;
  }
};

// 数据迁移函数：将旧格式的日期转换为 ISO 格式
export const migrateToISODate = (dateValue: string): string => {
  if (!dateValue) return '';
  
  // 如果已经是 ISO 格式，直接返回
  if (/^\d{4}-\d{2}(-\d{2})?$/.test(dateValue)) {
    return dateValue;
  }
  
  try {
    // 尝试解析各种可能的格式
    if (/\d{4}年\d{2}月(\d{2}日)?/.test(dateValue)) {
      const match = dateValue.match(/(\d{4})年(\d{2})月(\d{2})?日?/);
      if (match) {
        const [, year, month, day] = match;
        const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day) || 1);
        return date.toISOString().slice(0, 10);
      }
    }
    
    if (/\d{4}\.\d{2}(\.\d{2})?/.test(dateValue)) {
      const match = dateValue.match(/(\d{4})\.(\d{2})(?:\.(\d{2}))?/);
      if (match) {
        const [, year, month, day] = match;
        const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day) || 1);
        return date.toISOString().slice(0, 10);
      }
    }
    
    // 尝试直接解析
    const date = new Date(dateValue);
    if (!isNaN(date.getTime())) {
      return date.toISOString().slice(0, 10);
    }
    
    return dateValue;
  } catch {
    return dateValue;
  }
};

// 输入验证函数
export const validateYearInput = (value: string): boolean => {
  return value.length <= 4 && /^\d*$/.test(value);
};

export const validateMonthInput = (value: string): boolean => {
  return value.length <= 2 && /^\d*$/.test(value) && (value === '' || (parseInt(value) >= 1 && parseInt(value) <= 12));
};

export const validateDayInput = (value: string): boolean => {
  return value.length <= 2 && /^\d*$/.test(value) && (value === '' || (parseInt(value) >= 1 && parseInt(value) <= 31));
};

// 导出内部函数供 DatePicker 组件使用
export { parseISODate, combineToISODate };