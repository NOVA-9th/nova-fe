import { SectionHeader } from "@/shared/ui";
import { User } from "lucide-react";


const ProfilePage = () => {
  return (
    <>
      <header className='flex h-15 p-4 w-full rounded-static-frame bg-alternative'>
        <SectionHeader text='저장함' peak={true} size='sm' leftIcon={User} className='px-2' />
      </header>
      <div className='flex w-full h-full justify-start items-center bg-alternative px-5 pb-5 sm:gap-4 max-sm:px-3 max-sm:pb-4 '>
        <section className='flex flex-col w-full h-full justify-start items-center'>

        </section>
        <aside className='flex flex-col w-full h-full justify-start items-center'>

        </aside>
      </div>
    </>
  );
};

export default ProfilePage;
