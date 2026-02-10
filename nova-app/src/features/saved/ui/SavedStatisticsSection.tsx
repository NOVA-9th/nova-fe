'use client';

import { CodeXml, Download, FileText, Grid2X2Icon } from 'lucide-react';
import { SectionHeader, TextIconButton } from '@/shared/ui';
import { useBookmarkCountsBySourceType } from '../hooks/useBookmarkStatistics';
import { mapCardTypeNameToDisplay, getCardTypeIcon } from '../utils/cardTypeMapping';
import { SavedStatics } from './SavedStatics';
import { useMemo, useState } from 'react';
import { showToast } from '@/shared/utils/toast';

const ExportDropdownButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleExportJSON = () => {
    showToast.success('JSON 내보내기는 준비 중입니다.');
    setIsOpen(false);
  };

  const handleExportPDF = () => {
    showToast.success('PDF 내보내기는 준비 중입니다.');
    setIsOpen(false);
  };

  return (
    <div className='relative w-full'>
      <TextIconButton
        size='lg'
        style='surface'
        peak={true}
        leftIcon={Download}
        label='저장함 내보내기'
        className='w-full gap-1.5'
        onClick={() => setIsOpen((prev) => !prev)}
      />
      {isOpen && (
        <div className='absolute left-0 right-0 top-full z-20 mt-1 rounded-xl border border-outline bg-base p-2 shadow-[0_4px_12px_rgba(0,0,0,0.12)]'>
          <button
            type='button'
            onClick={handleExportJSON}
            className='flex w-full items-center justify-center gap-1.5 rounded-interactive-default bg-white-charcoal px-padding-bold py-padding-regular text-additive hover:bg-surface active:bg-surface'
          >
            <CodeXml size={16} className='text-additive' />
            <span className='typo-body-key'>JSON 으로 저장</span>
          </button>
          <button
            type='button'
            onClick={handleExportPDF}
            className='mt-1 flex w-full items-center justify-center gap-1.5 rounded-interactive-default bg-white-charcoal px-padding-bold py-padding-regular text-additive hover:bg-surface active:bg-surface'
          >
            <FileText size={16} className='text-additive' />
            <span className='typo-body-key'>PDF 로 저장</span>
          </button>
        </div>
      )}
    </div>
  );
};

export const SavedStatisticsSection = () => {
  const { data, isLoading } = useBookmarkCountsBySourceType();

  const statisticsData = useMemo(() => {
    if (!data?.data?.bookmarkCounts) return [];

    const counts = data.data.bookmarkCounts;
    const totalCount = counts.reduce((sum, item) => sum + item.count, 0);

    // 전체 항목 추가
    const allItem = {
      id: 0,
      icon: Grid2X2Icon,
      label: '전체',
      value: totalCount,
    };

    // 출처별 항목들
    const sourceItems = counts.map((item) => {
      const displayName = mapCardTypeNameToDisplay(item.cardTypeName);
      const icon = getCardTypeIcon(displayName);

      return {
        id: item.cardTypeId,
        icon: icon,
        label: displayName,
        value: item.count,
      };
    });

    return [allItem, ...sourceItems];
  }, [data]);

  if (isLoading) {
    return (
      <section className='flex flex-col w-full h-fit justify-start items-start p-5 rounded-static-frame bg-base gap-5'>
        <SectionHeader size='lg' text='저장함 통계' />
        <section className='flex flex-col w-full h-fit justify-center items-start gap-1'>
          <div className='w-full h-10 bg-surface animate-pulse rounded' />
          <div className='w-full h-10 bg-surface animate-pulse rounded' />
          <div className='w-full h-10 bg-surface animate-pulse rounded' />
        </section>
        <ExportDropdownButton />
      </section>
    );
  }

  if (!statisticsData || statisticsData.length === 0) {
    return (
      <section className='flex flex-col w-full h-fit justify-start items-start p-5 rounded-static-frame bg-base gap-5'>
        <SectionHeader size='lg' text='저장함 통계' />
        <section className='flex flex-col w-full h-fit justify-center items-start gap-1'>
          <div className='text-additive typo-body-key'>저장된 북마크가 없습니다.</div>
        </section>
        <ExportDropdownButton />
      </section>
    );
  }

  return (
    <section className='flex flex-col w-full h-fit justify-start items-start p-5 rounded-static-frame bg-base gap-5'>
      <SectionHeader size='lg' text='저장함 통계' />
      <section className='flex flex-col w-full h-fit justify-center items-start gap-1'>
        {statisticsData.map((item) => (
          <SavedStatics
            key={item.id}
            icon={item.icon}
            label={item.label}
            value={item.value}
          />
        ))}
      </section>
      <ExportDropdownButton />
    </section>
  );
};


