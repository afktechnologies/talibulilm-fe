import { primary_font } from "@/app/font/font";
import { FiSearch } from "react-icons/fi";

const SearchbarGO = () => {
  return (
    <div className="flex items-center relative w-full">
      <FiSearch className="absolute left-[20px] text-[#7A604F] cursor-pointer text-[1.2rem] w-6 h-6 max-[973px]:w-[1.2rem] max-[973px]:h-[1.2rem] max-md:w-4 max-md:h-4 max-[450px]:w-[0.8rem] max-[450px]:h-[0.8rem]" />
      <input
        type="search"
        placeholder="Search Hadith"
        className="w-full pt-[0.8rem] pr-[7rem] pb-[0.8rem] pl-[3rem] border border-[#C2CDD3] text-[1.2rem] rounded-[40px] m-0 max-[973px]:text-[1.1rem] max-md:text-[1rem] max-[550px]:text-[0.9rem] max-[550px]:pt-[0.5rem] max-[550px]:pr-[5rem] max-[550px]:pb-[0.5rem] max-[550px]:pl-[3rem] max-[450px]:text-[0.8rem]"
      />
      <div className={`${primary_font.className} flex absolute right-[20px] cursor-pointer py-[0.3rem] px-8 bg-[#7A604F] rounded-[20px] text-[1rem] text-white max-[973px]:px-6 max-[973px]:text-[0.8rem] max-[550px]:px-4 max-[550px]:text-[0.8rem] max-[450px]:py-[0.1rem] max-[450px]:px-[0.6rem] max-[450px]:text-[0.6rem]`}>
        Go
      </div>
    </div>
  );
};

export default SearchbarGO;
