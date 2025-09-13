import { ResumeDisplay } from '@/components/section-manager/ResumeDisplay.tsx';
import { Button } from '@/components/ui/base/button.tsx';
import { resumeAtom } from '@/store/resumeStore';
import { useAtomValue } from 'jotai';
import { Eye, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import { useResponsiveDetection } from '@/hooks/useResponsiveDetection';

export const ResumePreviewPanel = () => {
  const resume = useAtomValue(resumeAtom);
  const { isMobile } = useResponsiveDetection();
  
  const getDefaultScale = () => {
    return 100;
  };
  
  const [scale, setScale] = useState(getDefaultScale());

  const handleZoomIn = () => {
    const step = isMobile ? 5 : 10;
    const maxScale = isMobile ? 100 : 150;
    setScale(prev => Math.min(prev + step, maxScale));
  };

  const handleZoomOut = () => {
    const step = isMobile ? 5 : 10;
    const minScale = isMobile ? 30 : 50;
    setScale(prev => Math.max(prev - step, minScale));
  };

  const handleResetZoom = () => {
    setScale(getDefaultScale());
  };

  const handleFullPreview = () => {
    window.open('/preview', '_blank');
  };

  return (
    <div className="h-full flex flex-col">
      {/* 头部控制栏 */}
      <div className={`px-4 md:px-6 py-3 md:py-4 border-b border-gray-200 bg-white ${isMobile ? 'flex-shrink-0' : ''}`}>
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <h2 className={`font-semibold text-gray-900 ${isMobile ? 'text-base' : 'text-lg'}`}>实时预览</h2>
            {!isMobile && (
              <p className="text-sm text-gray-600 mt-1">
                左侧的修改会立即在此处显示
              </p>
            )}
          </div>
          
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* 缩放控制 */}
            <div className={`flex items-center ${isMobile ? 'gap-1' : 'gap-1'} px-2 md:px-3 py-1 bg-gray-100 rounded-lg`}>
              <Button
                onClick={handleZoomOut}
                variant="ghost"
                size="icon"
                className={`${isMobile ? 'h-7 w-7' : 'h-6 w-6'}`}
                disabled={scale <= (isMobile ? 30 : 50)}
              >
                <ZoomOut className="h-3 w-3" />
              </Button>
              
              <span className={`font-medium text-gray-600 text-center ${isMobile ? 'text-xs min-w-[2.5rem]' : 'text-xs min-w-[3rem]'}`}>
                {scale}%
              </span>
              
              <Button
                onClick={handleZoomIn}
                variant="ghost"
                size="icon"
                className={`${isMobile ? 'h-7 w-7' : 'h-6 w-6'}`}
                disabled={scale >= (isMobile ? 100 : 150)}
              >
                <ZoomIn className="h-3 w-3" />
              </Button>

              {/* 重置缩放按钮 */}
              <Button
                onClick={handleResetZoom}
                variant="ghost"
                size="icon"
                className={`${isMobile ? 'h-7 w-7' : 'h-6 w-6'} ml-1`}
                title="重置缩放"
              >
                <RotateCcw className="h-3 w-3" />
              </Button>
            </div>

            {/* 全屏预览 */}
            <Button
              onClick={handleFullPreview}
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
            >
              <Eye className="h-4 w-4" />
              <span className="hidden sm:inline">预览 & 导出</span>
            </Button>
          </div>
        </div>
      </div>

      {/* 预览内容 */}
      <div className={`flex-1 overflow-auto bg-gray-50 ${isMobile ? 'p-3' : 'p-6'}`}>
        <div className={`flex ${isMobile ? 'justify-start' : 'justify-center'} ${isMobile ? 'min-h-full' : ''}`}>
          <div className={`bg-white ${isMobile ? 'w-full' : 'rounded-lg shadow-lg'} overflow-hidden`}>
            <ResumeDisplay
              resume={resume}
              isEditable={false}
              scale={scale}
              className={`min-h-0 vertical-layout-preview`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
