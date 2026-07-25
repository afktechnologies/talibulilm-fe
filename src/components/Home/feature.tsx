import { primary_font } from "@/app/font/font";
import FeaturedCard from "./featurCard";

interface Featured {
  image: string;
  title: string;
  desp: string;
  slug:string
}

interface FeatureCardProps {
  FeaturedList: Featured[];
}

const FeaturedContent: React.FC<FeatureCardProps> = ({ FeaturedList }) => {
  return (
    <div className="flex justify-center overflow-x-hidden mx-12 py-8 max-[920px]:mx-6 max-[810px]:mx-4 max-[810px]:py-8 max-[400px]:mx-4 max-[400px]:py-8">
      <div className="flex flex-col items-center max-w-[1440px] w-[90%]">
        <div>
          <div className="flex flex-col justify-center items-center gap-2">
            <h2 className={`${primary_font.className} text-[2rem] max-[920px]:text-[1.4rem] max-[810px]:text-[2rem] max-[400px]:text-[2rem]`}>Featured Content</h2>
            {/* <button className={primary_font.className}>View More</button> */}
          </div>
          <div className="flex justify-between items-center mt-12 gap-12 max-[1250px]:gap-8 max-[810px]:flex-col max-[400px]:flex-col">
          {FeaturedList.map((featured, index) => (
            <FeaturedCard FeaturedData={featured} key={index}/>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedContent;
