import Rectangle from "../rectangle";

const shimmer = "bg-[linear-gradient(90deg,#ececec_25%,#f5f5f5_50%,#ececec_75%)] bg-[length:200%_100%] animate-[shimmer_1.5s_linear_infinite]";

/** Matches the layout of DuaCards + DailyDhikr grids so nothing jumps once real data arrives. */
const SupplicationHomeSkeleton = () => {
  return (
    <div>
      {/* Featured DuaCards row */}
      <div className="flex justify-center overflow-x-hidden bg-[linear-gradient(180deg,#fefefe_0%,#fafaf7_100%)] py-16 px-6 max-[480px]:py-10 max-[480px]:px-4">
        <div className="flex justify-center w-full max-w-[1300px]">
          <div className="flex justify-center items-stretch gap-8 w-full max-[900px]:flex-col max-[900px]:items-center max-[900px]:gap-6">
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col flex-1 max-w-[560px] min-h-[340px] rounded-2xl p-6 gap-4 bg-white border border-gray-100"
              >
                <Rectangle height="1.5rem" width="60%" />
                <Rectangle height="2.5rem" width="90%" />
                <Rectangle height="1rem" width="100%" />
                <Rectangle height="1rem" width="80%" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Daily Dhikr grid */}
      <section className="flex justify-center overflow-x-hidden py-16 px-6 max-md:py-12 max-md:px-4">
        <div className="flex flex-col w-full max-w-[1300px]">
          <div className="mb-10 pl-2">
            <Rectangle height="2rem" width="220px" />
          </div>
          <div className="grid grid-cols-4 gap-8 max-[1100px]:grid-cols-3 max-md:grid-cols-2 max-md:gap-4 max-[480px]:grid-cols-2 max-[480px]:gap-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex flex-col rounded-[14px] overflow-hidden bg-white border border-gray-100">
                <div className={`${shimmer} w-full aspect-[3/2]`} />
                <div className="py-[0.85rem] px-4">
                  <Rectangle height="1rem" width="80%" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SupplicationHomeSkeleton;
