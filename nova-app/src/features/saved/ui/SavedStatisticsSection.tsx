'use client';

import { Grid2X2Icon } from 'lucide-react';
import { SectionHeader, TextIconButton } from '@/shared/ui';
import { Download } from 'lucide-react';
import { useBookmarkCountsBySourceType } from '../hooks/useBookmarkStatistics';
import { mapCardTypeNameToDisplay, getCardTypeIcon } from '../utils/cardTypeMapping';
import { SavedStatics } from './SavedStatics';
import { useMemo } from 'react';

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
        <TextIconButton
          size='lg'
          style='surface'
          peak={true}
          leftIcon={Download}
          label='저장함 내보내기'
          className='w-full gap-1.5'
        />
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
        <TextIconButton
          size='lg'
          style='surface'
          peak={true}
          leftIcon={Download}
          label='저장함 내보내기'
          className='w-full gap-1.5'
        />
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
      <TextIconButton
        size='lg'
        style='surface'
        peak={true}
        leftIcon={Download}
        label='저장함 내보내기'
        className='w-full gap-1.5'
      />
    </section>
  );
};


