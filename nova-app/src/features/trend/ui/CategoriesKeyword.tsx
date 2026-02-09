'use client';
import { useGetInterestSkillTop } from '@/features/trend/api/trend';
import { useBarKeywordStore } from '@/features/trend/model/useBarKeywordTop';
import { getCategoryArray } from '@/features/trend/utils/getCategoryArray';
import { cn } from '@/shared/utils/cn';

export const CategoriesKeyword = () => {
  const { toggleCategory, category } = useBarKeywordStore();
  console.log(category);
  const { data: skillData } = useGetInterestSkillTop();
  console.log(skillData);

  const categoryMapData = skillData.rankings.map((item) => {
    const keywordNames = item.keywords.map((k) => k.name);
    // console.log(keywordNames);
    return {
      ...item,
      keywordNames,
      category: getCategoryArray(keywordNames),
    };
  });
  console.log(categoryMapData);

  return (
    <section className='grid grid-cols-2 md:gap-4 gap-2.5 mb-12 md:mb-0'>
      {categoryMapData?.map((item) => {
        const isSelected = category === item.category;
        return (
          <div
            className={cn(
              'rounded-static-frame bg-base md:p-5 px-5 py-2.5 cursor-pointer border border-outline',
              isSelected && 'bg-accent-peak shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]',
            )}
            key={item.rank}
            onClick={() => {
              toggleCategory(item.category);
            }}
          >
            <h6
              className={cn(
                'md:text-left! text-center text-optional typo-body-strong',
                isSelected && 'text-peak',
              )}
            >
              {item.category}
            </h6>
            <p
              className={cn(
                'hidden md:block! typo-subhead-base text-inactive  truncate ',
                isSelected && 'text-peak',
              )}
            >
              {item.keywordNames.join(', ')}
            </p>
          </div>
        );
      })}
    </section>
  );
};
