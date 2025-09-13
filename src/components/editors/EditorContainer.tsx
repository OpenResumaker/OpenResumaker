/**
 * 通用编辑器容器 - 响应式布局：大屏左右分栏，小屏上下布局
 */
import { Button } from '@/components/ui/base/button.tsx';
import { ArrowLeft } from 'lucide-react';
import type { ReactNode } from 'react';

interface EditorContainerProps {
  /** 编辑器标题 */
  title: string;
  /** 保存状态文本 */
  saveStatusText?: string;
  /** 左侧编辑面板内容 */
  editorPanel: ReactNode;
  /** 右侧预览面板内容 */
  previewPanel: ReactNode;
  /** 返回按钮点击处理 */
  onBack: () => void;
  /** 自定义头部操作按钮 */
  headerActions?: ReactNode;
}

export const EditorContainer = ({
  title,
  saveStatusText,
  editorPanel,
  previewPanel,
  onBack,
  headerActions,
}: EditorContainerProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* 头部 */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              onClick={onBack}
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">返回</span>
            </Button>
            
            <div className="flex items-center gap-3">
              <div>
                <h1 className="text-lg font-semibold text-gray-900 flex items-center gap-3">
                  {title}
                  {saveStatusText && (
                    <span className="text-sm font-normal text-gray-500">{saveStatusText}</span>
                  )}
                </h1>
              </div>
            </div>
          </div>
          
          {headerActions && (
            <div className="flex items-center gap-2">
              {headerActions}
            </div>
          )}
        </div>
      </div>

      {/* 响应式布局：大屏左右分栏，小屏上下布局 */}
      <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)]">
        {/* 编辑面板 */}
        <div className="w-full lg:w-1/2 border-b lg:border-b-0 lg:border-r border-gray-200 bg-white h-1/2 lg:h-full overflow-y-auto">
          {editorPanel}
        </div>

        {/* 预览面板 */}
        <div className="w-full lg:w-1/2 bg-gray-50 h-1/2 lg:h-full overflow-y-auto">
          {previewPanel}
        </div>
      </div>
    </div>
  );
};
