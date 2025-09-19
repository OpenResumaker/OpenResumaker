import { Button } from '@/components/ui/base/button';
import type { ResumeSection } from '@/types/resume';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { FileText, Plus, Trash2 } from 'lucide-react';
import { DraggableSectionItem } from './DraggableSectionItem';

interface PageContainerProps {
  pageNumber: number;
  sections: ResumeSection[];
  editingId: string | null;
  editingTitle: string;
  onStartEditing: (section: ResumeSection) => void;
  onSaveEditing: () => void;
  onCancelEditing: () => void;
  onTitleChange: (title: string) => void;
  onIconChange: (sectionId: string, iconName: string) => void;
  onEditorTypeChange: (sectionId: string, editorType: 'timeline' | 'list' | 'text') => void;
  onDelete: (sectionId: string) => void;
  getEditorType: (section: ResumeSection) => 'timeline' | 'list' | 'text';
  onAddSection: () => void;
  onRemovePage?: (pageNumber: number) => void;
}

export const PageContainer = ({
  pageNumber,
  sections,
  editingId,
  editingTitle,
  onStartEditing,
  onSaveEditing,
  onCancelEditing,
  onTitleChange,
  onIconChange,
  onEditorTypeChange,
  onDelete,
  getEditorType,
  onAddSection,
  onRemovePage,
}: PageContainerProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id: `page-${pageNumber}`,
    data: { pageNumber },
  });

  // 显示该页的模块
  const displaySections = sections.filter((section) => (section.pageNumber || 1) === pageNumber);

  return (
    <div
      ref={setNodeRef}
      className={`relative border rounded-lg p-4 transition-all duration-200 ${
        isOver
          ? 'border-blue-500 bg-blue-50'
          : pageNumber === 1
            ? 'border-gray-300 bg-white'
            : 'border-gray-200 bg-gray-50'
      }`}
    >
      {/* 页面头部 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-gray-600" />
          <h3 className="font-medium text-gray-900">
            {pageNumber === 1 ? '第1页' : `第${pageNumber}页`}
            {pageNumber === 1 && ' (基本信息)'}
          </h3>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {displaySections.length} 个模块
          </span>
        </div>

        {/* 删除页面按钮 - 只有第2页及以上才显示 */}
        {pageNumber > 1 && onRemovePage && (
          <div className="flex items-center gap-2">
            <Button
              onClick={() => onRemovePage(pageNumber)}
              size="sm"
              variant="outline"
              className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-3 w-3 mr-1" />
              删除页面
            </Button>
          </div>
        )}
      </div>

      {/* 模块列表 */}
      <SortableContext
        items={displaySections.map((s) => s.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2 min-h-[100px]">
          {displaySections.map((section) => (
            <DraggableSectionItem
              key={section.id}
              section={section}
              isEditing={editingId === section.id}
              editingTitle={editingTitle}
              onStartEditing={() => onStartEditing(section)}
              onSaveEditing={onSaveEditing}
              onCancelEditing={onCancelEditing}
              onTitleChange={onTitleChange}
              onIconChange={(iconName) => onIconChange(section.id, iconName)}
              onEditorTypeChange={(editorType) => onEditorTypeChange(section.id, editorType)}
              onDelete={() => onDelete(section.id)}
              getEditorType={getEditorType}
            />
          ))}

          {/* 空状态提示 */}
          {displaySections.length === 0 && pageNumber > 1 && (
            <div className="text-center py-8 text-gray-400">
              <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">拖拽模块到此页</p>
            </div>
          )}

          {/* 添加模块按钮 - 只在第一页显示 */}
          {pageNumber === 1 && (
            <div className="pt-2 border-t border-dashed border-gray-300">
              <Button
                onClick={onAddSection}
                size="sm"
                variant="outline"
                className="w-full text-gray-600 border-dashed"
              >
                <Plus className="h-4 w-4 mr-1" />
                添加新模块
              </Button>
            </div>
          )}
        </div>
      </SortableContext>

      {/* 拖拽提示 */}
      {isOver && (
        <div className="absolute inset-0 border-2 border-blue-500 border-dashed rounded-lg bg-blue-50 bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-blue-500 text-white px-3 py-1 rounded text-sm font-medium">
            放置到第{pageNumber}页
          </div>
        </div>
      )}
    </div>
  );
};
