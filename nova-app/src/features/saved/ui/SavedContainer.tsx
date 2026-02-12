'use client';

import { KeywordCard, CollectionSection, SavedStatisticsSection, SavedPageHeader } from './index';
import SavedArticleList from '@/app/(protected)/saved/ui/SavedActicle';
import {
  useBookmarkCountsByInterest,
  useBookmarkCountsBySourceType,
} from '../hooks/useBookmarkStatistics';
import { useInfiniteSavedArticles } from '../hooks/useInfiniteSavedArticles';
import { useSavedExport } from '../hooks/useSavedExport';

export const SavedContainer = () => {
  // 모든 API 호출을 컨테이너에서 한 번씩만 처리
  const { data: interestData } = useBookmarkCountsByInterest();
  const { data: sourceTypeData } = useBookmarkCountsBySourceType();
  const savedArticlesQuery = useInfiniteSavedArticles();
  const { exportSavedAsJson, exportSavedAsPdf, isExportingPdf } = useSavedExport(
    savedArticlesQuery.articles,
    savedArticlesQuery.isLoading,
  );

  return (
    <>
      <SavedPageHeader
        interestData={interestData}
        sourceTypeData={sourceTypeData}
        exportSavedAsJson={exportSavedAsJson}
        exportSavedAsPdf={exportSavedAsPdf}
        isExportingPdf={isExportingPdf}
      />
      <div className='flex flex-col xl:flex-row w-full justify-start items-start md:px-5 px-4 pb-5 gap-4'>
        <section className='flex flex-col h-full w-full gap-4 flex-1 min-w-0 overflow-hidden'>
          <KeywordCard />
          <SavedArticleList {...savedArticlesQuery} />
        </section>

        <aside className='hidden xl:flex flex-col w-full xl:w-80 lg:shrink-0 h-full bg-alternative gap-4'>
          <CollectionSection interestData={interestData} />
          <SavedStatisticsSection
            sourceTypeData={sourceTypeData}
            exportSavedAsJson={exportSavedAsJson}
            exportSavedAsPdf={exportSavedAsPdf}
            isExportingPdf={isExportingPdf}
          />
        </aside>
      </div>
    </>
  );
};
