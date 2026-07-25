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
import { MdTune } from "react-icons/md";
import { RiTranslateAi2 } from "react-icons/ri";
import SearchbarGO from "@/components/common/SearchBar/searchbarGo";
import Breadcrumb from "@/components/common/Breadcrumb/breadcrumb";

interface IndexCardProps {
  collectionName?: string;
}

const IndexCard = ({ collectionName }: IndexCardProps) => {
  return (
    <div className="flex justify-center overflow-x-hidden">
      <div className="flex w-full max-w-[1440px] justify-center items-center">
        <div className="w-[90%] flex flex-col text-justify mt-14 mx-0 mb-4 py-8 px-12 bg-white rounded-[20px] shadow-[rgba(0,0,0,0.35)_0px_5px_15px] max-[480px]:px-6">
          <div className="flex items-center w-full gap-4 mb-8">
            <SearchbarGO />
            <MdTune className="w-8 h-8 cursor-pointer max-[973px]:w-[1.2rem] max-[973px]:h-[1.2rem]" />
            <RiTranslateAi2 className="w-8 h-8 cursor-pointer max-[973px]:w-[1.2rem] max-[973px]:h-[1.2rem]" />
          </div>
          <Breadcrumb collectionName={collectionName} />
        </div>
      </div>
    </div>
  );
};

export default IndexCard;
