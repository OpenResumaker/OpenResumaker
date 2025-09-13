import * as React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { cn } from '@/lib/utils.ts';

interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  theme?: 'snow' | 'bubble';
  modules?: object;
  formats?: string[];
}

// 将默认配置移到组件外部，避免每次渲染都重新创建
const defaultModules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['clean']
  ],
};

const defaultFormats = [
  'bold', 'italic', 'underline', 'strike',
  'color', 'background', 'list', 'bullet'
];

const Textarea = React.memo(({
  className,
  value = '',
  onChange,
  placeholder = '请输入内容...',
  readOnly = false,
  theme = 'snow',
  modules,
  formats
}: TextareaProps) => {

  return (
    <div className={cn('w-full', className)}>
      <ReactQuill
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        theme={theme}
        modules={modules || defaultModules}
        formats={formats || defaultFormats}
        style={{
          minHeight: '80px',
        }}
      />
    </div>
  );
});

Textarea.displayName = 'Textarea';

export { Textarea };
