import Rectangle from "../rectangle"
import styles from "./juzAndPageSkeleton.module.css"

const JuzAndPageSkeleton = () => {
  return (
    <div className={styles.contentGrid}>
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