import { CircleCheck } from 'lucide-react';
import toast from 'react-hot-toast';

export const showToast = {
  success: (msg: string) => {
    toast.dismiss();
    toast.success(msg);
  },
  error: (msg: string) => {
    toast.dismiss();
    toast.error(msg);
  },
  event: (msg: string) => {
    toast.dismiss();
    toast.custom((t) => (
      <div className='flex items-center gap-2 p-4 mt-5  rounded-lg border-2 border-gray-200 bg-white animate-bounce'>
        <span className='text-md font-medium text-black'>{msg}</span>
      </div>
    ));
  },
};
