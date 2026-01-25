import { mockArticleData } from '@/features/saved/mocks/articleMockData';
import {
  ArticleCard,
  PageHeader,
  SectionHeader,
  SelectionChip,
  TextBadge,
  TextButton,
} from '@/shared/ui';
import { MessagesSquare, RotateCcw, Newspaper, FileUser, Earth } from 'lucide-react';

const page = () => {
  return (
    <>
      <PageHeader text='피드' icon={MessagesSquare} />
      <section className='grid grid-cols-[1fr_320px] gap-4 px-5 pb-5'>
        <div className='space-y-4'>
          {mockArticleData.map((article) => (
            <ArticleCard key={article.id} articleData={article} />
          ))}
        </div>

        <aside className='w-80 space-y-4'>
          <section className='bg-white rounded-static-frame border border-outline p-5'>
            <div className='flex items-center justify-between mb-5'>
              <SectionHeader size='lg' text='정렬' />
              <TextButton label='초기화' rightIcon={RotateCcw} className='text-optional' />
            </div>
            <div className='flex items-center gap-2'>
              <SelectionChip size='md' label='최신순' selected={true} isShowChevron={false} />
              <SelectionChip label='관련도 순' selected={false} isShowChevron={false} />
            </div>
          </section>
          <section className='bg-white rounded-static-frame border border-outline p-5'>
            <div className='flex items-center justify-between mb-5'>
              <SectionHeader size='lg' text='업로드 기간' />
              <TextButton label='초기화' rightIcon={RotateCcw} className='text-optional' />
            </div>
            <div className='flex items-center gap-2'>
              <SelectionChip label='1일' selected={true} isShowChevron={false} />
              <SelectionChip label='7일' selected={false} isShowChevron={false} />
              <SelectionChip label='30일' selected={false} isShowChevron={false} />
            </div>
          </section>
          <section className='bg-white rounded-static-frame border border-outline p-5 space-y-5'>
            <div className='flex items-center justify-between'>
              <SectionHeader size='lg' text='유형' />
              <TextButton label='초기화' rightIcon={RotateCcw} className='text-optional' />
            </div>
            <div className='flex items-center gap-2'>
              <SelectionChip label='전체' selected={true} isShowChevron={false} icon={Newspaper} />
            </div>
            <div className='flex items-center gap-2'>
              <SelectionChip label='뉴스' selected={true} isShowChevron={false} icon={Newspaper} />
              <SelectionChip label='채용' selected={false} isShowChevron={false} icon={FileUser} />
              <SelectionChip label='커뮤니티' selected={true} isShowChevron={false} icon={Earth} />
            </div>
          </section>
          <section className='bg-white rounded-static-frame border border-outline p-5'>
            <div className='flex items-center justify-between mb-5'>
              <div className='flex items-center gap-2.5'>
                <SectionHeader size='lg' text='키워드 필터' />
                <TextBadge variant='surface' peak={false} size='lg' text='1개' />
              </div>
              <TextButton label='초기화' rightIcon={RotateCcw} className='text-optional' />
            </div>
            <div className='flex items-center gap-2'>
              <SelectionChip label='#React' selected={true} isShowChevron={false} />
              <SelectionChip label='#Server Components' selected={false} isShowChevron={false} />
            </div>
          </section>
        </aside>
      </section>
    </>
  );
};

export default page;
