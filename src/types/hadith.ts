export interface HadithBookList {
  id: number;
  nameAr: string;
  nameEn: string;
  about: string;
  collectionCount: number;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface HadithBooks {
  message: string;
  code: number;
  data: HadithBookList;
}

export interface HadithBookCollectionList {
  id: number;
  bookId: number;
  hadithBook: HadithBookList;
  nameEn: string;
  nameAr: string;
  chapterCount: number;
  startingChapter: number;
  endingChapter: number;
  createdAt: string;
  updatedAt: string;
}

export interface HadithBookCollection {
  message: string;
  code: number;
  data: HadithBookCollectionList[];
}

export interface HadithBookCollection2 {
  message: string;
  code: number;
  data: HadithBookCollectionList;
}

export interface HadithItemList {
  id: string;
  collectionId: number;
  hadithCollection: HadithBookCollectionList
  chapterNo: number;
  nameEn: string;
  nameAr: string;
  chapterNarration: string;
  chapterIntroAr:string;
  chapterIntroEn:string;
  bodyEn: string;
  bodyAr: string;
  ref: string;
  bookRef: string,
  grade: string,
  createdAt: string;
  updatedAt: string;
}

export interface HadithItem {
  message: string;
  code: number;
  data: HadithItemList[];
}


export interface HadithResponse {
  message: string;
  code: number;
  data: HadithItemList;
}

// export interface HadithData {
//   id: string;
//   collectionId: number;
//   hadithCollection: HadithBookCollectionList;
//   chapterNo: number;
//   nameEn: string;
//   nameAr: string;
//   chapterNarration: string;
//   bodyEn: string;
//   bodyAr: string;
//   ref: string;
//   bookRef: string;
//   grade: string;
//   createdAt: string;
//   updatedAt: string;
// }




