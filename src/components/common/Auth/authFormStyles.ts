/** Shared input/field styling for Login/Register — mirrors src/components/Qna/Ask/AskForm.tsx's idiom. */
export const inputCls = (hasError?: boolean) =>
  `w-full text-sm text-gray-800 bg-white border rounded-md px-3 py-2.5 outline-none placeholder-gray-400 transition-colors duration-150 ${
    hasError
      ? "border-red-300 focus:border-red-400 focus:ring-1 focus:ring-red-100"
      : "border-gray-200 hover:border-gray-300 focus:border-[#003049] focus:ring-1 focus:ring-[#003049]/10"
  }`;
