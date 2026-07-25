import React from 'react'
import Rectangle from '../rectangle'

const SurahSkeleton = () => {
  return (
    <div className="w-full grid grid-cols-3 gap-6 mt-4 max-[1000px]:grid-cols-2 max-[1000px]:gap-4 max-[600px]:grid-cols-1 max-[600px]:gap-4">
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

export default SurahSkeleton