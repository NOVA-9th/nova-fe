'use client';
import { KEYWORDS } from '@/features/trend/mock/topKeyword';
import { useCompanyStore } from '@/features/trend/model/useKeywordTop';
import { Button, Header, TextBadge } from '@/shared/ui';
import { cn } from '@/shared/utils/cn';

export const KeywordTop = () => {
  const gridCols =
    'md:grid md:grid-cols-[0.95fr_2.86fr_2.86fr_1.43fr_1.35fr_0.55fr] md:gap-x-[20px]';

  const { keywords, toggleKeyword } = useCompanyStore();
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
            'md:px-8 md:py-3',
          )}
        >
          <div className='w-10 md:w-auto text-center'>순위</div>
          <div className='flex-1 w-30 md:flex-none md:w-auto text-left '>키워드</div>
          <div className='hidden md:block  text-center md:w-auto'>카테고리</div>
          <div className='hidden md:block text-center md:w-auto'>언급수</div>
          <div className='w-12.5 md:w-auto text-center  md:text-left mr-3 md:mr-0'>변화율</div>
          <div className='w-10 text-center'>선택</div>
        </div>
        <div className='divide-y divide-outline'>
          {KEYWORDS.map((item) => {
            const isSelected = keywords.includes(item.keyword);
            return (
              <div
                key={item.rank}
                className={cn(
                  'flex justify-between  items-center border-b border-outline p-3 md:px-8 md:py-3',
                  gridCols,
                  'typo-callout-base text-optional',
                  isSelected && 'bg-surface text-base-color border-black',
                )}
              >
                <p className=' text-center w-10 md:w-auto'>{item.rank}</p>
                <p className='flex-1 md:flex-none  md:w-auto  text-left  '>{item.keyword}</p>
                <p className='hidden md:block md:w-auto text-center '>{item.category}</p>
                <p className='hidden md:block md:w-auto text-center '>
                  {item.count.toLocaleString()}
                </p>
                <TextBadge
                  text={`${item.changeRate}%`}
                  size='md'
                  variant={item.changeRate.slice(0, 1) === '+' ? 'data' : 'accent'}
                  peak={false}
                  className='w-fit mr-3 md:mr-0'
                />
                <Button
                  label={isSelected ? '취소' : '선택'}
                  style='surface'
                  peak={isSelected}
                  size='sm'
                  onClick={() => toggleKeyword(item.keyword)}
                  className='w-fit'
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
