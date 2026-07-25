import Rectangle from "../rectangle"

const JuzAndPageSkeleton = () => {
  return (
    <div className="w-full grid grid-cols-1 gap-6 mt-4 overflow-hidden">
        {Array.from({ length: 5 }).map((_, index) => (
          <Rectangle
            key={index}
            width="auto"
            height="100px"
            borderRadius="0 1.3rem"
          />
        ))}
      </div>
  )
}

export default JuzAndPageSkeleton