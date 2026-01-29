import { HeaderBar, SideBar } from '@/widgets/layouts';

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='mx-auto flex h-dvh max-w-360 flex-col overflow-hidden sm:border-l sm:border-r border-outline'>
      <HeaderBar />

      <div className='flex min-h-0 flex-1'>
        <SideBar />
        <main className='min-w-0 flex-1 overflow-y-auto bg-alternative max-sm:mx-4 sm:mr-4 mb-4 rounded-static-frame border border-outline no-scrollbar'>
          {children}
        </main>
      </div>
    </div>
  );
};

export default ProtectedLayout;
