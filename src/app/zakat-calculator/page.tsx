import type { Metadata } from "next";
import ZakatCalculatorHero from "@/components/ZakatCalculator/Hero";
import FAQ from "@/components/ZakatCalculator/faq";
import VideoSection from "@/components/ZakatCalculator/videoSection";
import MainCalculator from "@/components/ZakatCalculator/mainCalculator";

export const metadata: Metadata = {
  title: "Zakat Calculator | Talibulilm",
  description: "Calculate your annual Zakat obligation based on gold, cash, savings, and other qualifying assets.",
};

const ZakatCalculator = () => {
  return (
    <div>
      <ZakatCalculatorHero
        arabicText="تعبد الله ولا تشرك به شيئًا، وتقيم الصلاة، وتؤتي الزكاة المفروضة، وتصوم رمضان"
        englishTranslation="“Worship Allah, and never associate anything with Him, establish Salat, pay the Zakat which has been enjoined upon you, and observe Saum of Ramadan.”"
        reference="Al- Bukhari 222"
      />
      <MainCalculator />
      <VideoSection />
      <FAQ />
    </div>
  );
};

export default ZakatCalculator;
