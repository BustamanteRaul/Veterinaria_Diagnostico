import { useState } from "react";

interface SearchBarProps<T> {
  data: T[];
  onResults: (filtered: T[]) => void;
  // Tell the component which fields to search in
  searchKeys: (keyof T)[];
  placeholder?: string;
}

export default function SearchBar<T>({
  data,
  onResults,
  searchKeys,
  placeholder = "Search...",
}: SearchBarProps<T>) {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (!value.trim()) {
      onResults(data); // empty query → show all
      return;
    }

    const lower = value.toLowerCase();
    const filtered = data.filter((item) =>
      searchKeys.some((key) =>
        String(item[key]).toLowerCase().includes(lower)
      )
    );
    onResults(filtered);
  };

  const handleClear = () => {
    setQuery("");
    onResults(data);
  };

  return (
    <div className="relative w-full max-w-md">
      {/* Search icon */}
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
          />
        </svg>
      </div>

      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full pl-9 pr-8 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
      />

      {/* Clear button — only shows when there's text */}
      {query && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
