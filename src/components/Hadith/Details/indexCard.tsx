// // import { lateef } from "@/app/font/font";
// "use client";
// import styles from "./indexCard.module.css";
// import { MdTune } from "react-icons/md";
// import { RiTranslateAi2 } from "react-icons/ri";
// import SearchbarGO from "@/components/common/SearchBar/searchbarGo";
// import Breadcrumb from "@/components/common/Breadcrumb/breadcrumb";

// const IndexCard = () => {
//   return (
//     <div className={styles.Wrapper}>
//       <div className={styles.Container}>
//         <div className={styles.content}>
//           <div className={styles.sublinks}>
//             <SearchbarGO />
//             <MdTune />
//             <RiTranslateAi2 />
//           </div>
//           <Breadcrumb />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default IndexCard;


"use client";
import styles from "./indexCard.module.css";
import { MdTune } from "react-icons/md";
import { RiTranslateAi2 } from "react-icons/ri";
import SearchbarGO from "@/components/common/SearchBar/searchbarGo";
import Breadcrumb from "@/components/common/Breadcrumb/breadcrumb";

interface IndexCardProps {
  collectionName?: string;
}

const IndexCard = ({ collectionName }: IndexCardProps) => {
  return (
    <div className={styles.Wrapper}>
      <div className={styles.Container}>
        <div className={styles.content}>
          <div className={styles.sublinks}>
            <SearchbarGO />
            <MdTune />
            <RiTranslateAi2 />
          </div>
          <Breadcrumb collectionName={collectionName} />
        </div>
      </div>
    </div>
  );
};

export default IndexCard;
