import { TrendChart } from '@/features/trend/ui/TrendChart';
import { SectionHeader, SelectionChip } from '@/shared/ui';
import { ChartBar } from 'lucide-react';

const TrendPage = () => {
  return (
    <div className='px-5 py-4'>
      <header className='flex pb-4 w-full rounded-static-frame bg-alternative'>
        <SectionHeader text='트렌드' size='sm' leftIcon={ChartBar} />
      </header>

      <section className='rounded-2xl bg-static p-5'>
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
        <div className='mb-5'>
          <h2 className='typo-headline-strong mb-1'>키워드 트렌드 차트</h2>
          <h5 className='typo-body-base'>선택한 키워드의 시간별 언급 빈도</h5>
        </div>
        <TrendChart />
      </section>
      {/* <div className='flex flex-col w-full h-full justify-start items-center bg-alternative'>
        <section className='flex w-full h-full justify-center items-center px-5 pb-5 gap-4'>
          asdasd
        </section>
      </div> */}
    </div>
  );
};

export default TrendPage;
