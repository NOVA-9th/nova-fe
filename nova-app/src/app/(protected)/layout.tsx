import { HeaderBar, SideBar } from '@/widgets/layouts';
import { FloatingBar } from '@/widgets/layouts';

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='mx-auto flex h-dvh max-w-360 flex-col overflow-hidden md:border-l md:border-r border-outline'>
      <HeaderBar />

      <div className='flex min-h-0 flex-1'>
        <SideBar />
        <main className='min-w-0 flex-1 overflow-y-auto overscroll-none bg-alternative md:mr-4 mb-17.5 lg:mb-4 rounded-static-frame border border-outline no-scrollbar'>
          {children}
        </main>
      </div>
      <FloatingBar />
    </div>
  );
};

export default ProtectedLayout;
