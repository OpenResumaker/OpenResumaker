/**
 * 基本信息区域 - 支持多种布局
 */
import type { BasicInfo, ResumeSection } from '@/types/resume';
import { useNavigate } from 'react-router-dom';
import {
  CenterLayout,
  LeftLayout,
  RightLayout,
  ClassicLayout,
} from './BasicInfoLayouts';

interface BasicInfoSectionProps {
  section: ResumeSection;
  isEditable: boolean;
}

export const BasicInfoSection = ({ section, isEditable }: BasicInfoSectionProps) => {
  const data = section.data as BasicInfo;
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/editor/basic-info/${section.id}`);
  };

  // 根据布局类型渲染不同的组件，默认使用 center 布局
  const layout = data.layout || 'center';

  const layoutComponents = {
    center: CenterLayout,
    left: LeftLayout,
    right: RightLayout,
    classic: ClassicLayout,
  };

  const LayoutComponent = layoutComponents[layout];

  return (
    <LayoutComponent
      data={data}
      sectionId={section.id}
      isEditable={isEditable}
      onEdit={handleEdit}
    />
  );
};
