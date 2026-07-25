import Image from "next/image";
import errorImage from "../../public/Images/404Image.png";
import Link from "next/link";
import { primary_font, roboto } from "@/app/font/font";

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

export default function NotFoundPage() {
  return (
    <div className={es.wrapper}>
      <div className={es.container}>
        <div className={es.content}>
        <h3 className={`${primary_font.className} ${es.h3}`}>Whoops!</h3>
        <h5 className={`${roboto.className} ${es.h5}`}>
          404 <span className={es.span}>- Page Not Found</span>
        </h5>
        <Image src={errorImage} alt="Error 404 Image" className={es.img} />
        <p className={`${roboto.className} ${es.p}`}>
          The page you were looking for doesn’t exist or an other error occured.
          In the meantime, try again or
          <Link href="/" className={es.a}> return to the home page.</Link>
        </p>
        </div>
      </div>
    </div>
  );
};

