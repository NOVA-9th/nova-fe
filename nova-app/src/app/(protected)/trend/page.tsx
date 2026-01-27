import { BarChart } from '@/features/trend/ui/BarChart';
import { CategoriesKeyword } from '@/features/trend/ui/CategoriesKeyword';
import { KeywordTop } from '@/features/trend/ui/KeywordTop';
import { TitleText } from '@/features/trend/ui/TitleText';
import { TrendChart } from '@/features/trend/ui/TrendChart';
import { SectionHeader, SelectionChip } from '@/shared/ui';
import { ChartBar } from 'lucide-react';

const TrendPage = () => {
  return (
    <div className='px-5 py-4 overflow-x-auto '>
      <header className='flex pb-4 w-full rounded-static-frame bg-alternative'>
        <SectionHeader text='트렌드' size='sm' leftIcon={ChartBar} className='px-[6px]' />
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
      <KeywordTop />

      <section className='rounded-2xl bg-static p-5 mb-4'>
        <TitleText title='카테고리 내 키워드 언급량' subTitle='전체 언급 수 기준' />
        <BarChart />
      </section>
      {/* 카테고리 키워드 */}
      <CategoriesKeyword />
    </div>
  );
};

export default TrendPage;
