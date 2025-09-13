/**
 * 列表编辑器容器 - 左编辑右预览布局
 */
import { useResumeEditor } from '@/hooks/components/useResumeEditor';
import type { ListItem } from '@/types/resume';
import type { ResumeSection } from '@/types/resume';
import { EditorContainer } from './EditorContainer';
import { EditorPreviewPanel } from './EditorPreviewPanel';
import { ListEditorPanel } from './ListEditorPanel';

interface ListEditorContainerProps {
  section: ResumeSection;
  onBack: () => void;
}

export const ListEditorContainer = ({
  section,
  onBack,
}: ListEditorContainerProps) => {
  const { handleListSave } = useResumeEditor(section.id);

  const handleSave = (data: ListItem[], iconName?: string) => {
    handleListSave(data, iconName);
  };

  return (
    <EditorContainer
      title={`编辑${section.title}`}
      onBack={onBack}
      editorPanel={
        <ListEditorPanel
          initialData={section.data as ListItem[]}
          onSave={handleSave}
          title={section.title}
          currentIcon={section.iconName || 'list'}
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
