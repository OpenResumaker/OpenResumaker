/**
 * 列表编辑器业务逻辑 Hook - 自动保存版本
 */
import { useAutoSaveDialog } from '@/hooks/useAutoSaveDialog';
import type { ListItem } from '@/types/resume';
import type { DragEndEvent } from '@dnd-kit/core';
import { PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';

interface ListEditorData {
  items: ListItem[];
  selectedIcon: string;
  iconEnabled: boolean;
}

export const useListEditor = (
  isOpen: boolean,
  initialData: ListItem[],
  currentIcon: string,
  onSave: (data: ListItem[], iconName?: string) => void,
  onClose: () => void
) => {
  // 配置拖拽传感器
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 移动8px才开始拖拽，避免误触
      },
    })
  );

  // 使用通用的自动保存对话框 Hook
  const { data, setData, handleClose, saveStatusText } = useAutoSaveDialog<ListEditorData>({
    isOpen,
    initialData: {
      items: initialData,
      selectedIcon: currentIcon,
      iconEnabled: !!currentIcon && currentIcon !== '',
    },
    onSave: (data) => onSave(data.items, data.iconEnabled ? data.selectedIcon : ''),
    onClose,
    debounceDelay: 300,
  });

  const { items, selectedIcon, iconEnabled } = data;

  // 设置项目列表
  const setItems = (newItems: ListItem[]) => {
    setData({ ...data, items: newItems });
  };

  // 设置选中图标
  const setSelectedIcon = (newIcon: string) => {
    setData({ ...data, selectedIcon: newIcon });
  };

  // 设置图标启用状态
  const setIconEnabled = (enabled: boolean) => {
    setData({ ...data, iconEnabled: enabled });
  };

  // 添加新项目
  const addItem = () => {
    const newItem: ListItem = {
      id: Date.now().toString(),
      content: '',
    };
    setItems([...items, newItem]);
  };

  // 删除项目
  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  // 更新项目内容
  const updateItem = (id: string, content: string) => {
    setItems(items.map((item) => (item.id === id ? { ...item, content } : item)));
  };

  // 拖拽结束处理
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      const newItems = arrayMove(items, oldIndex, newIndex);
      setItems(newItems);
    }
  };

  // 移动项目位置 (拖拽排序) - 保留为兼容性方法
  const moveItem = (fromIndex: number, toIndex: number) => {
    const newItems = [...items];
    const [moved] = newItems.splice(fromIndex, 1);
    newItems.splice(toIndex, 0, moved);
    setItems(newItems);
  };

  return {
    // 状态
    items,
    selectedIcon,
    iconEnabled,
    saveStatusText,

    // 拖拽配置
    dragConfig: {
      sensors,
      onDragEnd: handleDragEnd,
      sortableItems: items.map((item) => item.id),
      strategy: verticalListSortingStrategy,
    },

    // 操作方法
    addItem,
    removeItem,
    updateItem,
    moveItem,
    setSelectedIcon,
    setIconEnabled,
    handleClose,
  };
};
