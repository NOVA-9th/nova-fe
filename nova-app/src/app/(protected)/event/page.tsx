'use client';

import { PageHeader } from '@/shared/ui';
import { Ticket } from 'lucide-react';
import { useEventStore } from '@/features/event/model/useEventStore';

import { RoleSelectContainer } from '@/features/event/ui/RoleSelectContainer';
import { EventContainer } from '@/features/event/ui/EventContainer';
import { ResultContainer } from '@/features/event/ui/ResultContainer';

const EventPage = () => {
  const phase = useEventStore((s) => s.phase);

  return (
    <div className='flex flex-col h-full'>
      <PageHeader text='이벤트' icon={Ticket} />

      <div className='flex-1 flex items-center justify-center md:px-5 px-4 pb-5'>
        <div className='w-full h-full flex justify-center items-center bg-base rounded-static-frame border border-outline'>
          {phase === 'ROLE' && <RoleSelectContainer />}
          {phase === 'QUIZ' && <EventContainer />}
          {phase === 'RESULT' && <ResultContainer />}
        </div>
      </div>
    </div>
  );
};

export default EventPage;
