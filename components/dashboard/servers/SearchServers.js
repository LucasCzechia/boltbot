// components/dashboard/servers/SearchServers.js
import { useState, useCallback } from 'react'

export default function SearchServers({ servers, onSearch }) {
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('members')
  const [displayedServerCount, setDisplayedServerCount] = useState(servers.length); // Initialize with total server count

  const handleSearch = useCallback((searchQuery) => {
    setQuery(searchQuery)
    const filtered = servers.filter(server =>
      server.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    onSearch(filtered)
    setDisplayedServerCount(filtered.length); 
  }, [servers, onSearch])

  const handleFilter = (filter) => {
    setActiveFilter(filter)
    let sorted = [...servers]

    switch(filter) {
      case 'members':
        sorted.sort((a, b) => b.memberCount - a.memberCount)
        break
      case 'alphabetical':
        sorted.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'bot':
        sorted = sorted.filter(server => server.botPresent)
        break
    }

    onSearch(sorted)
    setDisplayedServerCount(sorted.length); // Update displayed count
  }

  return (
    <div className="search-container">
      <div className="search-wrapper">
        <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>

        <input
          type="text"
          className="search-input"
          placeholder="Search servers..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
        />

        <div className="keyboard-shortcut">
          <span className="key">⌘</span>
          <span className="key">K</span>
        </div>

        {query && (
          <button className="search-clear" onClick={() => handleSearch('')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
      </div>

      <div className="search-filters">
        <button
          className={`filter-chip ${activeFilter === 'members' ? 'active' : ''}`}
          onClick={() => handleFilter('members')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="16 12 12 8 8 12"></polyline>
            <line x1="12" y1="16" x2="12" y2="8"></line>
          </svg>
          Most Members
        </button>
        <button
          className={`filter-chip ${activeFilter === 'alphabetical' ? 'active' : ''}`}
          onClick={() => handleFilter('alphabetical')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18M3 12h18M3 18h18"></path>
          </svg>
          Alphabetical
        </button>
        <button
          className={`filter-chip ${activeFilter === 'bot' ? 'active' : ''}`}
          onClick={() => handleFilter('bot')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
          Bot Active Only
        </button>
      </div>

      <div className="search-results">
        {query && `Showing ${displayedServerCount} servers`}
        {!query && `Showing ${servers.length} servers`}
      </div>
    </div>
  )
}
