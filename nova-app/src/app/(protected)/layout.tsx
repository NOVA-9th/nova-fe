const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col w-screen h-screen justify-start items-center bg-alternative'>
      <div className='h-19 w-full rounded-lg bg-static'></div>
      <div className='flex flex-1 justify-center items-center w-full bg-static'>
        <div className='w-80'></div>
        {children}
      </div>
    </div>
  );
};

export default ProtectedLayout;
