/** Submit button with the AskForm.tsx spinner/loading idiom, styled full-width for auth forms. */
export function SubmitButton({ loading, loadingLabel, children }: {
  loading: boolean;
  loadingLabel: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full inline-flex items-center justify-center gap-2 bg-[#003049] hover:bg-[#004a6e] disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold px-6 py-2.5 rounded-md transition-colors duration-200"
    >
      {loading ? (
        <>
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
          </svg>
          {loadingLabel}
        </>
      ) : (
        children
      )}
    </button>
  );
}
