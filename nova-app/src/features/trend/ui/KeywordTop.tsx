'use client';
import { KEYWORDS } from '@/features/trend/mock/topKeyword';
import useCompanyStore from '@/features/trend/model/useKeywordTop';
import { Button, Header, TextBadge } from '@/shared/ui';
import { cn } from '@/shared/utils/cn';

const KeywordTop = () => {
  const gridCols = 'grid grid-cols-[0.95fr_2.86fr_2.86fr_1.43fr_1.35fr_0.55fr] gap-x-[20px]';

  const { keywords, toggleKeyword } = useCompanyStore();
  return (
    <section className='rounded-2xl bg-static p-5 mb-4'>
      <Header
        size='md'
        label='인기 키워드 TOP 10'
        description='아래의 표를 클릭하여 비교할 키워드를 추가하세요'
        className='mb-5'
      />

      <div className='border-outline rounded-interactive-default border '>
        <div
          className={`${gridCols} px-8 py-3 bg-peak text-white  typo-body-strong  rounded-t-interactive-default items-center `}
        >
          <div className='text-center'>순위</div>
          <div className='text-left'>키워드</div>
          <div className='text-center'>카테고리</div>
          <div className='text-center'>언급수</div>
          <div className='text-left'>변화율</div>
          <div className='text-center'>선택</div>
        </div>
        <div className='divide-y divide-outline'>
          {KEYWORDS.map((item) => {
            const isSelected = keywords.includes(item.keyword);
            return (
              <div
                key={item.rank}
                className={cn(
                  `${gridCols} px-8 py-3 typo-callout-base  text-optional border-b border-outline items-center`,
                  isSelected && 'bg-surface  text-base-color border-black',
                )}
              >
                <p className=' text-center'>{item.rank}</p>
                <p className='text-left'>{item.keyword}</p>
                <p className=' text-center'>{item.category}</p>
                <p className='text-center'>{item.count.toLocaleString()}</p>
                <TextBadge
                  text={`${item.changeRate}%`}
                  size='md'
                  variant={item.changeRate.slice(0, 1) === '+' ? 'data' : 'accent'}
                  peak={false}
                  className='w-fit items-left'
                />
                <Button
                  label={isSelected ? '취소' : '선택'}
                  style='surface'
                  peak={isSelected}
                  size='sm'
                  onClick={() => toggleKeyword(item.keyword)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default KeywordTop;
