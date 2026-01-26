import { KEYWORD_TITLE } from '@/features/trend/constants/trendTop';
import { keyword_data } from '@/features/trend/mock/keyword';
import { KEYWORDS } from '@/features/trend/mock/topKeyword';
import { BarChart } from '@/features/trend/ui/BarChart';
import { TitleText } from '@/features/trend/ui/TitleText';
import { TrendChart } from '@/features/trend/ui/TrendChart';
import { Button, SectionHeader, SelectionChip, TextBadge } from '@/shared/ui';
import clsx from 'clsx';
import { ChartBar } from 'lucide-react';

const TrendPage = () => {
  return (
    <div className='px-5 py-4 overflow-x-auto '>
      <header className='flex pb-4 w-full rounded-static-frame bg-alternative'>
        <SectionHeader text='트렌드' size='sm' leftIcon={ChartBar} />
      </header>
      {/* 트렌드차트 */}
      <section className='rounded-2xl bg-static p-5 mb-4'>
        <div className='gap-2 flex mb-4'>
          <SelectionChip
            isShowChevron={false}
            label='최근 7일'
            size={'md'}
            style={'surface'}
            selected={true}
          />
          <SelectionChip
            isShowChevron={false}
            label='최근 1개월'
            size={'md'}
            style={'surface'}
            selected={false}
          />
          <SelectionChip
            isShowChevron={false}
            label='최근 3개월'
            size={'md'}
            style={'surface'}
            selected={false}
          />
        </div>

        <TitleText title='키워드 트렌드 차트' subTitle='선택한 키워드의 시간별 언급 빈도' />
        <TrendChart />
      </section>
      {/* 인기키워드 */}
      <section className='rounded-2xl bg-static p-5 mb-4'>
        <TitleText
          title='인기 키워드 TOP 10'
          subTitle='아래의 표를 클릭하여 비교할 키워드를 추가하세요'
        />
        <div className='  border-outline rounded-interactive-default border'>
          <table className='w-full table-fixed'>
            <thead className='text-optional bg-surface rounded-interactive-default '>
              <tr>
                {KEYWORD_TITLE.map(({ label, align }) => (
                  <th
                    key={label}
                    className={clsx(
                      'px-4 py-3 typo-footnote-base',
                      align === 'right' && 'text-right',
                      align === 'center' && 'text-center',
                      align === 'left' && 'text-left',
                    )}
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {KEYWORDS.map((item) => (
                <tr key={item.rank} className='border-t border-slate-100 typo-callout-base '>
                  <td className='px-4 py-3 text-base-color '>{item.rank}</td>
                  <td className='px-4 py-3 '>{item.keyword}</td>
                  <td className='px-4 py-3 text-base-color'>{item.category}</td>
                  <td className='px-4 py-3 text-right'>{item.count.toLocaleString()}</td>

                  <td className='px-4 py-3 '>
                    <TextBadge
                      text={`+${item.changeRate}%`}
                      size={'md'}
                      variant={'surface'}
                      peak={false}
                      className='w-fit'
                    />
                  </td>
                  <td className='px-4 py-3 text-center'>
                    <Button label='선택' style={'surface'} peak={true} size={'sm'} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className='rounded-2xl bg-static p-5 mb-4'>
        <TitleText title='기술 스택 카테고리별 순위' subTitle='전체 언급 수 기준' />
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
