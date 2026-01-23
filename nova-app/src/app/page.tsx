import { HeaderBar, SideBar } from '@/widgets/layouts';

const page = () => {
  return (
    <div className='h-dvh grid grid-rows-[auto_1fr]'>
      <HeaderBar />
      <div className='grid grid-cols-[320px_1fr]'>
        <SideBar />
        <main className='overflow-auto p-4 bg-alternative'>컨텐츠</main>
      </div>
    </div>
  );
};

export default page;
