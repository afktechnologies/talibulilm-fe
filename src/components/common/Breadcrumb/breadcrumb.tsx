// "use client";

// import Breadcrumbs from "@mui/material/Breadcrumbs";
// import Typography from "@mui/material/Typography";
// import Link from "@mui/material/Link";
// import NavigateNextIcon from "@mui/icons-material/NavigateNext";
// import styles from "./breadcrumb.module.css";
// import { roboto } from "@/app/font/font";
// import { usePathname } from "next/navigation";

// const formatSlug = (slug: string): string => {
//   return slug
//     .split("-")
//     .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(" ");
// };

// export default function Breadcrumb() {
//   const pathname = usePathname();
//   const pathSegments = pathname.split("/").filter(segment => segment);

//   const breadcrumbs = [
//     {
//       label: "Home",
//       href: "/",
//     },
//     ...(pathSegments[0] === "hadith"
//       ? [
//           {
//             label: "Hadith",
//             href: "/hadith",
//           },
//           ...pathSegments.slice(1).map((segment, index) => ({
//             label: formatSlug(segment),
//             href: `/hadith/${pathSegments.slice(1, index + 2).join("/")}`,
//           })),
//         ]
//       : []),
//   ].map((crumb, index, arr) =>
//     index === arr.length - 1 ? (
//       <Typography key={index} className={styles.typography}>
//         {crumb.label}
//       </Typography>
//     ) : (
//       <Link underline="hover" key={index} href={crumb.href} className={styles.link}>
//         {crumb.label}
//       </Link>
//     )
//   );

//   return (
//     <Breadcrumbs
//       separator={<NavigateNextIcon fontSize="small" />}
//       aria-label="breadcrumb"
//       className={`${styles.breadcrumb} ${roboto.className}`}
//     >
//       {breadcrumbs}
//     </Breadcrumbs>
//   );
// }

"use client";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import styles from "./breadcrumb.module.css";
import { roboto } from "@/app/font/font";
import { usePathname } from "next/navigation";

const formatSlug = (slug: string): string => {
  return slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

interface BreadcrumbProps {
  collectionName?: string;
}

export default function Breadcrumb({ collectionName }: BreadcrumbProps) {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(segment => segment);

  const breadcrumbs = [
    {
      label: "Home",
      href: "/",
    },
    ...(pathSegments[0] === "hadith"
      ? [
          {
            label: "Hadith",
            href: "/hadith",
          },
          ...pathSegments.slice(1).map((segment, index) => {
            const isCollectionId = /^\d+$/.test(segment); // check if it's a number
            return {
              label: isCollectionId && collectionName ? collectionName : formatSlug(segment),
              href: `/hadith/${pathSegments.slice(1, index + 2).join("/")}`,
            };
          }),
        ]
      : []),
  ].map((crumb, index, arr) =>
    index === arr.length - 1 ? (
      <Typography key={index} className={styles.typography}>
        {crumb.label}
      </Typography>
    ) : (
      <Link underline="hover" key={index} href={crumb.href} className={styles.link}>
        {crumb.label}
      </Link>
    )
  );

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
      className={`${styles.breadcrumb} ${roboto.className}`}
    >
      {breadcrumbs}
    </Breadcrumbs>
  );
}
