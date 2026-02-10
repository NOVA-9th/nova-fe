'use client';

import { Grid2X2Icon, LucideIcon } from 'lucide-react';
import { SectionHeader, SideTabItemCustom } from '@/shared/ui';
import { useBookmarkCountsByInterest } from '../hooks/useBookmarkStatistics';
import { mapInterestNameToDisplay, getInterestIcon } from '../utils/interestMapping';
import { useMemo } from 'react';

export const CollectionSection = () => {
  const { data, isLoading } = useBookmarkCountsByInterest();

  const collectionData = useMemo(() => {
    if (!data?.data?.bookmarkCounts) return [];

    const counts = data.data.bookmarkCounts;
    const totalCount = counts.reduce((sum, item) => sum + item.count, 0);

    // 전체 항목 추가
    const allItem = {
      id: 0,
      icon: Grid2X2Icon,
      peak: true,
      label: '전체',
      value: totalCount,
    };

    // 관심사별 항목들
    const interestItems = counts.map((item, index) => {
      const displayName = mapInterestNameToDisplay(item.interestName);
      const icon = getInterestIcon(displayName);

      return {
        id: item.interestId,
        icon: icon as LucideIcon,
        peak: false,
        label: displayName,
        value: item.count,
      };
    });

    return [allItem, ...interestItems];
  }, [data]);

  if (isLoading) {
    return (
      <section className='flex flex-col w-full h-fit justify-start items-start p-5 rounded-static-frame bg-base gap-5'>
        <SectionHeader size='lg' text='컬렉션' />
        <section className='flex flex-col w-full h-fit justify-center items-start gap-1'>
          <div className='w-full h-10 bg-surface animate-pulse rounded' />
          <div className='w-full h-10 bg-surface animate-pulse rounded' />
          <div className='w-full h-10 bg-surface animate-pulse rounded' />
        </section>
      </section>
    );
  }

  if (!collectionData || collectionData.length === 0) {
    return (
      <section className='flex flex-col w-full h-fit justify-start items-start p-5 rounded-static-frame bg-base gap-5'>
        <SectionHeader size='lg' text='컬렉션' />
        <section className='flex flex-col w-full h-fit justify-center items-start gap-1'>
          <div className='text-additive typo-body-key'>저장된 북마크가 없습니다.</div>
        </section>
      </section>
    );
  }

  return (
    <section className='flex flex-col w-full h-fit justify-start items-start p-5 rounded-static-frame bg-base gap-5'>
      <SectionHeader size='lg' text='컬렉션' />
      <section className='flex flex-col w-full h-fit justify-center items-start gap-1'>
        {collectionData.map((item) => (
          <SideTabItemCustom
            key={item.id}
            peak={item.peak}
            icon={item.icon}
            className='w-full'
          >
            <div className='flex w-full h-fit justify-between items-center'>
              <span>{item.label}</span>
              <span className='text-additive'>{`${item.value}개`}</span>
            </div>
          </SideTabItemCustom>
        ))}
      </section>
    </section>
  );
};


