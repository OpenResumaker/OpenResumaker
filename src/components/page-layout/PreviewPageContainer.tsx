import { ResumeDisplay } from '@/components/section-manager/ResumeDisplay.tsx';
import { PreviewPageFooter } from '@/components/page-layout/PreviewPageFooter.tsx';
import { PrintTipBar } from '@/components/page-layout/PrintTipBar.tsx';
import { usePreviewScale } from '@/hooks/components/usePreviewScale.ts';
import { resumeAtom } from '@/store/resumeStore.ts';
import { useAtomValue } from 'jotai';

export const PreviewPageContainer = () => {
  const resume = useAtomValue(resumeAtom);
  const { scale, onScaleChange } = usePreviewScale();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 print:bg-white">
      <PrintTipBar
        onPrint={handlePrint}
        scale={scale}
        onScaleChange={onScaleChange}
      />

      {/* 简历内容 */}
      <ResumeDisplay
        resume={resume}
        isEditable={false}
        scale={scale}
        className="flex justify-center mx-auto p-4 bg-white min-h-screen print:p-2"
      />

      <PreviewPageFooter />
    </div>
  );
};
