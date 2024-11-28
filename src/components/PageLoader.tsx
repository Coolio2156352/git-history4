const PageLoader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800 text-white">
      <div className="text-center">
        <div className="animate-spin rounded-full border-t-4 border-teal-300 border-solid w-16 h-16 mx-auto mb-4"></div>
        <p className="text-2xl font-bold">Loading...</p>
      </div>
    </div>
  );
};

export default PageLoader;
