/**
 * 基础信息编辑器容器 - 左编辑右预览布局
 */
import { useResumeEditor } from '@/hooks/components/useResumeEditor';
import type { BasicInfo } from '@/types/resume';
import { useAtomValue } from 'jotai';
import { resumeAtom } from '@/store/resumeStore';
import { EditorContainer } from './EditorContainer';
import { EditorPreviewPanel } from './EditorPreviewPanel';
import { BasicInfoEditorPanel } from './BasicInfoEditorPanel';

interface BasicInfoEditorContainerProps {
  sectionId: string;
  initialData: BasicInfo;
  onBack: () => void;
}

export const BasicInfoEditorContainer = ({
  sectionId,
  initialData,
  onBack,
}: BasicInfoEditorContainerProps) => {
  const { handleBasicInfoSave } = useResumeEditor(sectionId);
  const resume = useAtomValue(resumeAtom);

  const handleSave = (data: BasicInfo) => {
    handleBasicInfoSave(data);
  };

  return (
    <EditorContainer
      title={`编辑基本信息 - ${resume.title}`}
      onBack={onBack}
      editorPanel={
        <BasicInfoEditorPanel
          initialData={initialData}
          onSave={handleSave}
        />
      }
      previewPanel={
        <EditorPreviewPanel
          title="基本信息预览"
          description="左侧的修改会立即在此处显示"
        />
      }
    />
  );
};
