import Rectangle from "./rectangle";

const ArticleCardSkeleton = () => {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="flex flex-col rounded-[14px] overflow-hidden bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
          <Rectangle width="100%" height="180px" borderRadius="0px" />
          <div className="flex flex-col gap-2 p-4">
            <Rectangle width="40%" height="12px" borderRadius="4px" />
            <Rectangle width="90%" height="18px" borderRadius="4px" />
            <Rectangle width="70%" height="14px" borderRadius="4px" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArticleCardSkeleton;
