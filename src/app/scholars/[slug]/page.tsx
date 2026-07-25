import ComingSoon from "@/components/common/Errors/Fallback/comingSoon";

export default function Scholars ()  {
  return (
    <div>
      <ComingSoon/>
    </div>
  )
}


// import Image from "next/image";
// import Link from "next/link";
// import { notFound } from "next/navigation";
// import rawData from "@/store/data/scholarsData.json";

// type Scholar = {
//   id: number;
//   slug: string;
//   fullName: string;
//   nameArabic?: string;
//   birthHijri: string;
//   birthCE: string;
//   deathHijri: string;
//   deathCE: string;
//   tagline: string;
//   category: string;
//   image: string;
//   era: string;
// };

// // Extended data for detail page (in production, move to API or separate file)
// const scholarDetails: Record<string, any> = {
//   "imam-al-bukhari": {
//     biography: "Muhammad ibn Isma'il al-Bukhari was born in Bukhara in 194 AH. He began studying Hadith at the age of 10 and dedicated his life to the preservation of authentic Prophetic traditions. He traveled across the Islamic world for 16 years, collecting over 600,000 hadiths.",
//     location: "Bukhara (Uzbekistan)",
//     teachers: ["Ishaq ibn Rahwayh", "Ali ibn al-Madini"],
//     students: ["Muslim ibn al-Hajjaj", "Abu Isa at-Tirmidhi"],
//     contributions: "Compiled the most authentic book after the Quran — Sahih al-Bukhari. His methodology became the gold standard for Hadith authentication.",
//     works: [
//       "Sahih al-Bukhari",
//       "Al-Adab al-Mufrad",
//       "At-Tarikh al-Kabir"
//     ],
//     quotes: [
//       {
//         text: "I have not included in this book except what is authentic.",
//         source: "Introduction to Sahih al-Bukhari"
//       }
//     ],
//     timeline: [
//       { year: "194 AH", event: "Born in Bukhara" },
//       { year: "210 AH", event: "Began traveling in search of Hadith" },
//       { year: "236 AH", event: "Completed Sahih al-Bukhari" },
//       { year: "256 AH", event: "Passed away in Samarqand" }
//     ]
//   }
//   // Add more scholars here as needed
// };

// export default function ScholarPage({ params }: { params: { slug: string } }) {
//   const allScholars = rawData.allScholars as Scholar[];
//   const scholar = allScholars.find(s => s.slug === params.slug);

//   if (!scholar) notFound();

//   const details = scholarDetails[params.slug] || {
//     biography: "This scholar played a pivotal role in preserving and transmitting Islamic knowledge.",
//     location: "Various regions of the Islamic world",
//     teachers: ["Multiple renowned scholars"],
//     students: ["Many notable students"],
//     contributions: "Major contributions to Islamic sciences.",
//     works: ["Key works in their field"],
//     quotes: [],
//     timeline: []
//   };

//   return (
//     <main className="bg-[#f8f5f0] text-[#2c2118]">
//       {/* Hero Section */}
//       <div className="relative h-[70vh] min-h-[600px] flex items-center bg-cover bg-center" 
//            style={{ backgroundImage: "url('/Images/Scholars/hero-manuscript.jpg')" }}>
//         <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-[#2c2118]" />
        
//         <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-10">
//           <div className="inline-block px-5 py-1.5 border border-[#d4c3a8] text-[#e8d9b8] text-sm tracking-widest mb-6">
//             {scholar.category.toUpperCase()}
//           </div>
          
//           <h1 className="font-serif text-6xl md:text-7xl leading-none text-white mb-4">
//             {scholar.fullName}
//           </h1>
//           {scholar.nameArabic && (
//             <p className="text-3xl text-[#c9a96e] font-light">{scholar.nameArabic}</p>
//           )}
          
//           <p className="text-white/80 mt-6 max-w-xl text-lg">
//             {scholar.tagline}
//           </p>
          
//           <div className="mt-8 text-white/70 text-sm font-mono tracking-wider">
//             {scholar.birthHijri} – {scholar.deathHijri} H  ({scholar.birthCE} – {scholar.deathCE} CE)
//           </div>
//         </div>
//       </div>

//       <div className="max-w-5xl mx-auto px-6 lg:px-10 -mt-12 relative z-20">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
//           {/* Left Column - Portrait & Quick Facts */}
//           <div className="lg:col-span-5">
//             <div className="sticky top-8">
//               <div className="bg-white border border-[#d4c3a8] rounded-3xl overflow-hidden shadow-xl">
//                 <div className="relative h-[520px]">
//                   <Image
//                     src={scholar.image}
//                     alt={scholar.fullName}
//                     fill
//                     className="object-cover"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
//                 </div>
//               </div>

