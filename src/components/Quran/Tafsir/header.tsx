import Link from "next/link"
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { primary_font, roboto } from "@/app/font/font"

const th = {
  li: "w-full text-center text-[1.1rem]",
  a: "inline-flex justify-center items-center cursor-pointer",
  svg: "mx-2 w-6 h-6 text-[#7D887A]",
};

const TafsirPageheader = () => {
  return (
    <div className="flex justify-between items-center my-4 mx-20">
        <div className="flex flex-col justify-center w-[20%] text-[#488EAD]">
        <h2 className={primary_font.className}>Al-Baqarah</h2>
        <p className={roboto.className}>Ayah 177</p>
        </div>
        <div className="w-full h-[80%] border border-[#7D887A] rounded-2xl py-2 px-4">
        <ul className={`${roboto.className} flex justify-between items-center`}>
            <li className={th.li}>
              <Link href="/" className={th.a}>Surah
              <MdOutlineKeyboardArrowDown className={th.svg} />
              </Link>
            </li>
            <li className={th.li}>
              <Link href="/" className={th.a}>Ayah
              <MdOutlineKeyboardArrowDown className={th.svg} />
              </Link>
            </li>
            <li className={th.li}>
              <Link href="/" className={th.a}>English
              <MdOutlineKeyboardArrowDown className={th.svg} />
              </Link>
            </li>
            <li className={`${th.li} bg-[#F4E8C7] text-[#7A604F] py-[0.2rem] px-2 rounded-[25px] cursor-pointer`}>
              <Link href="/" className={th.a}>Tafsir Ibn- Kathir
              <MdOutlineKeyboardArrowDown className={th.svg} />
              </Link>
            </li>
          </ul>
        </div>
    </div>
  )
}

export default TafsirPageheader