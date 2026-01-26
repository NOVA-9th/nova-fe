interface TitleTextProps {
  title: string;
  subTitle: string;
}

export const TitleText = ({ title, subTitle }: TitleTextProps) => {
  return (
    <div className='mb-5'>
      <h2 className='typo-headline-strong mb-1'>{title}</h2>
      <h5 className='typo-body-base'>{subTitle}</h5>
    </div>
  );
};
