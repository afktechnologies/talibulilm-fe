// // components/VideoModal.tsx
// "use client"

// import React, { useState } from "react";
// import styles from "./videoModal.module.css";
// import Image, { StaticImageData } from "next/image";
// import YouTube from "react-youtube";
// import { FaPlay } from "react-icons/fa";

// interface VideoModalProps {
//   videoId: string;
//   thumbnail: StaticImageData;
//   alt?: string;
// }

// const VideoModal: React.FC<VideoModalProps> = ({ videoId, thumbnail, alt = "Video Thumbnail" }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const handleOpen = () => setIsOpen(true);
//   const handleClose = () => setIsOpen(false);

//   return (
//     <>
//       <div className={styles.thumbnailWrapper} onClick={handleOpen}>
//         <Image src={thumbnail} alt={alt} className={styles.thumbnail} />
//         <div className={styles.playButton}>
//   <FaPlay />
// </div>
//       </div>

//       {isOpen && (
//         <div className={styles.modalOverlay} onClick={handleClose}>
//           <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
//             <YouTube
//               videoId={videoId}
//               className={styles.videoIframe}
//               opts={{
//                 width: "100%",
//                 height: "100%",
//                 playerVars: { autoplay: 1 },
//               }}
//             />
//             <button className={styles.closeBtn} onClick={handleClose}>×</button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default VideoModal;


// components/VideoModal.tsx

import React from "react";

interface VideoModalProps {
  videoId: string;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ videoId, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.85)] flex justify-center items-center z-[1000]" onClick={onClose}>
      <div className="relative w-[90%] max-w-[960px] h-[80vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title="YouTube video"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
        <button className="absolute top-[8px] right-[12px] text-[1.5rem] bg-transparent border-none text-white cursor-pointer" onClick={onClose}>✕</button>
      </div>
    </div>
  );
};

export default VideoModal;
