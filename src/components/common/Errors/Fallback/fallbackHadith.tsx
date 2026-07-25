import fallbackImage from "../../../../../public/Images/fallbackComponentIcon.png";
import { primary_font, roboto } from "@/app/font/font";
import Image from "next/image";

const FallbackHadith = () => {
  return (
   <div className="flex justify-center overflow-x-hidden mt-8 mx-0 mb-20">
      <div className="flex justify-center items-center max-w-[1440px]">
        <div className="flex flex-col justify-center items-center text-center gap-4">
            <div>
          <Image src={fallbackImage} alt="Fall Back Component Image" className="w-auto h-[100px] max-[750px]:h-[90px] max-[600px]:h-[90px]" />
          <h1 className={`${roboto.className} text-[1.5rem] max-[750px]:text-[1.2rem] max-[600px]:text-[1.1rem] text-[#5c6357]`}>Data Does not Exists</h1>
          </div>
          <h2 className="text-[1.8rem] max-[750px]:text-[1.5rem] max-[600px]:text-[1.3rem] text-[rgba(198,158,48,0.90)] font-normal">&quot; مَنْ أَحْدَثَ فِي أَمْرِنَا هَذَا مَا لَيْسَ فِيهِ فَهُوَ رَدٌّ &quot;
          </h2>
          <h4 className={`${primary_font.className} text-[1.1rem] max-[750px]:text-[1rem] max-[600px]:text-[0.9rem] text-[rgba(198,158,48,0.80)] w-[80%]`}>
            Allah&apos;s Messenger (ﷺ) said, &quot;If somebody innovates something which is not in harmony with the principles of our religion, that thing is rejected.&quot;
          </h4>
          <p className={`${roboto.className} text-[1rem] max-[600px]:text-[0.8rem] text-[rgba(198,158,48,0.60)]`}>Sahih al-Bukhari 2697</p>
        </div>
      </div>
    </div>
  )
}

export default FallbackHadith