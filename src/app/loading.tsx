export default function Loading() {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center">
          
          <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
  
          
          <p className="text-lg font-semibold text-gray-700 mt-3">Loading...</p>
        </div>
      </div>
    );
  }
  