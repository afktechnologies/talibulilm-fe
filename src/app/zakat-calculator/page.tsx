import ZakatCalculatorHero from "@/components/ZakatCalculator/Hero";
import FAQ from "@/components/ZakatCalculator/faq";
import styles from "./index.module.css"
import VideoSection from "@/components/ZakatCalculator/videoSection";
import MainCalculator from "@/components/ZakatCalculator/mainCalculator";
import ComingSoon from "@/components/common/Errors/Fallback/comingSoon";

const ZakatCalculator = () => {
  return (
    <div>
      {/* <ZakatCalculatorHero
        arabicText="تعبد الله ولا تشرك به شيئًا، وتقيم الصلاة، وتؤتي الزكاة المفروضة، وتصوم رمضان"
        englishTranslation="“Worship Allah, and never associate anything with Him, establish Salat, pay the Zakat which has been enjoined upon you, and observe Saum of Ramadan.”"
        reference="Al- Bukhari 222"
      />
      <div className={styles.main}>
        <MainCalculator/>
      <VideoSection/>
      <FAQ />
      </div> */}
      <ComingSoon/>
    </div>
  );
};

export default ZakatCalculator;
