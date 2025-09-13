import { useBrowserDetection } from '@/hooks/useBrowserDetection';

export const PreviewPageFooter = () => {
  const { isChrome, isMobile } = useBrowserDetection();

  const getFooterTip = () => {
    if (isMobile) {
      return '建议在电脑上打开以获得更好的打印效果';
    }

    if (isChrome) {
      return 'Chrome - 建议使用浏览器的"打印"功能，目标选择"另存为PDF"';
    }

    return '建议使用最新版本Chrome浏览器的"打印"功能导出为 PDF';
  };

  return (
    <div className="bg-gray-100 text-center py-6 text-gray-600 text-sm print:hidden">
      <p>简历预览 - {getFooterTip()}</p>
      <p className="mt-1">调整浏览器打印设置可以获得更好的效果</p>
    </div>
  );
};
