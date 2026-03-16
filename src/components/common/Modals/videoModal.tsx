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
import styles from "./videoModal.module.css";

interface VideoModalProps {
  videoId: string;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ videoId, onClose }) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title="YouTube video"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
        <button className={styles.closeButton} onClick={onClose}>✕</button>
      </div>
    </div>
  );
};

export default VideoModal;
