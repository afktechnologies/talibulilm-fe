import Rectangle from "./rectangle";
import Circle from "./circle";

const ScholarTimelineSkeleton = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-12 flex flex-col gap-8">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className={`flex items-start gap-4 w-full lg:max-w-[calc(50%-2.5rem)] ${
            index % 2 === 0 ? "" : "lg:self-end"
          }`}
        >
          <Circle size="64px" className="flex-shrink-0" />
          <div className="flex flex-col gap-2 flex-1">
            <Rectangle width="70%" height="18px" borderRadius="4px" />
            <Rectangle width="45%" height="14px" borderRadius="4px" />
            <Rectangle width="90%" height="12px" borderRadius="4px" />
            <Rectangle width="60%" height="12px" borderRadius="4px" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScholarTimelineSkeleton;
