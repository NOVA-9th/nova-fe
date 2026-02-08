'use client';

interface ModalProps {
  content: string;
  onConfirm: () => void;
  onCancel: () => void;
  /** 확인 버튼 문구. 기본값 '확인' */
  confirmLabel?: string;
}

export const Modal = ({ content, onConfirm, onCancel, confirmLabel = '확인' }: ModalProps) => {
  return (
    <div className='fixed inset-0 bg-black/40 flex justify-center items-center' onClick={onCancel}>
      <div
        className='bg-base rounded-[20px] flex flex-col overflow-hidden p-5 w-80 text-base-color shadow-[1px_-1px_10px_rgba(0,0,0,0.25),0px_4px_4px_rgba(0,0,0,0.25)] z-50'
        onClick={(e) => e.stopPropagation()}
      >
        <p className='text-center typo-headline-strong py-6'>{content}</p>
        <div className='flex items-center justify-center gap-2 typo-body-key'>
          <button
            type='button'
            onClick={onCancel}
            className='flex-1 bg-surface hover:bg-surface active:bg-surface rounded-step4 px-6 py-2.5'
          >
            취소
          </button>
          <button
            type='button'
            onClick={onConfirm}
            className='flex-1 bg-peak hover:bg-peak active:bg-peak text-white rounded-step4 px-6 py-2.5'
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