//               <div className="mt-8 bg-white border border-[#d4c3a8] rounded-2xl p-8 text-sm">
//                 <h4 className="uppercase tracking-widest text-[#8c6f4d] text-xs mb-4">Key Information</h4>
//                 <div className="space-y-4">
//                   <div><span className="font-medium">Born:</span> {scholar.birthCE} CE ({scholar.birthHijri} H)</div>
//                   <div><span className="font-medium">Died:</span> {scholar.deathCE} CE ({scholar.deathHijri} H)</div>
//                   <div><span className="font-medium">Era:</span> {scholar.era}</div>
//                   <div><span className="font-medium">Region:</span> {details.location}</div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Content */}
//           <div className="lg:col-span-7 space-y-16 pt-6">
//             {/* Biography */}
//             <section>
//               <h2 className="font-serif text-4xl mb-6">Biography</h2>
//               <div className="prose prose-stone leading-relaxed text-[15.2px]">
//                 {details.biography}
//               </div>
//             </section>

//             {/* Lineage */}
//             <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               <div>
//                 <h3 className="text-lg font-medium text-[#8c6f4d] mb-4">Teachers</h3>
//                 <ul className="space-y-2 text-[#5c4e3f]">
//                   {details.teachers.map((t: string, i: number) => (
//                     <li key={i} className="flex items-center gap-2">• {t}</li>
//                   ))}
//                 </ul>
//               </div>
//               <div>
//                 <h3 className="text-lg font-medium text-[#8c6f4d] mb-4">Notable Students</h3>
//                 <ul className="space-y-2 text-[#5c4e3f]">
//                   {details.students.map((s: string, i: number) => (
//                     <li key={i} className="flex items-center gap-2">• {s}</li>
//                   ))}
//                 </ul>
//               </div>
//             </section>

//             {/* Contributions */}
//             <section>
//               <h2 className="font-serif text-4xl mb-6">Contributions to Islamic Knowledge</h2>
//               <p className="leading-relaxed text-[15.2px]">{details.contributions}</p>
//             </section>

//             {/* Major Works */}
//             <section>
//               <h2 className="font-serif text-4xl mb-6">Major Works</h2>
//               <div className="grid gap-4">
//                 {details.works.map((work: string, i: number) => (
//                   <div key={i} className="bg-white border-l-4 border-[#8c6f4d] pl-6 py-4 text-lg italic">
//                     {work}
//                   </div>
//                 ))}
//               </div>
//             </section>

//             {/* Famous Quotes */}
//             {details.quotes.length > 0 && (
//               <section>
//                 <h2 className="font-serif text-4xl mb-8">Notable Quotes</h2>
//                 {details.quotes.map((quote: any, i: number) => (
//                   <blockquote key={i} className="border-l-4 border-[#c9a96e] pl-8 italic text-lg">
//                     “{quote.text}”<br />
//                     <span className="text-sm not-italic text-[#8c6f4d] mt-3 block">- {quote.source}</span>
//                   </blockquote>
//                 ))}
//               </section>
//             )}

//             {/* Related Scholars */}
//             <section>
//               <h2 className="font-serif text-4xl mb-6">Related Scholars</h2>
//               <div className="flex flex-wrap gap-4">
//                 {allScholars
//                   .filter(s => s.id !== scholar.id && s.category === scholar.category)
//                   .slice(0, 4)
//                   .map((related) => (
//                     <Link
//                       key={related.id}
//                       href={`/scholar/${related.slug}`}
//                       className="group px-6 py-4 bg-white border border-[#d4c3a8] hover:border-[#8c6f4d] rounded-2xl transition-all hover:-translate-y-0.5"
//                     >
//                       <p className="font-medium group-hover:text-[#8c6f4d]">{related.fullName}</p>
//                       <p className="text-xs text-[#8c6f4d] mt-1">{related.category}</p>
//                     </Link>
//                   ))}
//               </div>
//             </section>
//           </div>
//         </div>
//       </div>

//       {/* Elegant Footer Navigation */}
//       <div className="mt-24 border-t border-[#d4c3a8] py-12">
//         <div className="max-w-5xl mx-auto px-6 lg:px-10 flex justify-between items-center text-sm">
//           <Link href="/scholars" className="flex items-center gap-3 text-[#8c6f4d] hover:text-[#2c2118]">
//             ← Back to Timeline
//           </Link>
//           <div className="text-[#8c6f4d] text-xs tracking-widest">PRESERVING HERITAGE • ONE SCHOLAR AT A TIME</div>
//         </div>
//       </div>
//     </main>
//   );
// }