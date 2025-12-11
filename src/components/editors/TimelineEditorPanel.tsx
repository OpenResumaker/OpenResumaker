/**
 * 时间线编辑器面板 - 左编辑右预览版本
 */
import { IconPicker } from '@/components/ui/advanced/IconPicker.tsx';
import { Button } from '@/components/ui/base/button.tsx';
import { useTimelineEditor } from '@/hooks/components/useTimelineEditor';
import type { TimelineItem as TimelineItemType } from '@/types/resume';
import type { DateFormat } from '@/lib/dateUtils';
import { DndContext } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { GripVertical, Plus } from 'lucide-react';
import { TimelineEditorItem } from './TimelineEditorItem';
import { useState, useEffect } from 'react';

interface TimelineEditorPanelProps {
  initialData: TimelineItemType[];
  onSave: (data: TimelineItemType[], iconName?: string, dateFormat?: DateFormat) => void;
  title: string;
  currentIcon?: string;
  initialDateFormat?: DateFormat;
}

export const TimelineEditorPanel = ({
  initialData,
  onSave,
  title,
  currentIcon = 'briefcase',
  initialDateFormat = 'dash-month',
}: TimelineEditorPanelProps) => {
  // 日期格式状态
  const [dateFormat, setDateFormat] = useState<DateFormat>(initialDateFormat);

  // 包装 onSave 函数以包含日期格式
  const handleSave = (data: TimelineItemType[], iconName?: string) => {
    onSave(data, iconName, dateFormat);
  };

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
  } = useTimelineEditor(true, initialData, currentIcon, handleSave, () => {});

  // 当日期格式改变时，触发保存
  useEffect(() => {
    if (dateFormat !== initialDateFormat) {
      handleSave(items, selectedIcon);
    }
  }, [dateFormat]);

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
          {/* 图标选择区域 */}
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

          {/* 时间线项目列表 */}
          {items.length > 0 && (
            <div className="space-y-4">
              <div className="text-xs text-gray-500 flex items-center gap-1">
                <GripVertical className="h-3 w-3" />
                拖拽调整项目顺序
              </div>
              <DndContext sensors={dragConfig.sensors} onDragEnd={dragConfig.onDragEnd}>
                <SortableContext items={dragConfig.sortableItems} strategy={dragConfig.strategy}>
                  <div className="space-y-4">
                    {items.map((item, index) => (
                      <TimelineEditorItem
                        key={item.id}
                        item={item}
                        index={index}
                        onUpdate={updateItem}
                        onRemove={removeItem}
                        dateFormat={dateFormat}
                        onDateFormatChange={setDateFormat}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            </div>
          )}

          {/* 添加新项目按钮 */}
          <Button
            onClick={addItem}
            variant="outline"
            className="w-full border-dashed border-2 hover:bg-blue-50"
          >
            <Plus className="h-4 w-4 mr-2" />
            添加一项
          </Button>
        </div>
      </div>
    </div>
  );
};
