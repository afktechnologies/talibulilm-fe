// import { useEffect, useState } from "react";
// import { useInView } from "react-intersection-observer";
// import { usePage } from "@/services/hooks/quran";
// import styles from "../Cards/pageCard.module.css";
// import { PageList } from "@/types/surah";
// import PageCard from "../Cards/pageCard";
// import Link from "next/link";
// import JuzAndPageSkeleton from "@/components/skeleton/quran/juzAndPageSkeleton";
// import FallbackError from "@/components/common/Errors/Fallback/fallbackError";

// interface PageContentProps {
//   searchQuery: string;
//   onResultsChange: (hasResults: boolean) => void;
// }

// const PageContent = ({ searchQuery, onResultsChange }: PageContentProps) => {
//   const [page, setPage] = useState(1);
//   const [allData, setAllData] = useState<PageList[]>([]);
//   const [hasMore, setHasMore] = useState(true);
//   const limit = 10; // Matches API limit from sample response

//   const { data: pageData, isLoading, error, isFetching } = usePage({ page, limit });
  
//   const { ref, inView } = useInView({
//     threshold: 0,
//     triggerOnce: false,
//   });

//   // Handle data accumulation and filtering
//   useEffect(() => {
//     if (pageData?.data) {
//       setAllData(prev => {
//         // Only append new data if it's a new page
//         if (page === 1) return pageData.data;
//         return [...prev, ...pageData.data];
//       });
//       if (pageData.meta) {
//         setHasMore(pageData.meta.hasNextPage);
//       } else {
//         setHasMore(false);
//       }
//       onResultsChange(pageData.data.length > 0);
//     } else {
//       onResultsChange(false);
//     }
//   }, [pageData, page, onResultsChange]);

//   // Filter data based on search query
//   const filteredData = allData.filter(
//     (item: PageList) =>
//       item.surahInfo.nameEn
//         .toLowerCase()
//         .includes(searchQuery.toLowerCase()) ||
//       item.pageNumber.toString().includes(searchQuery)
//   );

//   // Load more data when the observer is in view
//   useEffect(() => {
//     if (inView && hasMore && !isFetching) {
//       setPage(prev => prev + 1);
//     }
//   }, [inView, hasMore, isFetching]);

//   // Reset page when search query changes
//   useEffect(() => {
//     setPage(1);
//     setAllData([]);
//   }, [searchQuery]);

//   if (isLoading && page === 1) return <JuzAndPageSkeleton />;

//   if (error) {
//     return (
//       <div>
//         <FallbackError />
//       </div>
//     );
//   }

//   return (
//     <div className={styles.CardContainer}>
//       {Object.entries(
//         filteredData.reduce<Record<string, PageList[]>>((groups, item) => {
//           const surah = item.surahInfo.nameEn;
//           if (!groups[surah]) groups[surah] = [];
//           groups[surah].push(item);
//           return groups;
//         }, {})
//       ).map(([surah, items]) => (
//         <div key={surah} style={{ marginTop: "2rem" }}>
//           {items.map((item, index) => (
//             <div
//               key={item.id}
//               style={{ marginTop: index === 0 ? "0" : ".8rem" }}
//             >
//                 <PageCard item={item} />
//             </div>
//           ))}
//         </div>
//       ))}
//       {hasMore && (
//         <div ref={ref} style={{ height: "20px", margin: "20px 0" }}>
//           {isFetching && <JuzAndPageSkeleton />}
//         </div>
//       )}
//     </div>
//   );
// };

// export default PageContent;





import { useEffect, useState } from "react";
import { usePage } from "@/services/hooks/quran";
import { PageList } from "@/types/surah";
import PageCard from "../Cards/pageCard";
import JuzAndPageSkeleton from "@/components/skeleton/quran/juzAndPageSkeleton";
import FallbackError from "@/components/common/Errors/Fallback/fallbackError";

interface PageContentProps {
  searchQuery: string;
  onResultsChange: (hasResults: boolean) => void;
}

const PageContent = ({ searchQuery, onResultsChange }: PageContentProps) => {
  const { data: pageData, isLoading, error } = usePage();
  const [filteredData, setFilteredData] = useState<PageList[]>([]);

  useEffect(() => {
    if (pageData) {
      const filtered = pageData.filter(
        (item: PageList) =>
          item.surahInfo.nameEn
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          item.pageNumber.toString().includes(searchQuery)
      );

      setFilteredData(filtered);
      onResultsChange(filtered.length > 0); // Notify parent about results
    } else {
      onResultsChange(false); // No data, no results
    }
  }, [pageData, searchQuery, onResultsChange]);

  if (isLoading) return <JuzAndPageSkeleton />;

  if (error)
    return (
      <div>
        <FallbackError />
      </div>
    );

  return (
    <div className="w-full flex flex-col gap-4 px-5 m-0 max-[780px]:py-5 max-[780px]:px-[10px] max-[530px]:p-0">
      {Object.entries(
        filteredData.reduce<Record<string, PageList[]>>((groups, item) => {
          const surah = item.surahInfo.nameEn;
          if (!groups[surah]) groups[surah] = [];
          groups[surah].push(item);
          return groups;
        }, {})
      ).map(([surah, items]) => (
        <div key={surah} style={{ marginTop: "2rem" }}>
          {items.map((item, index) => (
            <div
              key={item.id}
              style={{ marginTop: index === 0 ? "0" : ".8rem" }}
            >
                <PageCard item={item} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PageContent;