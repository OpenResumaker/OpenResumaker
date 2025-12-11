/**
 * 时间线编辑器容器 - 左编辑右预览布局
 */
import { useResumeEditor } from '@/hooks/components/useResumeEditor';
import type { TimelineItem } from '@/types/resume';
import type { ResumeSection } from '@/types/resume';
import type { DateFormat } from '@/lib/dateUtils';
import { useAtomValue } from 'jotai';
import { resumeAtom } from '@/store/resumeStore';
import { EditorContainer } from './EditorContainer';
import { EditorPreviewPanel } from './EditorPreviewPanel';
import { TimelineEditorPanel } from './TimelineEditorPanel';

interface TimelineEditorContainerProps {
  section: ResumeSection;
  onBack: () => void;
}

export const TimelineEditorContainer = ({
  section,
  onBack,
}: TimelineEditorContainerProps) => {
  const { handleTimelineSave } = useResumeEditor(section.id);
  const resume = useAtomValue(resumeAtom);

  const handleSave = (data: TimelineItem[], iconName?: string, dateFormat?: DateFormat) => {
    handleTimelineSave(data, iconName, dateFormat);
  };

  return (
    <EditorContainer
      title={`编辑${section.title} - ${resume.title}`}
      onBack={onBack}
      editorPanel={
        <TimelineEditorPanel
          initialData={section.data as TimelineItem[]}
          onSave={handleSave}
          title={section.title}
          currentIcon={section.iconName}
          initialDateFormat={section.dateFormat}
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
