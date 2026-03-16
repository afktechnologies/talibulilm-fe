// import { primary_font, roboto } from "@/app/font/font";
// import styles from "./recentPost.module.css";
// import PostCard from "./postCard"; // Import the PostCard component

// // Define TypeScript type for a recent post
// interface RecentPostType {
//   id: number;
//   title: string;
//   postImage: string; // Updated from imageUrl to match PostCard
//   profileImage: string;
//   username: string; // Changed from author to username
//   timeAgo: string;
//   views: string;
//   source: string; // Updated from academy to source
//   altText: string;
// }

// // Define props for the RecentPost component
// interface RecentPostProps {
//   posts: RecentPostType[];
// }

// const RecentPost: React.FC<RecentPostProps> = ({ posts }) => {
//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.container}>
//         <div className={styles.title}>
//           <h2 className={primary_font.className}>Recent Posts</h2>
//           <p className={roboto.className}>
//             Stay updated with the latest discussions and insights
//           </p>
//           <button className={primary_font.className}>View More</button>
//         </div>
//         <div className={styles.content}>
//           {posts.map((post) => (
//             <PostCard key={post.id} {...post} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecentPost;


// components/RecentPost.tsx
import { primary_font, roboto } from "@/app/font/font";
import styles from "./recentPost.module.css";
import PostCard from "./postCard";
import { RecentPostType } from "@/types/recentPost";

interface RecentPostProps {
  posts: RecentPostType[];
}

const RecentPost: React.FC<RecentPostProps> = ({ posts }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.title}>
          <h2 className={primary_font.className}>Recent Posts</h2>
          <p className={roboto.className}>
            Stay updated with the latest discussions and insights
          </p>
          {/* <button className={primary_font.className}>View More</button> */}
        </div>
        <div className={styles.content}>
          {posts.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentPost;