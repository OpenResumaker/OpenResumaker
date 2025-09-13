/**
 * 简单的加载组件
 *
 * 注意：对于小包（几KB）的懒加载，建议使用 fallback={null} 避免闪烁
 * 只在真正需要loading反馈的场景使用（如大包、网络请求等）
 */
import React from 'react';

interface LoadingProps {
  text?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'w-4 h-4 border-2',
  md: 'w-6 h-6 border-2',
  lg: 'w-8 h-8 border-4',
};

export const Loading: React.FC<LoadingProps> = ({ text, size = 'md', className = '' }) => {
  const spinnerClasses = `${sizeClasses[size]} border-blue-600 border-t-transparent rounded-full animate-spin`;

  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <div className={spinnerClasses} />
      {text && <p className="text-gray-600 text-sm text-center">{text}</p>}
    </div>
  );
};

// 页面级loading（少数真正需要的场景）
export const PageLoading: React.FC<{ text?: string }> = ({ text }) => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <Loading text={text} size="lg" />
  </div>
);
