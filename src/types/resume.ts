import type { LucideIcon } from 'lucide-react';

export interface CustomField {
  id: string;
  label: string;
  value: string;
  icon?: string;
  iconName: string;
}

// 基础信息布局类型
export type BasicInfoLayout = 'center' | 'left' | 'right' | 'classic';

export interface BasicInfo {
  avatar?: string;
  name: string;
  email: string;
  phone: string;
  gender?: string;
  age?: string;
  location?: string;
  website?: string;
  customFields?: CustomField[];
  layout?: BasicInfoLayout; // 布局样式
}

export interface TimelineItem {
  id: string;
  title: string;
  subtitle?: string;
  secondarySubtitle?: string;
  startDate?: string;
  endDate?: string;
  description: string;
}

// 列表项类型
export interface ListItem {
  id: string;
  content: string;
}

// 纯文本内容类型
export interface TextContent {
  content: string;
}

export interface ResumeSection {
  id: string;
  title: string;
  iconName: string;
  type: 'basic' | 'timeline' | 'list' | 'text' | 'custom';
  editorType?: 'timeline' | 'list' | 'text';
  visible: boolean;
  order: number;
  pageNumber?: number;
  dateFormat?: 'zh-full' | 'zh-month' | 'dash-full' | 'dash-month' | 'dot-full' | 'dot-month';
  data: BasicInfo | TimelineItem[] | ListItem[] | TextContent | Record<string, unknown>;
}

export interface Resume {
  id: string;
  title: string;
  sections: ResumeSection[];
  template: string;
  layout: 'side-by-side' | 'top-bottom';
  pageSettings?: {
    enableMultiPage: boolean;
    totalPages: number;
  };
}

export interface IconOption {
  name: string;
  icon: LucideIcon;
}

// 简历管理相关类型
export interface ResumeMetadata {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  description?: string;
}

export interface ResumeCollection {
  currentResumeId: string;
  resumes: Record<string, Resume>;
  metadata: Record<string, ResumeMetadata>;
}