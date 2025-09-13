/**
 * 文本编辑器面板 - 左编辑右预览版本
 */
import { IconPicker } from '@/components/ui/advanced/IconPicker.tsx';
import { Textarea } from '@/components/ui/base/textarea.tsx';
import { useTextEditor } from '@/hooks/components/useTextEditor';

interface TextEditorPanelProps {
  title: string;
  initialData: { content: string };
  onSave: (data: { content: string }, iconName?: string) => void;
  selectedIcon: string;
}

export const TextEditorPanel = ({
  title,
  initialData,
  onSave,
  selectedIcon: initialIcon,
}: TextEditorPanelProps) => {
  const {
    content,
    selectedIcon,
    iconEnabled,
    wordCount,
    lineCount,
    setContent,
    setSelectedIcon,
    setIconEnabled,
  } = useTextEditor(true, initialData, initialIcon, onSave, () => {});

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

          {/* 内容编辑 */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">内容</label>
              <div className="text-xs text-gray-500">
                {wordCount} 字符 · {lineCount} 行
              </div>
            </div>
            <Textarea
              value={content}
              onChange={(value) => setContent(value)}
              placeholder="请输入内容..."
              className="min-h-[300px] resize-y"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
