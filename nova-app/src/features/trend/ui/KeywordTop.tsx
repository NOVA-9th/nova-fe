'use client';
import { useGetKeywordTop } from '@/features/trend/api/trend';
import { useKeywordStore } from '@/features/trend/model/useKeywordTop';
import { getCategory } from '@/features/trend/utils/getCategory';
import { Button, Header, TextBadge } from '@/shared/ui';
import { cn } from '@/shared/utils/cn';
import { showToast } from '@/shared/utils/toast';

export const KeywordTop = () => {
  const { data } = useGetKeywordTop();

  const gridCols =
    'lg:grid lg:grid-cols-[0.95fr_2.86fr_2.86fr_1.43fr_1.35fr_0.55fr] lg:gap-x-[20px]';

  const { keywords, toggleKeyword } = useKeywordStore();

  return (
    <>
      <Header
        size='md'
        label='인기 키워드 TOP 10'
        description='아래의 표를 클릭하여 비교할 키워드를 추가하세요'
      />

      <div className='border-outline rounded-interactive-default border '>
        <div
          className={cn(
            'flex justify-between items-center p-3 bg-peak text-white typo-body-strong rounded-t-interactive-default',
            gridCols,
            'lg:px-8 lg:py-3',
          )}
        >
          <div className='w-10 lg:w-auto text-center'>순위</div>
          <div className='flex-1 w-30 lg:flex-none lg:w-auto text-left '>키워드</div>
          <div className='hidden lg:block  text-center lg:w-auto'>카테고리</div>
          <div className='hidden lg:block text-center lg:w-auto'>언급수</div>
          <div className='w-12.5 lg:w-auto text-center  lg:text-left mr-3 lg:mr-0'>변화율</div>
          <div className='w-10 text-center'>선택</div>
        </div>
        {data?.trends?.map((item, idx) => {
          const isSelected = keywords?.includes(item.keyword);
          return (
            <div
              key={idx}
              className={cn(
                'flex  items-center p-3 lg:px-8 lg:py-3 relative',
                gridCols,
                'typo-callout-base text-optional',
                'border-b border-outline ',
                isSelected && [
                  'z-10 bg-surface text-base-color border-black',
                  'before:absolute before:-top-px before:left-0 before:w-full before:h-px ',
                ],
              )}
            >
              <p className=' text-center w-10 lg:w-auto'>{item.rank}</p>
              <p className='flex-1 lg:flex-none  lg:w-auto  text-left  '>{item.keyword}</p>
              <p className='hidden lg:block lg:w-auto text-center '>{getCategory(item.keyword)}</p>
              <p className='hidden lg:block lg:w-auto text-center '>
                {item.mentionCount.toLocaleString()}
              </p>
              <TextBadge
                text={`${item.growthRate}%`}
                size='md'
                variant={item.growthRate < 0 ? 'accent' : 'data'}
                peak={false}
                className='w-fit mr-3 lg:mr-0 text-center'
              />
              <Button
                label={isSelected ? '취소' : '선택'}
                style='surface'
                peak={isSelected}
                size='sm'
                onClick={() => {
                  const isMaxLength = toggleKeyword(item.keyword);
                  if (!isMaxLength) {
                    showToast.error('최대 3개까지만 선택할 수 있습니다.');
                  }
                }}
                className='w-fit'
              />
            </div>
          );
        })}
      </div>
    </>
  );
};
