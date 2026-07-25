"use client";

// import HadithTopics from "@/components/Hadith/Home/topics";
import HadithMainPageHero from "@/components/Hadith/Home/Hero";
// import QuranicVerse from "@/components/Hadith/Home/quranicVerse";
// import DailyHadith from "@/components/Home/dailyHadith";
// import hadithData from "@/store/data/hadithData.json";
// import LastReadData from "../../store/data/LastRead.json";
import HadithLastRead from "@/components/Hadith/Home/hadithLastRead";
import HadithOfTheDay from "@/components/Hadith/Home/hadithOfTheDay";
import HadithBooks from "@/components/Hadith/Home/books";

const Hadith = () => {
  return (
    <div className="pb-24">
      <HadithMainPageHero englishTranslation="Understand Islam Through the Prophet's (ﷺ) Ahadith" />

      <HadithLastRead />
      {/* <QuranicVerse
        arabicText="مَّن يُطِعِ ٱلرَّسُولَ فَقَدْ أَطَاعَ ٱللَّهَ ۖ وَمَن تَوَلَّىٰ فَمَآ أَرْسَلْنَـٰكَ عَلَيْهِمْ حَفِيظًۭا"
        englishTranslation="“Whoever obeys the Messenger has truly obeyed Allah. But whoever turns away, then ˹know that˺ We have not sent you ˹O Prophet˺ as a keeper over them.”"
        reference="Al Quran 4:80"
        /> */}

      {/* <HadithTopics/>
      <HadithOfTheDay />
      <HadithBooks /> */}
      <HadithBooks />
      <HadithOfTheDay />
    </div>
  );
};

export default Hadith;
