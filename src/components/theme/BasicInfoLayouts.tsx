/**
 * 基础信息区域 - 多种布局样式
 */
import { Button } from '@/components/ui/base/button.tsx';
import { useBasicInfoSection } from '@/hooks/components/useBasicInfoSection';
import type { BasicInfo } from '@/types/resume';
import { Edit3, Mail, Phone, User } from 'lucide-react';
import { AvatarDisplay } from '../avatar/AvatarDisplay';
import { BasicInfoSectionItem } from './BasicInfoSectionItem';

interface BasicInfoLayoutProps {
  data: BasicInfo;
  sectionId: string;
  isEditable: boolean;
  onEdit: () => void;
}

/**
 * 居中布局 - 姓名居中，其余信息与头像形成左右布局
 */
export const CenterLayout = ({ data, sectionId, isEditable, onEdit }: BasicInfoLayoutProps) => {
  const { formatGenderAge, formatCustomFields, hasValue } = useBasicInfoSection(sectionId);

  return (
    <div className="relative group px-8 pt-8 pb-6 print:px-6 print:pt-6 print:pb-4">
      {isEditable && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-gray-100 h-8 w-8 print:hidden z-20"
          onClick={onEdit}
        >
          <Edit3 className="h-4 w-4 text-gray-600" />
        </Button>
      )}

      <div className="flex flex-col items-center">
        {/* 头像和信息的左右布局 */}
        <div className="flex justify-evenly gap-4">
          {/* 左侧：其他信息居中对齐 */}
          <div className="flex flex-col items-center text-center gap-2">
            {/* 基本信息 */}
            <h1 className="text-4xl font-bold text-gray-900 mb-6 print:mb-4 text-center">
              {data.name || '姓名'}
            </h1>
            <div className="flex flex-wrap gap-2 text-sm text-gray-600">
              {(data.gender || data.age) && (
                <BasicInfoSectionItem icon={User}>
                  {formatGenderAge(data.gender, data.age)}
                </BasicInfoSectionItem>
              )}
              {hasValue(data.phone) && (
                <BasicInfoSectionItem icon={Phone}>{data.phone}</BasicInfoSectionItem>
              )}
              {hasValue(data.email) && (
                <BasicInfoSectionItem icon={Mail}>{data.email}</BasicInfoSectionItem>
              )}
            </div>

            {/* 自定义字段 */}
            {data.customFields && data.customFields.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-600 mt-2 white-nowrap">
                {formatCustomFields(data.customFields)}
              </div>
            )}
          </div>

          {/* 右侧：头像 */}
          {data.avatar && (
            <div className="shrink-0">
              <AvatarDisplay src={data.avatar} alt={data.name || '头像'} size="lg" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * 左对齐布局 - 头像在左侧，信息在右侧
 */
export const LeftLayout = ({ data, sectionId, isEditable, onEdit }: BasicInfoLayoutProps) => {
  const { formatGenderAge, formatCustomFields, hasValue } = useBasicInfoSection(sectionId);

  return (
    <div className="relative group px-8 pt-8 pb-6 print:px-6 print:pt-6 print:pb-4">
      {isEditable && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-gray-100 h-8 w-8 print:hidden z-20"
          onClick={onEdit}
        >
          <Edit3 className="h-4 w-4 text-gray-600" />
        </Button>
      )}

      <div className="flex items-start gap-6">
        {/* 头像 */}
        {data.avatar && (
          <div className="shrink-0">
            <AvatarDisplay src={data.avatar} alt={data.name || '头像'} size="lg" />
          </div>
        )}

        {/* 信息区域 */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-gray-900 mb-3 print:mb-2">
            {data.name || '姓名'}
          </h1>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600 print:gap-x-4">
            {(data.gender || data.age) && (
              <BasicInfoSectionItem icon={User}>
                {formatGenderAge(data.gender, data.age)}
              </BasicInfoSectionItem>
            )}
            {hasValue(data.phone) && (
              <BasicInfoSectionItem icon={Phone}>{data.phone}</BasicInfoSectionItem>
            )}
            {hasValue(data.email) && (
              <BasicInfoSectionItem icon={Mail}>{data.email}</BasicInfoSectionItem>
            )}
          </div>

          {data.customFields && data.customFields.length > 0 && (
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 mt-2 print:mt-1">
              {formatCustomFields(data.customFields)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * 右对齐布局 - 信息在左侧，头像在右侧
 */
export const RightLayout = ({ data, sectionId, isEditable, onEdit }: BasicInfoLayoutProps) => {
  const { formatGenderAge, formatCustomFields, hasValue } = useBasicInfoSection(sectionId);

  return (
    <div className="relative group px-8 pt-8 pb-6 print:px-6 print:pt-6 print:pb-4">
      {isEditable && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-gray-100 h-8 w-8 print:hidden z-20"
          onClick={onEdit}
        >
          <Edit3 className="h-4 w-4 text-gray-600" />
        </Button>
      )}

      <div className="flex items-start gap-6">
        {/* 信息区域 */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-gray-900 mb-3 print:mb-2">
            {data.name || '姓名'}
          </h1>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600 print:gap-x-4">
            {(data.gender || data.age) && (
              <BasicInfoSectionItem icon={User}>
                {formatGenderAge(data.gender, data.age)}
              </BasicInfoSectionItem>
            )}
            {hasValue(data.phone) && (
              <BasicInfoSectionItem icon={Phone}>{data.phone}</BasicInfoSectionItem>
            )}
            {hasValue(data.email) && (
              <BasicInfoSectionItem icon={Mail}>{data.email}</BasicInfoSectionItem>
            )}
          </div>

          {data.customFields && data.customFields.length > 0 && (
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 mt-2 print:mt-1">
              {formatCustomFields(data.customFields)}
            </div>
          )}
        </div>

        {/* 头像 */}
        {data.avatar && (
          <div className="shrink-0">
            <AvatarDisplay src={data.avatar} alt={data.name || '头像'} size="lg" />
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * 经典布局 - 紧凑型，信息密集，头像小巧
 */
export const ClassicLayout = ({ data, sectionId, isEditable, onEdit }: BasicInfoLayoutProps) => {
  const { formatGenderAge, formatCustomFields, hasValue } = useBasicInfoSection(sectionId);

  return (
    <div className="relative group px-8 pt-8 pb-6 print:px-6 print:pt-6 print:pb-4">
      {isEditable && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-gray-100 h-8 w-8 print:hidden z-20"
          onClick={onEdit}
        >
          <Edit3 className="h-4 w-4 text-gray-600" />
        </Button>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* 小头像 */}
          {data.avatar && (
            <div className="shrink-0">
              <AvatarDisplay src={data.avatar} alt={data.name || '头像'} size="sm" />
            </div>
          )}

          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              {data.name || '姓名'}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600">
              {(data.gender || data.age) && (
                <BasicInfoSectionItem icon={User}>
                  {formatGenderAge(data.gender, data.age)}
                </BasicInfoSectionItem>
              )}
              {hasValue(data.phone) && (
                <BasicInfoSectionItem icon={Phone}>{data.phone}</BasicInfoSectionItem>
              )}
              {hasValue(data.email) && (
                <BasicInfoSectionItem icon={Mail}>{data.email}</BasicInfoSectionItem>
              )}
              {data.customFields && data.customFields.length > 0 && formatCustomFields(data.customFields)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
