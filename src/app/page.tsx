import Hero from "@/components/Home/Hero";
import About from "@/components/Home/about";
import DailyAyah from "@/components/Home/dailyAyah";
import DailyHadith from "@/components/Home/dailyHadith";
import RecentPost from "@/components/Home/recentPost";
import featuredData from "@/store/data/featuredData.json";
import recentPosts from "@/store/data/recentPosts.json"; 
import FeaturedContent from "@/components/Home/feature";
import DonationComponent from "@/components/Home/donation";

export default function Home() {
  return (
    <div>
      <Hero
        arabicText="طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ"
        englishTranslation="Seeking knowledge is a duty upon every Muslim."
        reference="Sunan Ibn Majah 224"
      />
      <FeaturedContent FeaturedList={featuredData} />
      <DailyHadith />
      {/* <RecentPost posts={recentPosts} /> */}
      <DailyAyah />
      <About
        title="About Us"
        description="At Talibulilm, we are committed to presenting authentic Islamic teachings with integrity and clarity. We prioritize accuracy and reliability in all our content, ensuring that it aligns with the Quran and the authentic Sunnah of Prophet Muhammad (peace be upon him). We strive to create a welcoming and inclusive environment for all seekers of knowledge, fostering a community of learning and spiritual growth."
      />
      <DonationComponent />
    </div>
  );
}
