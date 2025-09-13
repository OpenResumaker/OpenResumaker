import { AppFooter } from '@/components/page-layout/AppFooter.tsx';
import { SectionEditorPanel } from '@/components/section-manager/SectionEditorPanel.tsx';
import { ResumePreviewPanel } from '@/components/section-manager/ResumePreviewPanel.tsx';
import { Button } from '@/components/ui/base/button.tsx';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const SectionManagerContainer = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              onClick={handleBack}
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
                  模块管理
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 响应式布局：大屏左右分栏，小屏上下布局 */}
      <div className="flex flex-col lg:flex-row">
        {/* 编辑面板 */}
        <div className="w-full lg:w-1/2 border-b lg:border-b-0 lg:border-r border-gray-200 bg-white h-1/2 lg:h-full overflow-hidden">
          <SectionEditorPanel />
        </div>

        {/* 预览面板 */}
        <div className="w-full lg:w-1/2 bg-gray-50 h-1/2 lg:h-full overflow-hidden">
          <ResumePreviewPanel />
        </div>
      </div>

      <AppFooter />
    </div>
  );
};
