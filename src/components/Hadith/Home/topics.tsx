import { primary_font, roboto } from "@/app/font/font";
import Link from "next/link";
import { HiOutlineDocumentSearch} from "react-icons/hi";

interface Book {
  topic: string;
}

const hadithBooks: Book[] = [
  { topic: "Tawheed" },
  { topic: "Aqeedah" },
  { topic: "Salah" },
  { topic: "Hajj(Pilgrimage)" },
  { topic: "Niyyah(Intentions)" },
  { topic: "Herafter" },
  { topic: "Etiquettes and Manners" },
  { topic: "Quran and knowledge" },
];

const HadithTopics = () => {
  return (
    <div className="flex justify-center overflow-x-hidden mt-16">
      <div className="flex flex-col max-w-[1440px] w-[90%]">
        <div className="flex items-center gap-6">
          <div className="flex justify-center items-center w-10 h-10 border border-[#003845] rounded-[10px] p-[3px] bg-[#003845]">
          <HiOutlineDocumentSearch className="text-white h-[1.6rem] w-[1.6rem]" />
          </div>
        <h2 className={`${primary_font.className} text-[2rem] text-[#003845] max-[890px]:text-[1.5rem]`}>Explore by Topics</h2>
        </div>
        <div className="grid grid-cols-4 gap-14 my-12 max-[1250px]:grid-cols-3 max-[1250px]:gap-12 max-[890px]:grid-cols-2 max-[890px]:gap-10 max-[500px]:grid-cols-1">
          {hadithBooks.map((book, index) => (
            <Link href="/hadith/index" key={index}>
              <div className="flex items-center rounded-[8px] text-[#5C6357]">
                <div className="flex justify-center items-center flex-grow h-[80px] cursor-pointer bg-white rounded-[10px] shadow-[rgba(0,0,0,0.25)_0px_8px_4px] text-center max-[1250px]:py-6 max-[1250px]:px-12 max-[890px]:py-6 max-[890px]:px-12 max-[590px]:py-4 max-[590px]:px-8">
                  <div className="flex justify-center items-center w-[70%] max-[1250px]:w-[80%] max-[890px]:w-[85%]">
                    <h4 className={`${roboto.className} text-[1.3rem] max-[890px]:text-[1.2rem]`}>{book.topic}</h4>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HadithTopics;
