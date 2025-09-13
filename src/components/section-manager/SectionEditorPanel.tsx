import { Button } from '@/components/ui/base/button.tsx';
import { Label } from '@/components/ui/base/label.tsx';
import { useSectionManager } from '@/hooks/components/useSectionManager';
import { DndContext } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { GripVertical, Plus, Star } from 'lucide-react';
import { DraggableSectionItem } from '@/components/section-manager/DraggableSectionItem.tsx';
import { useResponsiveDetection } from '@/hooks/useResponsiveDetection';

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

  const { isMobile, getContainerClassName, getSpacingClassName } = useResponsiveDetection();

  return (
    <div className="h-full flex flex-col">
      {/* 头部 */}
      <div className={`${getContainerClassName()} py-3 md:py-4 border-b border-gray-200`}>
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <h2 className={`font-semibold text-gray-900 ${isMobile ? 'text-base' : 'text-lg'}`}>模块列表</h2>
            {!isMobile && (
              <p className="text-sm text-gray-600 mt-1">
                拖拽调整顺序，编辑模块属性
              </p>
            )}
          </div>
          {!isMobile && (
            <div className="text-xs text-gray-500 flex items-center gap-1 flex-shrink-0">
              <GripVertical className="h-3 w-3" />
              拖拽排序
            </div>
          )}
        </div>
      </div>

      {/* 模块列表 */}
      <div className={`flex-1 overflow-y-auto ${getContainerClassName()}`}>
        <div className={`${getSpacingClassName('lg')}`}>
          {/* 现有模块列表 */}
          <div className={`${getSpacingClassName('md')}`}>
            <div className="flex items-center justify-between">
              <Label className={`font-medium text-gray-700 ${isMobile ? 'text-sm' : 'text-sm'}`}>
                当前模块 ({managedSections.length})
              </Label>
            </div>

            <DndContext sensors={dragConfig.sensors} onDragEnd={dragConfig.onDragEnd}>
              <SortableContext items={dragConfig.sortableItems} strategy={dragConfig.strategy}>
                <div className={`${getSpacingClassName('sm')}`}>
                  {managedSections.map((section) => (
                    <DraggableSectionItem
                      key={section.id}
                      section={section}
                      isEditing={editingId === section.id}
                      editingTitle={editingTitle}
                      onStartEditing={() => startEditing(section)}
                      onSaveEditing={saveEditing}
                      onCancelEditing={cancelEditing}
                      onTitleChange={setEditingTitle}
                      onIconChange={(iconName) => updateSectionIcon(section.id, iconName)}
                      onEditorTypeChange={(editorType) => updateEditorType(section.id, editorType)}
                      onDelete={() => deleteSection(section.id)}
                      getEditorType={getEditorType}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>

            {managedSections.length === 0 && (
              <div className={`text-center ${isMobile ? 'py-8' : 'py-12'} text-gray-500`}>
                <Star className={`mx-auto mb-4 text-gray-300 ${isMobile ? 'h-12 w-12' : 'h-16 w-16'}`} />
                <h3 className={`font-medium text-gray-900 mb-2 ${isMobile ? 'text-base' : 'text-lg'}`}>还没有自定义模块</h3>
                <p className={`text-gray-600 mb-4 ${isMobile ? 'text-xs' : 'text-sm'}`}>添加第一个模块开始定制您的简历</p>
                <Button
                  onClick={addCustomSection}
                  size={isMobile ? 'sm' : 'sm'}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  添加模块
                </Button>
              </div>
            )}
          </div>

          {/* 添加新模块 */}
          {managedSections.length > 0 && (
            <div className={`border-t ${isMobile ? 'pt-4' : 'pt-6'}`}>
              <div className="flex items-center justify-between">
                <Label className={`font-medium text-gray-700 ${isMobile ? 'text-sm' : 'text-sm'}`}>添加新模块</Label>
                <Button
                  onClick={addCustomSection}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  添加模块
                </Button>
              </div>
              {!isMobile && (
                <p className="text-xs text-gray-500 mt-2">
                  新添加的模块将显示在模块列表的最后，你可以通过拖拽调整位置。
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
