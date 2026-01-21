import { CircleQuestionMark } from 'lucide-react';
import { TextBadge } from '..'


interface EvidenceCardProps {
  evidenceSource: string;
  content: string;
}

const EvidenceCard = ({ evidenceSource, content }: EvidenceCardProps) => {
  return (
    <div className='flex flex-col w-full h-fit justify-start items-start gap-4'>
      <TextBadge
        size='lg'
        variant='surface'
        peak={false}
        icon={CircleQuestionMark}
        text={evidenceSource}
      />
      <span className='typo-body-base text-base line-clamp-2'>{content}</span>
    </div>
  )
}

export default EvidenceCard;