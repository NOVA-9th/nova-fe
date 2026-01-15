import { Button } from '@/shared/ui/action/button/Button';

const testPage = () => {
  return (
    <div className='bg-base flex min-h-dvh flex-col items-center justify-center gap-5 rounded-md px-4 text-xl'>
      안녕하세요
      <p className='text-footnote-key text-data-peak border-outline py-padding-regular px-padding-bold rounded-interactive-default inline-flex items-center justify-center border'>
        hi
      </p>
      <p className='hover:hovered hover:bg-[color-mix()]  text-callout-key danger text-data-base   size-lg py-padding-regular px-padding-bold border border-amber-200'>
        asdasda
      </p>
      <Button label='label' size={'sm'} peak={true} style={'surface'} />
      <Button label='hover' size={'sm'} peak={false} style={'surface'} />
      <Button label='label' size={'sm'} peak={true} style={'accent'} className='hover:hoverd' />
      <Button label='label' size={'md'} peak={true} style={'accent'} />
      <Button label='label' size={'lg'} peak={true} style={'accent'} />
    </div>
  );
};

export default testPage;
