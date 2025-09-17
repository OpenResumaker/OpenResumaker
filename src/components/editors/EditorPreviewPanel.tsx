/**
 * 编辑器预览面板 - 用于编辑器右侧预览
 */
import { ResumeDisplay } from '@/components/section-manager/ResumeDisplay.tsx';
import { Button } from '@/components/ui/base/button.tsx';
import { resumeAtom } from '@/store/resumeStore';
import { useAtomValue } from 'jotai';
import { Eye, ZoomIn, ZoomOut } from 'lucide-react';
import { useState } from 'react';

interface EditorPreviewPanelProps {
  /** 预览标题 */
  title?: string;
  /** 描述文本 */
  description?: string;
  /** 是否显示全屏预览按钮 */
  showFullPreview?: boolean;
  /** 是否显示缩放控制 */
  showZoomControls?: boolean;
  /** 自定义预览内容 */
  customPreview?: React.ReactNode;
}

export const EditorPreviewPanel = ({
  title = "实时预览",
  description = "左侧的修改会立即在此处显示",
  showFullPreview = true,
  showZoomControls = true,
  customPreview,
}: EditorPreviewPanelProps) => {
  const resume = useAtomValue(resumeAtom);
  const [scale, setScale] = useState(100);

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 10, 150));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 10, 50));
  };

  const handleFullPreview = () => {
    const url = `${window.location.origin}${window.location.pathname}#/preview`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="h-full flex flex-col">
      {/* 头部控制栏 */}
      <div className="px-6 py-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            <p className="text-sm text-gray-600 mt-1">{description}</p>
          </div>
          
          <div className="flex items-center gap-2">
            {/* 缩放控制 */}
            {showZoomControls && (
              <div className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-lg">
                <Button
                  onClick={handleZoomOut}
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  disabled={scale <= 50}
                >
                  <ZoomOut className="h-3 w-3" />
                </Button>
                
                <span className="text-xs font-medium text-gray-600 min-w-[3rem] text-center">
                  {scale}%
                </span>
                
                <Button
                  onClick={handleZoomIn}
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  disabled={scale >= 150}
                >
                  <ZoomIn className="h-3 w-3" />
                </Button>
              </div>
            )}

            {/* 全屏预览 */}
            {showFullPreview && (
              <Button
                onClick={handleFullPreview}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
              >
                <Eye className="h-4 w-4" />
                <span className="hidden sm:inline">预览 & 导出</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* 预览内容 */}
      <div className="flex-1 overflow-auto bg-gray-50 p-6">
        <div className="flex justify-center">
          {customPreview ? (
            customPreview
          ) : (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <ResumeDisplay
                resume={resume}
                isEditable={false}
                scale={scale}
                className="min-h-0"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
