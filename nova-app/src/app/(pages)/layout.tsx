const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex items-center justify-center min-h-screen mx-auto bg-white-full px-4'>
      {children}
    </div>
  );
};

export default PublicLayout;
