import { useState } from 'react';

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const SearchAndFilterBar = ({ searchQuery, setSearchQuery, filter, setFilter, filterOptions }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <section className="relative z-10 mx-auto max-w-7xl -mt-6 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
            <SearchIcon />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search teams or competitions..."
            className="w-full rounded-lg border border-[#1e2a45] bg-[#0f1629] py-3.5 pl-12 pr-4 text-sm text-white placeholder-gray-500 transition-colors focus:border-[#00e676] focus:outline-none"
          />
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setDropdownOpen((open) => !open)}
            className="flex w-full items-center justify-between rounded-lg border border-[#1e2a45] bg-[#0f1629] py-3.5 pl-4 pr-3 text-sm text-white transition-colors focus:border-[#00e676] focus:outline-none sm:w-[160px]"
          >
            <span>{filter}</span>
            <ChevronDownIcon />
          </button>

          {dropdownOpen && (
            <div className="absolute left-0 right-0 top-full z-20 mt-1 overflow-hidden rounded-lg border border-[#1e2a45] bg-[#0f1629] shadow-xl sm:right-auto">
              {filterOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setFilter(option);
                    setDropdownOpen(false);
                  }}
                  className={`w-full px-4 py-2.5 text-left text-sm transition-colors ${
                    filter === option ? 'bg-[#1e3a6e] text-white' : 'text-gray-300 hover:bg-[#1e2a45]'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchAndFilterBar;
