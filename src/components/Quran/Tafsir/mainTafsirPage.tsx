import Image from "next/image";
import bgImage from "../../../../public/Images/Quran/tafsirHeroBg.png"
import TafsirPageheader from "./header";
import TafsirDetails from "./tafsirDetails";

const TafsirMainPage = () => {
  return (
    <div className="flex justify-center overflow-x-hidden">
      <div className="flex flex-col justify-center w-[90%] max-w-[1440px]">
        <div className="flex justify-center items-center rounded-2xl w-full">
            <Image src={bgImage} alt="Tafsir Hero Image" layout="responsive"/>
        </div>
        <div className="bg-white rounded-bl-[20px] rounded-br-[20px] pb-12">
            <TafsirPageheader/>
            <TafsirDetails/>
            </div>
      </div>
    </div>
  );
};

export default TafsirMainPage;
