// "use client"

// import Image from "next/image";
// import errorImage from "../../public/Images/505Image.png";
// import styles from "./505.module.css";
// import Link from "next/link";
// import { primary_font, roboto } from "@/app/font/font";

// export default function GlobalError() {
//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.container}>
//         <div className={styles.content}>
//           <h3 className={primary_font.className}>Uh-Oh!</h3>
//           <h5 className={roboto.className}>
//             505 <span>- Internal Server Error</span>
//           </h5>
//           <Image src={errorImage} alt="Error 505 Image" />
//           <p className={roboto.className}>
//             We are experiencing an internal server problem. Please try back
//             later or
//             <Link href="/"> return to the home page.</Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };




"use client";

import Image from "next/image";
import errorImage from "../../public/Images/505Image.png";
import styles from "./505.module.css";
import Link from "next/link";
import { primary_font, roboto } from "@/app/font/font";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Captured error:", error);
  }, [error]);

  // Detect internal/server errors
  const isServerError =
    error.message.includes("500") ||
    error.message.includes("505") ||
    error.name === "InternalServerError";

  if (isServerError) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.content}>
            <h3 className={primary_font.className}>Uh-Oh!</h3>
            <h5 className={roboto.className}>
              505 <span>- Internal Server Error</span>
            </h5>
            <Image src={errorImage} alt="Error 505 Image" />
            <p className={roboto.className}>
              We are experiencing an internal server problem. Please try back
              later or
              <Link href="/"> return to the home page.</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ✅ For other errors (page-level etc.)
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h3 className={primary_font.className}>Something went wrong</h3>
          <p className={roboto.className}>
            <strong>Error:</strong> {error.message}
          </p>
          <button onClick={() => reset()} className={roboto.className}>
            Try Again
          </button>
          <p className={`${roboto.className} mt-4`}>
            Or <Link href="/">Return to the home page.</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
