/**
 * 列表编辑器面板 - 左编辑右预览版本
 */
import { IconPicker } from '@/components/ui/advanced/IconPicker.tsx';
import { Button } from '@/components/ui/base/button.tsx';
import { useListEditor } from '@/hooks/components/useListEditor';
import type { ListItem as ListItemType } from '@/types/resume';
import { DndContext } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { GripVertical, Plus } from 'lucide-react';
import { ListEditorItem } from './ListEditorItem';

interface ListEditorPanelProps {
  initialData: ListItemType[];
  onSave: (data: ListItemType[], iconName?: string) => void;
  title: string;
  currentIcon: string;
}

export const ListEditorPanel = ({
  initialData,
  onSave,
  title,
  currentIcon,
}: ListEditorPanelProps) => {
  const {
    items,
    selectedIcon,
    iconEnabled,
    dragConfig,
    addItem,
    removeItem,
    updateItem,
    setSelectedIcon,
    setIconEnabled,
  } = useListEditor(true, initialData, currentIcon, onSave, () => {});

  return (
    <div className="h-full flex flex-col">
      {/* 头部 */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            编辑{title}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            在此处编辑您的{title}信息，所有更改将自动保存。
          </p>
        </div>
      </div>

      {/* 编辑内容 */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-6">
          {/* 模块图标选择 */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="icon-toggle"
                checked={iconEnabled}
                onChange={(e) => setIconEnabled(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label
                htmlFor="icon-toggle"
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                显示模块图标
              </label>
            </div>

            {iconEnabled && (
              <div className="pl-6 border-l-2 border-blue-100">
                <IconPicker value={selectedIcon} onChange={setSelectedIcon} label="图标" />
              </div>
            )}
          </div>

          {/* 列表内容 */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-gray-700">列表内容</label>
              <Button onClick={addItem} size="sm">
                <Plus className="h-4 w-4 mr-1" />
                添加项目
              </Button>
            </div>

            {items.length > 0 ? (
              <div className="space-y-3">
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <GripVertical className="h-3 w-3" />
                  拖拽调整项目顺序
                </div>
                <DndContext sensors={dragConfig.sensors} onDragEnd={dragConfig.onDragEnd}>
                  <SortableContext items={dragConfig.sortableItems} strategy={dragConfig.strategy}>
                    <div className="space-y-3">
                      {items.map((item, index) => (
                        <ListEditorItem
                          key={item.id}
                          item={item}
                          index={index}
                          onUpdate={updateItem}
                          onRemove={removeItem}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>暂无内容，点击"添加项目"开始创建</p>
              </div>
            )}
          </div>

          {/* 使用提示 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-blue-800 mb-2">💡 使用提示</h4>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• 适用于个人优势、技能特长等列表形式的内容</li>
              <li>• 每一项内容会在简历中自动编号显示</li>
              <li>• 可以拖拽调整项目顺序</li>
              <li>• 支持多行文本，详细描述您的优势</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
