/**
 * 编辑器页面 - 根据类型和ID显示不同的编辑器
 */
import { BasicInfoEditorContainer, TimelineEditorContainer, ListEditorContainer, TextEditorContainer } from '@/components/editors';
import { resumeAtom } from '@/store/resumeStore';
import type { BasicInfo } from '@/types/resume';
import { useAtomValue } from 'jotai';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

export const EditorPage = () => {
  const { type, sectionId } = useParams<{ type: string; sectionId: string }>();
  const resume = useAtomValue(resumeAtom);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  // 查找对应的section
  const section = resume.sections.find(s => s.id === sectionId);

  useEffect(() => {
    // 如果没有找到对应的section，返回首页
    if (!section) {
      navigate('/');
    }
  }, [section, navigate]);

  if (!section || !type || !sectionId) {
    return null;
  }

  // 根据编辑器类型渲染对应的编辑器
  switch (type) {
    case 'basic-info':
      return (
        <BasicInfoEditorContainer
          sectionId={sectionId}
          initialData={section.data as BasicInfo}
          onBack={handleBack}
        />
      );
    case 'timeline':
      return (
        <TimelineEditorContainer
          section={section}
          onBack={handleBack}
        />
      );
    case 'list':
      return (
        <ListEditorContainer
          section={section}
          onBack={handleBack}
        />
      );
    case 'text':
      return (
        <TextEditorContainer
          section={section}
          onBack={handleBack}
        />
      );
    default:
      // 未知类型，返回首页
      navigate('/');
      return null;
  }
};
