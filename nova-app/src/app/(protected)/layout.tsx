import { HeaderBar, SideBar } from '@/widgets/layouts';

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='mx-auto flex h-dvh max-w-360 flex-col overflow-hidden border-l border-r border-outline'>
      <HeaderBar />

      <div className='flex min-h-0 flex-1'>
        <div className='hidden w-80 sm:block'>
          <SideBar />
        </div>
        <main className='min-w-0 flex-1 overflow-y-auto bg-alternative sm:mr-4 sm:mb-4 sm:rounded-static-frame sm:border border-outline no-scrollbar'>
          {children}
        </main>
      </div>
    </div>
  );
};

export default ProtectedLayout;
