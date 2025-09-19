import type { Resume } from '@/types/resume.ts';
import { BasicInfoSection } from '../theme/BasicInfoSection.tsx';
import { TimelineSection } from '../theme/TimelineSection.tsx';

interface ResumeDisplayProps {
  resume: Resume;
  isEditable?: boolean;
  scale?: number;
  className?: string;
}

/**
 * 单页简历渲染组件
 */
const SinglePageResume = ({
  resume,
  isEditable,
  scale,
  pageNumber = 1,
}: {
  resume: Resume;
  isEditable: boolean;
  scale: number;
  pageNumber?: number;
}) => {
  const getBasicInfoSection = () => {
    return resume.sections.find((section) => section.type === 'basic');
  };

  const getTimelineSections = () => {
    return resume.sections.filter(
      (section) => section.type === 'timeline' || section.type === 'list' || section.type === 'text'
    );
  };

  const basicInfoSection = getBasicInfoSection();
  const timelineSections = getTimelineSections()
    .filter((section) => section.visible)
    .filter((section) => {
      // 如果启用了多页模式，则按页面筛选
      if (resume.pageSettings?.enableMultiPage) {
        return (section.pageNumber || 1) === pageNumber;
      }
      return true;
    })
    .sort((a, b) => a.order - b.order);

  // 基本信息默认在第一页显示
  const shouldShowBasicInfo = pageNumber === 1;

  return (
    <div
      className="max-w-[210mm] mx-auto bg-white print:shadow-none print:max-w-none"
      style={{
        transform: `scale(${scale / 100})`,
        transformOrigin: 'top center',
        transition: 'transform 0.2s ease-in-out',
      }}
    >
      {/* 基本信息区域 - 只在第一页显示 */}
      {shouldShowBasicInfo && basicInfoSection && (
        <BasicInfoSection section={basicInfoSection} isEditable={isEditable} />
      )}

      {/* 主体内容 */}
      {timelineSections.length > 0 && (
        <div className={`px-8 pb-8 print:px-6 print:pb-6 ${pageNumber !== 1 ? 'pt-8' : ''}`}>
          <div className="space-y-6 print:space-y-4">
            {timelineSections.map((section) => (
              <TimelineSection key={section.id} section={section} isEditable={isEditable} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const ResumeDisplay = ({
  resume,
  isEditable = false,
  scale = 100,
  className = '',
}: ResumeDisplayProps) => {
  // 如果没有启用多页模式，使用原有的单页显示逻辑
  if (!resume.pageSettings?.enableMultiPage || resume.pageSettings.totalPages <= 1) {
    return (
      <div className={`print-container ${className}`}>
        <SinglePageResume resume={resume} isEditable={isEditable} scale={scale} />
      </div>
    );
  }

  // 多页模式渲染
  const totalPages = resume.pageSettings.totalPages;

  return (
    <div className={`print-container ${className}`}>
      <div className="space-y-12 print:space-y-0">
        {Array.from({ length: totalPages }, (_, index) => {
          const pageNumber = index + 1;
          const isLastPage = pageNumber === totalPages;
          return (
            <div key={pageNumber} className="relative">
              {/* 页面指示器 */}
              {
                pageNumber!=1 && (
                  <div className="absolute -top-12 left-0 right-0 flex justify-center print:hidden">
                    <div className="page-indicator text-gray-700 px-4 py-2 rounded-full text-sm font-medium shadow-sm">
                      第 {pageNumber} 页 / 共 {totalPages} 页
                    </div>
                  </div>
                )
              }

              <div
                className={`
                  print-page page-container
                  ${isLastPage ? '' : 'print:page-break-after-always'}
                  bg-white 
                  shadow-xl 
                  border border-gray-200
                  rounded-lg 
                  overflow-hidden
                  transition-all duration-300 ease-in-out
                  print:shadow-none 
                  print:border-none 
                  print:rounded-none
                `}
              >
                <SinglePageResume resume={resume} isEditable={isEditable} scale={scale} pageNumber={pageNumber} />
              </div>

              {/* 页面分隔指示线 */}
              {!isLastPage && (
                <div className="flex items-center justify-center py-6 print:hidden">
                  <div className="flex-1 border-t border-dashed border-gray-300"></div>
                  <div className="px-4 text-gray-400 text-sm">页面分隔</div>
                  <div className="flex-1 border-t border-dashed border-gray-300"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
