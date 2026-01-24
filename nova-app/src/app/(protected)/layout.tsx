import { HeaderBar, SideBar } from '@/widgets/layouts';

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-dvh grid grid-rows-[auto_1fr] border-l border-r border-outline max-w-360 mx-auto'>
      <HeaderBar />
      <div className='grid grid-cols-[320px_1fr]'>
        <SideBar />
        <main className='bg-base bg-alternative rounded-static-frame mr-4 mb-4 border border-outline'>
          {children}
        </main>
      </div>
    </div>
  );
};

export default ProtectedLayout;
