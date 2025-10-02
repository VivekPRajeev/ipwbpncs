// loader component to show while comments are loading
const CommentSkeleton = () => {
  return (
    <div className="flex gap-3 relative animate-pulse">
      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1 "></div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-bold text-gray-900">
            <div className="h-4 bg-gray-300 rounded w-1/3 mt-2" />
          </span>
          <div className="h-4 bg-gray-300 rounded w-1/6 mt-2" />
        </div>
        <div className="h-4 bg-gray-300 rounded w-full mt-5" />
        <div className="h-4 bg-gray-300 rounded w-5/6 mt-5" />
      </div>
    </div>
  );
};

export default CommentSkeleton;
