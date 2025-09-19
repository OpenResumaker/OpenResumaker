import {
  addPageAtom,
  getNonBasicSectionsAtom,
  removePageAtom,
  resumeAtom,
  updateMultipleSectionsPageAtom,
} from '@/store/resumeStore';
import { useAtom, useAtomValue } from 'jotai';
import { useCallback, useEffect, useState } from 'react';

export const usePageSettings = () => {
  const [resume] = useAtom(resumeAtom);
  const sections = useAtomValue(getNonBasicSectionsAtom);
  const [, updateMultipleSectionsPage] = useAtom(updateMultipleSectionsPageAtom);
  const [, addPage] = useAtom(addPageAtom);
  const [, removePage] = useAtom(removePageAtom);

  // 本地状态管理页面分配
  const [localPageAssignments, setLocalPageAssignments] = useState<Record<string, number>>({});

  // 初始化本地页面分配状态
  useEffect(() => {
    const assignments: Record<string, number> = {};
    sections.forEach((section) => {
      assignments[section.id] = section.pageNumber || 1;
    });
    setLocalPageAssignments(assignments);
  }, [sections]);

  const totalPages = resume.pageSettings?.totalPages || 1;
  const isMultiPageEnabled = totalPages > 1;

  // 添加新页面
  const handleAddPage = useCallback(() => {
    addPage();
  }, [addPage]);

  // 删除页面
  const handleRemovePage = useCallback((pageNumber: number) => {
    removePage(pageNumber);
  }, [removePage]);

  // 更新单个模块的页面分配
  const handleSectionPageChange = useCallback((sectionId: string, pageNumber: number) => {
    setLocalPageAssignments((prev) => ({
      ...prev,
      [sectionId]: pageNumber,
    }));
  }, []);

  // 自动分配模块到页面
  const handleAutoAssign = useCallback(() => {
    const newAssignments: Record<string, number> = {};
    const halfIndex = Math.ceil(sections.length / 2);

    sections.forEach((section, index) => {
      newAssignments[section.id] = index < halfIndex ? 1 : 2;
    });

    setLocalPageAssignments(newAssignments);
  }, [sections]);

  // 重置分配（所有模块分配到第一页）
  const handleResetAssignments = useCallback(() => {
    const newAssignments: Record<string, number> = {};
    sections.forEach((section) => {
      newAssignments[section.id] = 1;
    });
    setLocalPageAssignments(newAssignments);
  }, [sections]);

  // 获取指定页面的模块数量
  const getPageSectionCount = useCallback(
    (pageNumber: number) => {
      return Object.values(localPageAssignments).filter((page) => page === pageNumber).length;
    },
    [localPageAssignments]
  );

  // 应用页面分配到实际数据
  const applyPageAssignments = useCallback(() => {
    const updates = Object.entries(localPageAssignments).map(([sectionId, pageNumber]) => ({
      sectionId,
      pageNumber,
    }));
    updateMultipleSectionsPage(updates);
  }, [localPageAssignments, updateMultipleSectionsPage]);

  // 当多页模式禁用时，自动应用更改
  useEffect(() => {
    if (!isMultiPageEnabled) {
      return;
    }
    // 延迟应用更改，让用户有时间调整
    const timeoutId = setTimeout(() => {
      applyPageAssignments();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [localPageAssignments, isMultiPageEnabled, applyPageAssignments]);

  return {
    totalPages,
    isMultiPageEnabled,
    sections,
    localPageAssignments,
    handleAddPage,
    handleRemovePage,
    handleSectionPageChange,
    handleAutoAssign,
    handleResetAssignments,
    getPageSectionCount,
    applyPageAssignments,
  };
};
