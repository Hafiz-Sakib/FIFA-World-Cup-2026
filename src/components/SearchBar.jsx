import React from "react";
import { Search, X } from "lucide-react";

/**
 * SearchBar – reusable search input with clear button.
 * Props:
 *   value: string
 *   onChange: (val: string) => void
 *   placeholder?: string
 */
export default function SearchBar({
  value,
  onChange,
  placeholder = "Search teams...",
}) {
  return (
    <div className="relative w-full">
      <Search
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
        style={{ color: "#C9A84C" }}
      />
      <input
        type="text"
        className="field-input w-full pl-9 pr-9 py-2.5 text-sm"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
