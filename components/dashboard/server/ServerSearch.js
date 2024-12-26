// components/dashboard/server/ServerSearch.js 
import { useState, useEffect } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';

export default function ServerSearch({ onSearch, filterOptions, totalItems }) {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState(filterOptions?.[0]?.id || '');
  const [displayedItems, setDisplayedItems] = useState(totalItems);

  useEffect(() => {
    setDisplayedItems(totalItems);
  }, [totalItems]);

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    onSearch({ query: searchQuery, filter: activeFilter });
  };

  const handleFilter = (filterId) => {
    setActiveFilter(filterId);
    onSearch({ query, filter: filterId });
  };

  const clearSearch = () => {
    setQuery('');
    onSearch({ query: '', filter: activeFilter });
  };

  const handleKeyboardShortcut = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      document.querySelector('.search-input')?.focus();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyboardShortcut);
    return () => document.removeEventListener('keydown', handleKeyboardShortcut);
  }, []);

  return (
    <div className="search-container">
      <div className="search-wrapper">
        <SearchIcon className="search-icon" size={20} />
        <input
          type="text"
          className="search-input"
          placeholder="Search settings..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <div className="keyboard-shortcut">
          <span className="key">⌘</span>
          <span className="key">K</span>
        </div>
        {query && (
          <button className="search-clear" onClick={clearSearch}>
            <X size={20} />
          </button>
        )}
      </div>

      {filterOptions && (
        <div className="search-filters">
          {filterOptions.map((filter) => (
            <button
              key={filter.id}
              className={`filter-chip ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => handleFilter(filter.id)}
            >
              <filter.icon size={16} />
              {filter.label}
            </button>
          ))}
        </div>
      )}

      <div className="search-results">
        {query && `Showing ${displayedItems} items`}
      </div>
    </div>
  );
}
