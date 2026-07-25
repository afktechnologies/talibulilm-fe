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
      <Typography key={index}>
        {crumb.label}
      </Typography>
    ) : (
      <Link underline="hover" key={index} href={crumb.href} className="no-underline text-[#1c3d3d] hover:underline">
        {crumb.label}
      </Link>
    )
  );

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
      className={`${roboto.className} flex items-center justify-center gap-2 text-[1.2rem] text-[#1c3d3d] [&_.MuiTypography-root]:flex [&_.MuiTypography-root]:items-center [&_.MuiTypography-root]:justify-center [&_.MuiTypography-root]:text-[1.2rem] [&_.MuiBreadcrumbs-ol]:justify-center [&_.MuiSvgIcon-root]:text-[1rem] max-[768px]:[&_.MuiTypography-root]:text-[1rem] max-[768px]:[&_.MuiSvgIcon-root]:text-[0.8rem] max-[520px]:[&_.MuiTypography-root]:text-[0.8rem] max-[395px]:[&_.MuiSvgIcon-root]:w-[0.8em] max-[395px]:[&_.MuiSvgIcon-root]:h-[0.8em] max-[395px]:[&_.MuiSvgIcon-root]:text-[0.7rem] max-[395px]:[&_.MuiBreadcrumbs-separator]:ml-[4px] max-[395px]:[&_.MuiBreadcrumbs-separator]:mr-[4px] max-[360px]:[&_.MuiSvgIcon-root]:text-[0.6rem] max-[360px]:[&_.MuiBreadcrumbs-separator]:ml-[3px] max-[360px]:[&_.MuiBreadcrumbs-separator]:mr-[3px] max-[360px]:[&_.MuiTypography-root]:text-[0.7rem]`}
    >
      {breadcrumbs}
    </Breadcrumbs>
  );
}
