/**
 * 基本信息组件业务逻辑 Hook - 优化版本
 * 直接使用状态管理，无需层层传递回调函数
 */
import { IconRenderer } from '@/components/ui/advanced/IconPicker.tsx';
import { useResumeEditor } from '@/hooks/components/useResumeEditor';
import type { BasicInfo } from '@/types/resume';
import { useState } from 'react';

export const useBasicInfoSection = (sectionId: string) => {
  const [isEditing, setIsEditing] = useState(false);
  const { handleBasicInfoSave } = useResumeEditor(sectionId);

  // 开始编辑
  const startEditing = () => {
    setIsEditing(true);
  };

  // 关闭编辑
  const closeEditing = () => {
    setIsEditing(false);
  };

  // 保存数据 - 直接调用状态管理
  const handleSave = (newData: BasicInfo) => {
    handleBasicInfoSave(newData);
  };

  // 格式化性别和年龄显示
  const formatGenderAge = (gender?: string, age?: string) => {
    if (gender && age) {
      return `${gender} | ${age}岁`;
    }
    return gender || (age ? `${age}岁` : '');
  };

  // 格式化自定义字段显示
  const formatCustomFields = (
    customFields?: {
      id: string;
      label: string;
      value: string;
      iconName?: string;
    }[]
  ) => {
    if (!customFields || customFields.length === 0) return '';

    return customFields.map((field) => (
      <span className="flex items-center gap-1" key={field.id}>
        {field.iconName && <IconRenderer iconName={field.iconName} className="w-4 h-4" />}
        {field.label} {field.value}
      </span>
    ));
  };

  // 检查字段是否有值
  const hasValue = (value?: string) => {
    return value && value.trim() !== '';
  };

  return {
    isEditing,
    startEditing,
    closeEditing,
    handleSave,
    formatGenderAge,
    formatCustomFields,
    hasValue,
  };
};
