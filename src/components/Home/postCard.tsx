// import { primary_font } from "@/app/font/font";
// import styles from "./recentPost.module.css";
// import Image from "next/image";
// import { SlOptions } from "react-icons/sl";

// interface PostProps {
//   profileImage: string;
//   username: string;
//   timeAgo: string;
//   postImage: string;
//   altText: string;
//   title: string;
//   views: string;
//   source: string;
// }

// const PostCard = ({ profileImage, username, timeAgo, postImage, altText, title, views, source }: PostProps) => {
//   return (
//     <div className={styles.card}>
//       <div className={styles.headings}>
//         <div className={styles.profile}>
//           <div>
//             <Image src={`/Images/${profileImage}`} alt="Profile" width={40} height={40} />
//           </div>
//           <div>
//             <h4 className={primary_font.className}>{username}</h4>
//             {/* <p className={primary_font.className}>{timeAgo}</p> */}
//           </div>
//         </div>
//         {/* <div className={styles.options}>
//         <SlOptions />
//         </div> */}
//       </div>
//       <div className={styles.image}>
//         <Image src={`/Images/${postImage}`} alt={altText} width={550} height={260} />
//       </div>
//       <div>
//         <div className={styles.desp}>
//           <h3 className={primary_font.className}>&quot;{title}&quot;</h3>
//         </div>
//         {/* <div className={styles.details}>
//           <p className={primary_font.className}>{views}</p>
//           <p className={primary_font.className}>{source}</p>
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default PostCard;


// components/PostCard.tsx
"use client";
import { useState } from "react";
import { primary_font } from "@/app/font/font";
import Image from "next/image";
import { IoIosPlay } from "react-icons/io";
// import VideoModal from "../common/Modals/videoModal";
import { RecentPostType } from "@/types/recentPost";
import VideoModal from "../common/Modals/videoModal";

const PostCard: React.FC<RecentPostType> = ({
  profileImage,
  username,
  // timeAgo,
  postImage,
  altText,
  title,
  // views,
  // source,
  videoId,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col w-[550px] h-[420px] bg-white rounded-lg shadow-[rgba(0,0,0,0.24)_0px_3px_8px] max-[973px]:w-[450px] max-[973px]:h-[300px] max-md:w-[550px] max-md:h-[400px] max-[600px]:w-[450px] max-[600px]:h-[350px] max-[500px]:w-[400px] max-[500px]:h-[300px] max-[450px]:w-[350px] max-[450px]:h-[300px] max-[380px]:w-[300px] max-[380px]:h-[210px]">
      <div className="flex mt-4 mr-8 mb-[0.8rem] ml-8 justify-between items-center max-[380px]:mt-2 max-[380px]:mr-4 max-[380px]:mb-2 max-[380px]:ml-4">
        <div className="flex justify-center items-center gap-[0.8rem] text-[1rem] max-[380px]:text-[0.8rem]">
            <Image
              src={`/Images/${profileImage}`}
              alt="Profile"
              width={40}
              height={40}
              className="max-[380px]:w-[1.5rem] max-[380px]:h-[1.5rem]"
            />
            <h4 className={primary_font.className}>{username}</h4>
        </div>
      </div>
      <div className="relative flex justify-center items-center cursor-pointer mt-0 mr-8 mb-2 ml-8 max-[380px]:mt-0 max-[380px]:mr-4 max-[380px]:mb-[0.8rem] max-[380px]:ml-4">
        <Image
          src={`/Images/${postImage}`}
          alt={altText}
          width={550}
          height={260}
          className="max-[973px]:w-[450px] max-[973px]:h-[160px] max-md:w-[550px] max-md:h-[260px] max-[600px]:w-[450px] max-[600px]:h-[200px] max-[500px]:w-[400px] max-[500px]:h-[160px] max-[450px]:w-[350px] max-[450px]:h-[160px] max-[380px]:w-[300px] max-[380px]:h-[100px]"
        />
        {/* {videoId && ( */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#c1121f] bg-white rounded-full p-4 flex justify-center items-center transition-[background] duration-300 ease hover:bg-[#c1121f] hover:text-white max-[973px]:p-2 max-md:p-[0.8rem] max-[600px]:p-2 max-[450px]:p-2 max-[380px]:p-2"
            onClick={() => setIsOpen(true)}
          >
            <IoIosPlay className="w-10 h-10 max-[973px]:w-8 max-[973px]:h-8 max-md:w-10 max-md:h-10 max-[600px]:w-8 max-[600px]:h-8 max-[380px]:w-6 max-[380px]:h-6" />
          </div>
        {/* )} */}
      </div>
      <div>
        <div className="flex justify-center items-center text-justify mx-8 max-[380px]:mx-4">
          <h3 className={`${primary_font.className} text-[1rem] max-[973px]:text-[0.9rem] max-[380px]:text-[0.8rem]`}>&quot;{title}&quot;</h3>
        </div>
      </div>
      {videoId && isOpen && (
        <VideoModal videoId={videoId} onClose={() => setIsOpen(false)} />
      )}
    </div>
  );
};

export default PostCard;