import { KeywordSection } from "@/features/saved/ui/keywordSection";


const SavedPage = () => {
  return (
    <div className='flex flex-col w-full h-full justify-start items-center bg-alternative'>
      <div className='h-19 w-full bg-alternative'></div>
      <div className='flex flex-col w-full h-full justify-start items-center bg-alternative'>
        <div className='flex w-full h-full justify-center items-center px-5 gap-4'>
          <div className='flex-2 h-full bg-red-500'>
            <KeywordSection />
          </div>
          <div className='flex-1 h-full bg-blue-500'></div>
        </div>
      </div>
    </div>
  );
};

export default SavedPage;
