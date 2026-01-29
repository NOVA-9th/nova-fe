import { MessageCircleWarning, CircleCheck } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

const Toast = () => {
  return (
    <Toaster
      position='top-center'
      toastOptions={{
        duration: 3000,
        success: {
          icon: <CircleCheck className='h-6 w-6 text-[#00BD7599]' />,
          style: {
            background: '#FFFFFF',
            color: '#00BD75',
            borderRadius: '10px',
            border: '2px solid rgba(0, 189, 117, 0.3)',
            padding: '12px 16px',
            fontSize: '16px',
            fontWeight: '400',
            lineHeight: '16px',
            whiteSpace: 'nowrap',
            wordBreak: 'keep-all',
            minWidth: '200px',
          },
        },
        error: {
          icon: <MessageCircleWarning className='h-6 w-6 text-[#F04C5A]' />,
          style: {
            background: '#FFFFFF',
            color: '#F04C5A',
            borderRadius: '10px',
            border: '2px solid #F04C5A80',
            padding: '12px 16px',
            fontSize: '16px',
            fontWeight: '400',
            lineHeight: '16px',
            whiteSpace: 'nowrap',
            wordBreak: 'keep-all',
            minWidth: '200px',
          },
        },
      }}
      containerStyle={{
        top: '60px',
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    />
  );
};

export default Toast;
