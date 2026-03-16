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
import styles from "./recentPost.module.css";
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
    <div className={styles.card}>
      <div className={styles.headings}>
        <div className={styles.profile}>
            <Image
              src={`/Images/${profileImage}`}
              alt="Profile"
              width={40}
              height={40}
            />
            <h4 className={primary_font.className}>{username}</h4>
        </div>
      </div>
      <div className={styles.image}>
        <Image
          src={`/Images/${postImage}`}
          alt={altText}
          width={550}
          height={260}
        />
        {/* {videoId && ( */}
          <div
            className={styles.playButton}
            onClick={() => setIsOpen(true)}
          >
            <IoIosPlay />
          </div>
        {/* )} */}
      </div>
      <div>
        <div className={styles.desp}>
          <h3 className={primary_font.className}>&quot;{title}&quot;</h3>
        </div>
      </div>
      {videoId && isOpen && (
        <VideoModal videoId={videoId} onClose={() => setIsOpen(false)} />
      )}
    </div>
  );
};

export default PostCard;