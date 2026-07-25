
 import { primary_font, roboto } from "@/app/font/font";
import Image from "next/image";
import Link from "next/link";

interface Featured {
  image: string;
  title: string;
  desp: string;
    slug:string
}

interface FeatureCardProps {
  FeaturedData: Featured;
}

const FeaturedCard: React.FC<FeatureCardProps> = ({ FeaturedData }) => {
  return (
    <div className="w-[350px] h-[300px] rounded-lg py-4 px-8 bg-[#f1f8fa] shadow-[rgba(0,0,0,0.24)_0px_3px_8px] max-[1250px]:w-[250px] max-[1250px]:h-[280px] max-[1250px]:p-4 max-[920px]:w-[230px] max-[920px]:h-[250px] max-[920px]:pt-4 max-[920px]:pr-2 max-[920px]:pb-2 max-[920px]:pl-2 max-[810px]:w-[350px] max-[810px]:h-[300px] max-[810px]:py-4 max-[810px]:px-8 max-[400px]:w-[260px] max-[400px]:h-[230px] max-[400px]:p-4 hover:border-b-[10px] hover:border-b-[#c69e30]">
      <Link href={`/${FeaturedData.slug}`}>
      <div className="flex flex-col justify-center items-center text-center gap-[1.2rem] ml-0 max-[400px]:gap-2">
        <Image
          src={`/Images/${FeaturedData.image}`}
          alt={FeaturedData.title}
          width="120"
          height="120"
          className="flex items-center justify-center m-2 mt-[-3rem] max-[1250px]:w-[100px] max-[1250px]:h-[100px] max-[920px]:w-[90px] max-[920px]:h-[90px] max-[400px]:w-[80px] max-[400px]:h-[80px]"
        />
          <h3 className={`${primary_font.className} text-[1.5rem] text-[#c69e30] font-bold max-[1250px]:text-[1.3rem] max-[810px]:text-[1.5rem] max-[400px]:text-[1.3rem]`}>{FeaturedData.title}</h3>
          <p className={`${roboto.className} text-[1.2rem] text-[rgba(0,0,0,0.75)] font-thin max-[1250px]:text-[1rem] max-[810px]:text-[1.2rem] max-[400px]:text-[1rem]`}>{FeaturedData.desp}</p>
      </div>
      </Link>
    </div>
  );
};

export default FeaturedCard;