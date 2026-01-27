import { keyword_data } from '@/features/trend/mock/keyword';
import { KEYWORDS } from '@/features/trend/mock/topKeyword';
import { BarChart } from '@/features/trend/ui/BarChart';
import { TitleText } from '@/features/trend/ui/TitleText';
import { TrendChart } from '@/features/trend/ui/TrendChart';
import { Button, SectionHeader, SelectionChip, TextBadge } from '@/shared/ui';
import { cn } from '@/shared/utils/cn';
import { ChartBar } from 'lucide-react';

const gridCols = 'grid grid-cols-[0.95fr_2.86fr_2.86fr_1.43fr_1.35fr_0.55fr] gap-x-[20px]';

const TrendPage = () => {
  return (
    <div className='px-5 py-4 overflow-x-auto '>
      <header className='flex pb-4 w-full rounded-static-frame bg-alternative'>
        <SectionHeader text='트렌드' size='sm' leftIcon={ChartBar} />
      </header>
      {/* 트렌드차트 */}
      <section className='rounded-2xl bg-static p-5 mb-4'>
        <SelectionChip
          isShowChevron={false}
          label='최근 7일'
          size={'md'}
          style={'surface'}
          selected={true}
          className='mb-4'
        />

        <TitleText title='키워드 트렌드 차트' subTitle='선택한 키워드의 시간별 언급 빈도' />
        <TrendChart />
      </section>

      {/* 인기키워드 */}
      <section className='rounded-2xl bg-static p-5 mb-4'>
        <TitleText
          title='인기 키워드 TOP 10'
          subTitle='아래의 표를 클릭하여 비교할 키워드를 추가하세요'
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
            {KEYWORDS.map((item) => (
              <div
                key={item.rank}
                className={cn(
                  `${gridCols} px-8 py-3 typo-callout-base  text-optional border-b border-outline items-center`,
                  item.rank === 1 && 'bg-surface  text-base-color border-black',
                  item.rank === 2 && 'bg-alternative  text-base-color border-black',
                  item.rank === 3 && 'bg-surface  text-base-color ',
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
                <Button label='취소' style='surface' peak={true} size='sm' />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='rounded-2xl bg-static p-5 mb-4'>
        <TitleText title='카테고리 내 키워드 언급량' subTitle='전체 언급 수 기준' />
        <BarChart />
      </section>
      {/* 키워드 */}
      <section className='grid grid-cols-2 gap-4'>
        {keyword_data.map((item) => {
          return (
            <div className='rounded-2xl bg-static p-5 pb-4' key={item.title}>
              <h6 className=' text-optional typo-headline-strong'>{item.title}</h6>
              <p className='typo-subhead-base text-inactive line-clamp-1 text-ellipsis overflow-hidden'>
                {item.content}
              </p>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default TrendPage;
