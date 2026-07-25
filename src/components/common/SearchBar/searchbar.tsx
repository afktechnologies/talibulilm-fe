"use client";
import { FiSearch } from "react-icons/fi";

interface HeaderProps {
  onSearchChange: (query: string) => void;
  searchQuery: string;
}

const Searchbar: React.FC<HeaderProps> = ({ onSearchChange, searchQuery }) => {

  return (
    <div className="flex items-center relative justify-center w-[45%] max-[1080px]:w-[60%] max-[973px]:w-[55%] max-[700px]:w-[50%] max-[600px]:w-full">
      <FiSearch className="absolute left-[10px] text-[1rem] text-[#bbb] cursor-pointer w-4 h-4 ml-2 max-[1080px]:text-[0.9rem] max-[1080px]:ml-[0.3rem] max-[973px]:text-[0.8rem] max-[730px]:ml-[0.2rem] max-[700px]:text-[0.7rem] max-[600px]:text-[0.8rem]" />
      <input
        type="search"
        placeholder="Search by surah name"
        className="w-full py-2 px-10 border border-[#C2CDD3] text-[1rem] rounded-[20px] m-0 max-[1080px]:text-[0.9rem] max-[973px]:py-[0.4rem] max-[973px]:text-[0.8rem] max-[730px]:py-[0.3rem] max-[700px]:text-[0.7rem] max-[600px]:text-[0.8rem] max-[370px]:text-[0.7rem]"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default Searchbar;
