export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="relative w-12 h-12">
        <div className="absolute h-12 w-12 rounded-full animate-spin bg-gradient-to-b from-accent-500 to-transparent"></div>
        <div className="absolute flex items-center justify-center bg-white rounded-full h-[44px] w-[44px] top-1 left-1"></div>
      </div>
    </div>
  );
}
