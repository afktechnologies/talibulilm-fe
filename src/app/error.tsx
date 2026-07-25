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
import Link from "next/link";
import { primary_font, roboto } from "@/app/font/font";
import { useEffect } from "react";

const es = {
  wrapper: "flex justify-center overflow-x-hidden mt-8 mx-0 mb-32",
  container: "flex justify-center items-center max-w-[1440px] w-full",
  content: "flex flex-col justify-center items-center text-center gap-4",
  h3: "text-[2.5rem] text-[#c69e30] max-[750px]:text-[2.2rem] max-[530px]:text-[2rem] max-[440px]:text-[1.8rem] max-[395px]:text-[1.5rem]",
  h5: "text-[2rem] text-[#c1121f] max-[750px]:text-[1.7rem] max-[530px]:text-[1.5rem] max-[440px]:text-[1rem] max-[395px]:text-[1rem]",
  span: "text-[1.5rem] text-black max-[750px]:text-[1.2rem] max-[530px]:text-[1rem] max-[440px]:text-[0.9rem] max-[395px]:text-[0.8rem]",
  img: "w-auto h-[280px] max-[750px]:h-[220px] max-[530px]:h-[180px] max-[440px]:h-[150px] max-[395px]:h-[150px]",
  p: "mt-4 text-[1.5rem] w-[70%] text-[#5c6357] max-[750px]:text-[1.2rem] max-[530px]:text-[1rem] max-[440px]:text-[0.9rem] max-[395px]:text-[0.9rem] max-[395px]:w-[80%] max-[345px]:w-[90%]",
  a: "text-[rgba(198,158,48,0.87)]",
};

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
      <div className={es.wrapper}>
        <div className={es.container}>
          <div className={es.content}>
            <h3 className={`${primary_font.className} ${es.h3}`}>Uh-Oh!</h3>
            <h5 className={`${roboto.className} ${es.h5}`}>
              505 <span className={es.span}>- Internal Server Error</span>
            </h5>
            <Image src={errorImage} alt="Error 505 Image" className={es.img} />
            <p className={`${roboto.className} ${es.p}`}>
              We are experiencing an internal server problem. Please try back
              later or
              <Link href="/" className={es.a}> return to the home page.</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ✅ For other errors (page-level etc.)
  return (
    <div className={es.wrapper}>
      <div className={es.container}>
        <div className={es.content}>
          <h3 className={`${primary_font.className} ${es.h3}`}>Something went wrong</h3>
          <p className={`${roboto.className} ${es.p}`}>
            <strong>Error:</strong> {error.message}
          </p>
          <button onClick={() => reset()} className={roboto.className}>
            Try Again
          </button>
          <p className={`${roboto.className} ${es.p} mt-4`}>
            Or <Link href="/" className={es.a}>Return to the home page.</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
