export const Loading = () => {
  return (
    <div className="h-full w-full min-h-screen bg-white bg-[url('/bg.png')] flex flex-col items-center justify-center">
      <div className="max-w-3xl text-center flex ">
        <video src="/logo.mp4" autoPlay loop muted className="h-20" />
        <h1 className="text-4xl md:text-7xl font-bold mb-6 bg-white rounded-lg">
          Loading...
        </h1>
      </div>
    </div>
  );
};
