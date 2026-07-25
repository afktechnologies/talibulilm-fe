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
import PostCard from "./postCard";
import { RecentPostType } from "@/types/recentPost";

interface RecentPostProps {
  posts: RecentPostType[];
}

const RecentPost: React.FC<RecentPostProps> = ({ posts }) => {
  return (
    <div className="flex justify-center bg-[url('/Images/recentPostBG.png')] overflow-hidden my-8 py-12 px-4">
      <div className="flex flex-col max-w-[1440px] w-full">
        <div className="flex flex-col justify-center items-center text-center gap-2">
          <h2 className={`${primary_font.className} text-[2rem] max-[973px]:text-[1.4rem] max-md:text-[1.6rem]`}>Recent Posts</h2>
          <p className={`${roboto.className} text-[1rem] max-[973px]:text-[0.9rem] max-md:text-[1rem]`}>
            Stay updated with the latest discussions and insights
          </p>
          {/* <button className={primary_font.className}>View More</button> */}
        </div>
        <div className="flex justify-center items-center m-8 gap-12 max-md:flex-col max-[600px]:flex-col max-[500px]:flex-col max-[450px]:flex-col max-[450px]:m-6 max-[380px]:flex-col">
          {posts.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentPost;