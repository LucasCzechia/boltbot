// components/dashboard/server/ServerSearch.js 
import { useState, useEffect } from 'react';
import { Search as SearchIcon, X, Info } from 'lucide-react';

const getFilterInfo = (filterId) => {
  const filterInfo = {
    // General Settings
    allSettings: "View all available settings for configuring your bot",
    customized: "Show only settings that have been modified from their defaults",
    default: "Show settings that are still using their default values",
    
    // Tools
    allTools: "View all available tools and utilities for your bot",
    activeTools: "Show tools that are currently enabled",
    inactiveTools: "Show tools that are currently disabled",
    
    // Features
    allFeatures: "View all available features for your bot",
    activeFeatures: "Show features that are currently enabled",
    inactiveFeatures: "Show features that are currently disabled",
    
    // Personality
    allPersonalities: "View all available personality options for your bot",
    presetPersonalities: "Show pre-created personality options",
    customPersonalities: "Show your custom-made personalities"
  };

  return filterInfo[filterId] || "Filter your search results";
};

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
            <div key={filter.id} className="filter-chip-wrapper">
              <button
                className={`filter-chip ${activeFilter === filter.id ? 'active' : ''}`}
                onClick={() => handleFilter(filter.id)}
              >
                <filter.icon size={16} />
                {filter.label}
              </button>
              <div className="filter-chip-info">
                <Info className="info-icon" size={16} />
                <div className="info-tooltip">
                  {getFilterInfo(filter.id)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="search-results">
        {query && `Showing ${displayedItems} items`}
      </div>
    </div>
  );
}
