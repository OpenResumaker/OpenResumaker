/**
 * 文本编辑器容器 - 左编辑右预览布局
 */
import { useResumeEditor } from '@/hooks/components/useResumeEditor';
import type { TextContent } from '@/types/resume';
import type { ResumeSection } from '@/types/resume';
import { EditorContainer } from './EditorContainer';
import { EditorPreviewPanel } from './EditorPreviewPanel';
import { TextEditorPanel } from './TextEditorPanel';

interface TextEditorContainerProps {
  section: ResumeSection;
  onBack: () => void;
}

export const TextEditorContainer = ({
  section,
  onBack,
}: TextEditorContainerProps) => {
  const { handleTextSave } = useResumeEditor(section.id);

  const handleSave = (data: TextContent, iconName?: string) => {
    handleTextSave(data, iconName);
  };

  return (
    <EditorContainer
      title={`编辑${section.title}`}
      onBack={onBack}
      editorPanel={
        <TextEditorPanel
          title={section.title}
          initialData={section.data as TextContent}
          onSave={handleSave}
          selectedIcon={section.iconName || 'file-text'}
        />
      }
      previewPanel={
        <EditorPreviewPanel
          title={`${section.title}预览`}
          description="左侧的修改会立即在此处显示"
        />
      }
    />
  );
};
