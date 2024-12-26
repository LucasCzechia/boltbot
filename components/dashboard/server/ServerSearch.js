// components/dashboard/server/ServerSearch.js 
import { useState, useEffect, useRef } from 'react';
import { Search as SearchIcon, X, Info } from 'lucide-react';

const getSectionInfo = (section) => {
  const sectionInfo = {
    general: "Configure basic bot settings and behavior for your server. These settings affect how the bot interacts and responds to users.",
    tools: "Enable or disable various bot tools and utilities. Customize which features are available to enhance your server's capabilities.",
    features: "Manage advanced bot features like image recognition and file handling. Control powerful functionalities to improve your server experience.",
    personality: "Customize your bot's personality and behavior patterns. Choose from preset personalities or create your own custom persona."
  };
  return sectionInfo[section] || "";
};

export default function ServerSearch({ onSearch, filterOptions, totalItems, section }) {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState(filterOptions?.[0]?.id || '');
  const [displayedItems, setDisplayedItems] = useState(totalItems);
  const [showInfo, setShowInfo] = useState(false);
  const infoDropdownRef = useRef(null);
  const infoButtonRef = useRef(null);

  useEffect(() => {
    setDisplayedItems(totalItems);
  }, [totalItems]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        infoDropdownRef.current && 
        !infoDropdownRef.current.contains(event.target) &&
        !infoButtonRef.current.contains(event.target)
      ) {
        setShowInfo(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setShowInfo(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

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
          <button
            ref={infoButtonRef}
            className="info-button"
            onClick={() => setShowInfo(!showInfo)}
            aria-label="Show section information"
          >
            <Info size={16} />
            Info
          </button>
          {showInfo && (
            <div 
              ref={infoDropdownRef}
              className={`info-dropdown ${showInfo ? 'show' : ''}`}
            >
              <div className="info-dropdown-content">
                <div className="info-dropdown-header">
                  <div className="info-dropdown-icon">
                    <Info size={18} />
                  </div>
                  <div className="info-dropdown-title">
                    About this section
                  </div>
                </div>
                {getSectionInfo(section)}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="search-results">
        {query && `Showing ${displayedItems} items`}
      </div>
    </div>
  );
}
