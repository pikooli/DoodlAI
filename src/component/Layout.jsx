export const Layout = ({children}) => {
    return (
      <div className="h-full w-full min-h-screen text-black bg-white flex flex-col items-center justify-center font-cabin">
          {children}
      </div>
    );
  };