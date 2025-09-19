import { useSectionManager } from '@/hooks/components/useSectionManager';
import { usePageSettings } from '@/hooks/components/usePageSettings';
import { Button } from '@/components/ui/base/button';
import { DndContext } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { Plus } from 'lucide-react';
import { PageContainer } from './PageContainer';

export const SectionEditorPanel = () => {
  const {
    managedSections,
    editingId,
    editingTitle,
    setEditingTitle,
    deleteSection,
    addCustomSection,
    startEditing,
    saveEditing,
    cancelEditing,
    updateSectionIcon,
    getEditorType,
    updateEditorType,
    dragConfig,
  } = useSectionManager();

  const pageSettings = usePageSettings();

  // 处理跨页面拖拽
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    // 如果拖拽到页面容器
    if (over.id.toString().startsWith('page-')) {
      const pageNumber = parseInt(over.id.toString().replace('page-', ''));
      const sectionId = active.id.toString();
      
      // 更新模块的页面分配
      pageSettings.handleSectionPageChange(sectionId, pageNumber);
      return;
    }

    // 原有的排序逻辑
    dragConfig.onDragEnd(event);
  };


  return (
    <div className="h-full flex flex-col">
      {/* 头部 */}
      <div className="px-4 md:px-6 lg:px-8 py-3 md:py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="font-semibold text-gray-900 text-base md:text-lg">模块管理</h2>
            <p className="text-sm text-gray-600 mt-1 hidden md:block">
              拖拽模块到不同页面容器中进行分页管理
            </p>
          </div>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="flex-1 overflow-y-auto px-4 md:px-6 lg:px-8">
        <div className="py-4 md:py-6">
          <DndContext sensors={dragConfig.sensors} onDragEnd={handleDragEnd}>
            <div className="space-y-4">
              {/* 渲染所有页面容器 */}
              {Array.from({ length: pageSettings.totalPages }, (_, index) => {
                const pageNumber = index + 1;
                return (
                  <PageContainer
                    key={pageNumber}
                    pageNumber={pageNumber}
                    sections={managedSections}
                    editingId={editingId}
                    editingTitle={editingTitle}
                    onStartEditing={startEditing}
                    onSaveEditing={saveEditing}
                    onCancelEditing={cancelEditing}
                    onTitleChange={setEditingTitle}
                    onIconChange={updateSectionIcon}
                    onEditorTypeChange={updateEditorType}
                    onDelete={deleteSection}
                    getEditorType={getEditorType}
                    onAddSection={addCustomSection}
                    onRemovePage={pageSettings.handleRemovePage}
                  />
                );
              })}

              {/* 添加新页面按钮 */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Button
                  onClick={pageSettings.handleAddPage}
                  variant="outline"
                  className="text-gray-600 hover:text-gray-800"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  添加新页面
                </Button>
                <p className="text-xs text-gray-500 mt-2">
                  添加更多页面来组织您的简历内容
                </p>
              </div>
            </div>
          </DndContext>
        </div>
      </div>
    </div>
  );
};
