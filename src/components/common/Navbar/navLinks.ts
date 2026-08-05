export interface NavLinkItem {
  name: string;
  link: string;
  key: string;
}

// Shared between the desktop nav row and the mobile SideDrawer so the two
// never drift out of sync (a link added to one used to silently miss the other).
export const NAV_LINKS: NavLinkItem[] = [
  { name: "Home", link: "/", key: "home" },
  { name: "Quran", link: "/quran", key: "quran" },
  { name: "Supplication", link: "/supplication", key: "supplication" },
  { name: "Hadith", link: "/hadith", key: "hadith" },
  { name: "Scholars", link: "/scholars", key: "scholars" },
  { name: "QnA", link: "/qna", key: "qna" },
  { name: "Articles", link: "/articles", key: "articles" },
  { name: "Zakat Calculator", link: "/zakat-calculator", key: "zakat-calculator" },
  { name: "Support Us", link: "/support-us", key: "support-us" },
];
