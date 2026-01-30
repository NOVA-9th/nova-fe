import { CategoriesKeyword, KeywordTop, TrendChart, BarChart } from '@/features/trend/ui';
import { Header, PageHeader, SelectionChip } from '@/shared/ui';
import { ChartBar } from 'lucide-react';

const TrendPage = () => {
  return (
    <div className='px-5 py-4 overflow-x-auto '>
      <PageHeader text='트렌드' icon={ChartBar} className='p-0 mb-4 -mx-1' />
      {/* 트렌드차트 */}
      <section className='rounded-static-frame bg-base p-5 mb-4'>
        <SelectionChip
          isShowChevron={false}
          label='최근 7일'
          size={'md'}
          style={'surface'}
          selected={true}
          className='mb-5'
        />
        <Header
          size='md'
          label='키워드 트렌드 차트'
          description='선택한 키워드의 시간별 언급 빈도'
        />
        <TrendChart />
      </section>

      {/* 인기키워드 */}
      <KeywordTop />

      <section className='rounded-static-frame bg-base p-5 mb-4'>
        <Header
          size='md'
          label='카테고리 내 키워드 언급량'
          description='전체 언급 수 기준'
          className='mb-3'
        />
        <BarChart />
      </section>
      {/* 카테고리 키워드 */}
      <CategoriesKeyword />
    </div>
  );
};

export default TrendPage;
