import { primary_font, roboto } from "@/app/font/font"
import styles from "./tafsirDetails.module.css"
import { Button } from "@mui/material"
import { FaDiamond } from "react-icons/fa6";
// import { HiRefresh } from "react-icons/hi";

const TafsirDetails = () => {
  return (
    <div className={styles.wrapper}>
    <div className={styles.quranAyah}>
        {/* <h1 className={primary_font.className}>لَّيْسَ الْبِرَّ أَن تُوَلُّوا وُجُوهَكُمْ قِبَلَ الْمَشْرِقِ وَالْمَغْرِبِ وَلَـٰكِنَّ الْبِرَّ مَنْ آمَنَ بِاللَّـهِ وَالْيَوْمِ الْآخِرِ وَالْمَلَائِكَةِ وَالْكِتَابِ وَالنَّبِيِّينَ وَآتَى الْمَالَ عَلَىٰ حُبِّهِ ذَوِي الْقُرْبَىٰ وَالْيَتَامَىٰ وَالْمَسَاكِينَ وَابْنَ السَّبِيلِ وَالسَّائِلِينَ وَفِي الرِّقَابِ وَأَقَامَ الصَّلَاةَ وَآتَى الزَّكَاةَ وَالْمُوفُونَ بِعَهْدِهِمْ إِذَا عَاهَدُوا ۖ وَالصَّابِرِينَ فِي الْبَأْسَاءِ وَالضَّرَّاءِ وَحِينَ الْبَأْسِ ۗ أُولَـٰئِكَ الَّذِينَ صَدَقُوا ۖ وَأُولَـٰئِكَ هُمُ الْمُتَّقُونَ</h1> */}
        <h4 className={roboto.className}>Righteousness is not in turning your faces towards the east or the west. Rather, the righteous are those who believe in Allah, the Last Day, the angels, the Books, and the prophets; who give charity out of their cherished wealth to relatives, orphans, the poor, ˹needy˺ travellers, beggars, and for freeing captives; who establish prayer, pay alms-tax, and keep the pledges they make; and who are patient in times of suffering, adversity, and in ˹the heat of˺ battle. It is they who are true ˹in faith˺, and it is they who are mindful ˹of Alla</h4>
    </div>
    <div className={styles.diamondLine}>
    <FaDiamond />
    <hr/>
    <FaDiamond />
    </div>
    <div className={styles.tafsir}>
        <h2 className={primary_font.className}>Al-Birr (Piety, Righteousness)</h2>
        <p className={roboto.className}>This Ayah contains many great wisdoms, encompassing rulings and correct beliefs.
        As for the explanation of this Ayah, Allah first commanded the believers to face Bayt Al-Maqdis, and then to face the Ka`bah during the prayer. This change was difficult for some of the People of the Book, and even for some Muslims. Then Allah sent revelation which clarified the wisdom behind this command, that is, obedience to Allah, adhering to His commands, facing wherever He commands facing, and implementing whatever He legislates, that is the objective. This is Birr, Taqwa and complete faith. Facing the east or the west does not necessitate righteousness or obedience, unless it is legislated by Allah. This is why Allah said:</p>
        <span className={roboto.className}>لَّيْسَ الْبِرَّ أَن تُوَلُّواْ وُجُوهَكُمْ قِبَلَ الْمَشْرِقِ وَالْمَغْرِبِ وَلَـكِنَّ الْبِرَّ مَنْ ءَامَنَ بِاللَّهِ وَالْيَوْمِ الاٌّخِرِ</span>
        <p className={roboto.className}>(It is not Birr that you turn your faces towards east and (or) west (in prayers); but Birr is the one who believes in Allah and the Last Day,) Similarly, Allah said about the sacrifices:</p>
    </div>
    <div className={styles.buttons}>
        <Button className={roboto.className}>Next Ayah</Button>
        <Button className={roboto.className}>Previous Ayah</Button>
    </div>
    </div>
  )
}

export default TafsirDetails