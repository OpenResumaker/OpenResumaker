/**
 * Resume 编辑器集成 Hook
 * 简化编辑器与状态管理的集成，让编辑器组件无需知道具体的状态管理实现
 */
import { useResumeActions } from '@/hooks/useResumeActions';
import type { BasicInfo, ListItem, TextContent, TimelineItem } from '@/types/resume';
import type { DateFormat } from '@/lib/dateUtils';

/**
 * 为 Resume 编辑器提供统一的状态管理集成
 */
export const useResumeEditor = (sectionId: string) => {
  const { updateSection } = useResumeActions();

  /**
   * 处理时间线编辑器的保存
   */
  const handleTimelineSave = (data: TimelineItem[], iconName?: string, dateFormat?: DateFormat) => {
    updateSection(sectionId, data, iconName, dateFormat);
  };

  /**
   * 处理列表编辑器的保存
   */
  const handleListSave = (data: ListItem[], iconName?: string) => {
    updateSection(sectionId, data, iconName);
  };

  /**
   * 处理文本编辑器的保存
   */
  const handleTextSave = (data: TextContent, iconName?: string) => {
    updateSection(sectionId, data, iconName);
  };

  /**
   * 处理基本信息编辑器的保存
   */
  const handleBasicInfoSave = (data: BasicInfo) => {
    updateSection(sectionId, data);
  };

  return {
    handleTimelineSave,
    handleListSave,
    handleTextSave,
    handleBasicInfoSave,
  };
};
