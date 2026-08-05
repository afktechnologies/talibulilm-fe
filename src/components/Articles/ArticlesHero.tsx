import { primary_font, roboto } from "@/app/font/font";

export default function ArticlesHero() {
  return (
    <div className="flex justify-center overflow-x-hidden bg-[#f8f7f4] border-b border-[#C2CDD3]">
      <div className="flex flex-col items-center text-center gap-3 w-full max-w-[1440px] py-14 px-4">
        <h1 className={`${primary_font.className} text-[2.2rem] text-[#5C6357] max-[600px]:text-[1.7rem]`}>
          Articles
        </h1>
        <p className={`${roboto.className} text-[1rem] text-[#7D887A] max-w-[560px] max-[600px]:text-[0.9rem]`}>
          Guides, reflections, and insights on Islamic knowledge and practice.
        </p>
      </div>
    </div>
  );
}
