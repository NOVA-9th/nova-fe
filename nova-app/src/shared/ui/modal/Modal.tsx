'use client';

import { cn } from '@/shared/utils/cn';

interface ModalProps {
  content: string;
  onConfirm: () => void;
  onCancel: () => void;
  /** 확인 버튼 문구. 기본값 '확인' */
  confirmLabel?: string;
  /** 모달 컨테이너에 적용할 추가 className */
  className?: string;
}

export const Modal = ({
  content,
  onConfirm,
  onCancel,
  confirmLabel = '확인',
  className,
}: ModalProps) => {
  return (
    <div
      className='fixed inset-0 bg-black/40 flex justify-center items-center z-99999'
      onClick={onCancel}
    >
      <div
        className={cn(
          'bg-base rounded-[20px] flex flex-col overflow-hidden p-5 w-80 text-base-color  z-50',
          className,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <p className='text-center typo-headline-strong py-6 whitespace-pre-line'>{content}</p>
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
