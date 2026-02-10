'use client';

import { PageHeader, TextButton } from '@/shared/ui';
import { Bookmark, Download, Folder, Grid2X2Icon, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useBookmarkCountsByInterest, useBookmarkCountsBySourceType } from '@/features/saved/hooks/useBookmarkStatistics';
import { getInterestIcon, mapInterestNameToDisplay } from '@/features/saved/utils/interestMapping';
import { getCardTypeIcon, mapCardTypeNameToDisplay } from '@/features/saved/utils/cardTypeMapping';
import { TextIconButton } from '@/shared/ui/action/TextIconButton';

export const SavedPageHeader = () => {
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
  const { data: interestData } = useBookmarkCountsByInterest();
  const { data: sourceTypeData } = useBookmarkCountsBySourceType();

  const collectionItems = useMemo(() => {
    const counts = interestData?.data?.bookmarkCounts ?? [];
    const totalCount = counts.reduce((sum, item) => sum + item.count, 0);

    return [
      { label: '전체', value: totalCount, icon: Grid2X2Icon },
      ...counts.map((item) => {
        const displayName = mapInterestNameToDisplay(item.interestName);
        return {
          label: displayName,
          value: item.count,
          icon: getInterestIcon(displayName),
        };
      }),
    ];
  }, [interestData]);

  const statsItems = useMemo(() => {
    const counts = sourceTypeData?.data?.bookmarkCounts ?? [];
    const totalCount = counts.reduce((sum, item) => sum + item.count, 0);

    return [
      { label: '전체', value: totalCount, icon: Grid2X2Icon },
      ...counts.map((item) => {
        const displayName = mapCardTypeNameToDisplay(item.cardTypeName);
        return {
          label: displayName,
          value: item.count,
          icon: getCardTypeIcon(displayName),
        };
      }),
    ];
  }, [sourceTypeData]);

  return (
    <>
      <div className='flex w-full items-center justify-between pr-4'>
        <PageHeader text='저장함' icon={Bookmark} />
        <TextButton
          onClick={() => setIsCollectionModalOpen(true)}
          size='lg'
          label='컬렉션'
          leftIcon={Folder}
          style='surface'
          className='flex md:hidden h-11 justify-center items-center whitespace-nowrap px-padding-bold py-padding-regular rounded-interactive-default bg-surface'
        />
      </div>

      {isCollectionModalOpen && (
        <div
          className='fixed bottom-20 inset-0 z-99999999 bg-black/40 md:hidden'
          onClick={() => setIsCollectionModalOpen(false)}
        >
          <div
            className='absolute bottom-0 left-0 right-0 max-h-[80vh] overflow-y-auto rounded-t-2xl bg-base p-5 pb-6'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='mb-4 flex items-center justify-between'>
              <h2 className='typo-subhead-key text-base'>컬렉션</h2>
              <button
                type='button'
                className='rounded-step4 p-1 text-optional'
                onClick={() => setIsCollectionModalOpen(false)}
                aria-label='컬렉션 모달 닫기'
              >
                <X size={18} />
              </button>
            </div>

            <div className='mb-6 flex flex-col gap-1'>
              {collectionItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={`collection-${item.label}`}
                    className='flex items-center justify-between rounded-step4 px-3 py-2.5'
                  >
                    <div className='flex items-center gap-3'>
                      <Icon size={16} className='text-additive' />
                      <span className='typo-callout-key'>{item.label}</span>
                    </div>
                    <span className='typo-callout-base text-additive'>{item.value}개</span>
                  </div>
                );
              })}
            </div>

            <div className='border-t border-outline pt-5'>
              <h3 className='mb-3 px-1 typo-subhead-key text-base'>저장함 통계</h3>
              <div className='mb-5 flex flex-col gap-1'>
                {statsItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={`stats-${item.label}`}
                      className='flex items-center justify-between rounded-step4 px-3 py-2.5'
                    >
                      <div className='flex items-center gap-3'>
                        <Icon size={16} className='text-additive' />
                        <span className='typo-callout-key'>{item.label}</span>
                      </div>
                      <span className='typo-callout-base text-additive'>{item.value}개</span>
                    </div>
                  );
                })}
              </div>

              <TextIconButton
                size='lg'
                style='surface'
                peak={true}
                leftIcon={Download}
                label='저장함 내보내기'
                className='w-full gap-1.5'
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};


