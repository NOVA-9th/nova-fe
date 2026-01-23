const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col w-screen h-screen justify-start items-center bg-alternative'>
      <div className='h-19 w-full bg-white'></div>
      <div className='flex flex-1 justify-center items-center w-full'>{children}</div>
    </div>
  );
};

export default ProtectedLayout;
