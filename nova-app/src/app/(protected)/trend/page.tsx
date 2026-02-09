'use client';

import { useGetKeywordTop } from '@/features/trend/api';
import { useBarKeywordStore } from '@/features/trend/model/useBarKeywordTop';
import { CategoriesKeyword, KeywordTop, TrendChart, BarChart } from '@/features/trend/ui';
import { Header, PageHeader, SelectionChip } from '@/shared/ui';
import { ChartBar } from 'lucide-react';

const TrendPage = () => {
  const { data } = useGetKeywordTop();
  const { keyword } = useBarKeywordStore();

  const categoryName = keyword?.keyword ? keyword?.keyword : '';
  console.log(data);

  return (
    <div className='md:px-5 p-4 '>
      <PageHeader text='트렌드' icon={ChartBar} className='p-0 mb-4 md:-mx-1' />
      {/* 트렌드차트 */}
      <section className='rounded-static-frame bg-base p-5 flex flex-col gap-4 mb-4 md:gap-5'>
        <SelectionChip
          isShowChevron={false}
          label='최근 7일'
          size={'md'}
          style={'surface'}
          selected={true}
          className='w-fit'
        />
        <Header
          size='md'
          label='키워드 트렌드 차트'
          description='선택한 키워드의 시간별 언급 빈도'
        />
        <TrendChart />
      </section>

      {/* 인기키워드 */}
      <section className='rounded-static-frame bg-base p-5 flex flex-col gap-4 mb-4 md:gap-5'>
        <KeywordTop />
      </section>

      <section className='rounded-static-frame bg-base p-5 mb-4'>
        <Header
          size='md'
          label={` ${categoryName} 카테고리 내 키워드 언급량`}
          description='전체 언급 수 기준'
          className='break-keep'
        />
        <BarChart />
      </section>
      {/* 카테고리 키워드 */}
      <CategoriesKeyword />
    </div>
  );
};

export default TrendPage;
