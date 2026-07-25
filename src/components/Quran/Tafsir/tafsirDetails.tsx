import { primary_font, roboto } from "@/app/font/font"
import { Button } from "@mui/material"
import { FaDiamond } from "react-icons/fa6";
// import { HiRefresh } from "react-icons/hi";

const td = {
  buttons: "py-2 px-8 text-[1rem] text-[#5C6357] border border-[#7D887A] rounded-[15px] font-bold hover:bg-[#5C6357] hover:text-white",
};

const TafsirDetails = () => {
  return (
    <div className="flex flex-col justify-center items-center my-8 mx-20">
    <div className="w-[95%] flex flex-col justify-center items-end gap-4 my-4">
        {/* <h1 className={primary_font.className}>لَّيْسَ الْبِرَّ أَن تُوَلُّوا وُجُوهَكُمْ قِبَلَ الْمَشْرِقِ وَالْمَغْرِبِ وَلَـٰكِنَّ الْبِرَّ مَنْ آمَنَ بِاللَّـهِ وَالْيَوْمِ الْآخِرِ وَالْمَلَائِكَةِ وَالْكِتَابِ وَالنَّبِيِّينَ وَآتَى الْمَالَ عَلَىٰ حُبِّهِ ذَوِي الْقُرْبَىٰ وَالْيَتَامَىٰ وَالْمَسَاكِينَ وَابْنَ السَّبِيلِ وَالسَّائِلِينَ وَفِي الرِّقَابِ وَأَقَامَ الصَّلَاةَ وَآتَى الزَّكَاةَ وَالْمُوفُونَ بِعَهْدِهِمْ إِذَا عَاهَدُوا ۖ وَالصَّابِرِينَ فِي الْبَأْسَاءِ وَالضَّرَّاءِ وَحِينَ الْبَأْسِ ۗ أُولَـٰئِكَ الَّذِينَ صَدَقُوا ۖ وَأُولَـٰئِكَ هُمُ الْمُتَّقُونَ</h1> */}
        <h4 className={`${roboto.className} text-[1rem] font-normal tracking-[0.05em] text-[#7D887A] text-start`}>Righteousness is not in turning your faces towards the east or the west. Rather, the righteous are those who believe in Allah, the Last Day, the angels, the Books, and the prophets; who give charity out of their cherished wealth to relatives, orphans, the poor, ˹needy˺ travellers, beggars, and for freeing captives; who establish prayer, pay alms-tax, and keep the pledges they make; and who are patient in times of suffering, adversity, and in ˹the heat of˺ battle. It is they who are true ˹in faith˺, and it is they who are mindful ˹of Alla</h4>
    </div>
    <div className="flex justify-center items-center w-full">
    <FaDiamond className="w-[6px] h-[6px] text-[#7A604F]" />
    <hr className="w-[90%] h-[2px] bg-[#7A604F] text-[#7A604F] my-[0.2rem] mx-[-0.1rem]"/>
    <FaDiamond className="w-[6px] h-[6px] text-[#7A604F]" />
    </div>
    <div className="w-[85%] flex flex-col justify-center items-start gap-4 my-4">
        <h2 className={`${primary_font.className} text-[#C69E30] text-[1.8rem]`}>Al-Birr (Piety, Righteousness)</h2>
        <p className={`${roboto.className} text-[1rem] font-normal tracking-[0.05em] text-start`}>This Ayah contains many great wisdoms, encompassing rulings and correct beliefs.
        As for the explanation of this Ayah, Allah first commanded the believers to face Bayt Al-Maqdis, and then to face the Ka`bah during the prayer. This change was difficult for some of the People of the Book, and even for some Muslims. Then Allah sent revelation which clarified the wisdom behind this command, that is, obedience to Allah, adhering to His commands, facing wherever He commands facing, and implementing whatever He legislates, that is the objective. This is Birr, Taqwa and complete faith. Facing the east or the west does not necessitate righteousness or obedience, unless it is legislated by Allah. This is why Allah said:</p>
        <span className={`${roboto.className} text-[1.4rem] font-bold tracking-[0.05em] w-[90%] text-end text-[#488EAD]`}>لَّيْسَ الْبِرَّ أَن تُوَلُّواْ وُجُوهَكُمْ قِبَلَ الْمَشْرِقِ وَالْمَغْرِبِ وَلَـكِنَّ الْبِرَّ مَنْ ءَامَنَ بِاللَّهِ وَالْيَوْمِ الاٌّخِرِ</span>
        <p className={`${roboto.className} text-[1rem] font-normal tracking-[0.05em] text-start`}>(It is not Birr that you turn your faces towards east and (or) west (in prayers); but Birr is the one who believes in Allah and the Last Day,) Similarly, Allah said about the sacrifices:</p>
    </div>
    <div className="w-[70%] flex justify-between items-center mt-12">
        <Button className={`${roboto.className} ${td.buttons}`}>Next Ayah</Button>
        <Button className={`${roboto.className} ${td.buttons}`}>Previous Ayah</Button>
    </div>
    </div>
  )
}

export default TafsirDetails