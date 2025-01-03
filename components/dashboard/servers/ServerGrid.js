// components/dashboard/servers/ServerGrid.js
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import SearchServers from './SearchServers'
import LoadingPreview from './LoadingPreview'
import PinIcon from './PinIcon'

const CARDS_PER_ROW = 3;

export default function ServerGrid() {
  const [servers, setServers] = useState([])
  const [filteredServers, setFilteredServers] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCards, setActiveCards] = useState([])
  const [pinnedServers, setPinnedServers] = useState(new Set())
  const [hasSearched, setHasSearched] = useState(false)
  const router = useRouter()

  const fetchServers = async () => {
    try {
      const response = await fetch('/api/discord/servers')
      if (!response.ok) throw new Error('Failed to fetch servers')
      const data = await response.json()

      setTimeout(() => {
        setServers(data)
        setFilteredServers(data)
        setLoading(false)
      }, 600)
    } catch (error) {
      console.error('Error:', error)
      setLoading(false)
    }
  }

  useEffect(() => {
    const savedPins = localStorage.getItem('pinnedServers')
    if (savedPins) {
      setPinnedServers(new Set(JSON.parse(savedPins)))
    }
    fetchServers()
  }, [])

  useEffect(() => {
    if (!loading && filteredServers.length > 0) {
      startAnimation()
    }
  }, [loading, filteredServers])

  const startAnimation = () => {
    setActiveCards([])
    filteredServers.forEach((_, index) => {
      setTimeout(() => {
        setActiveCards(prev => [...prev, index])
      }, index * 100)
    })
  }

  const togglePin = (serverId) => {
    setPinnedServers(prev => {
      const newSet = new Set(prev)
      if (newSet.has(serverId)) {
        newSet.delete(serverId)
      } else {
        newSet.add(serverId)
      }
      localStorage.setItem('pinnedServers', JSON.stringify([...newSet]))
      return newSet
    })
  }

  const handleSearch = (searchResults) => {
    setFilteredServers(searchResults)
    setActiveCards([])
    setHasSearched(true)
  }

  const handleServerClick = async (server) => {
    if (server.botPresent) {
      await router.push(`/dashboard/servers/${server.id}`)
    } else {
      window.location.href = `https://discord.com/oauth2/authorize?client_id=1250114494081007697&permissions=8&scope=bot&guild_id=${server.id}`
    }
  }

  const getServerRows = () => {
    const sortedServers = [...filteredServers].sort((a, b) => {
      const aPin = pinnedServers.has(a.id)
      const bPin = pinnedServers.has(b.id)
      return bPin - aPin
    })

    const rows = []
    for (let i = 0; i < sortedServers.length; i += CARDS_PER_ROW) {
      rows.push(sortedServers.slice(i, i + CARDS_PER_ROW))
    }
    return rows
  }

  if (loading) {
    return <LoadingPreview count={servers.length || 12} />
  }

  if (!loading && servers.length === 0) {
    return (
      <div className="no-servers">
        <h2>
          <span className="text-gradient">No servers yet!</span> 😢
        </h2>
        <Link 
          href="https://discord.com/oauth2/authorize?client_id=1250114494081007697&permissions=8&scope=bot" 
          className="cta-button"
        >
          Add Bot to Server
        </Link>
      </div>
    )
  }

  return (
    <>
      <SearchServers servers={servers} onSearch={handleSearch} />
      {filteredServers.length === 0 && hasSearched ? (
        <div className="no-results">
          <h2>No matching servers found</h2>
          <p>Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="servers-grid">
          {getServerRows().map((row, rowIndex) => (
            <div key={rowIndex} className="servers-row">
              {row.map((server, index) => {
                const cardIndex = rowIndex * CARDS_PER_ROW + index;
                return (
                  <div 
                    key={server.id} 
                    className={`server-card ${!server.botPresent ? 'inactive' : ''} ${
                      activeCards.includes(cardIndex) ? 'card-active' : ''
                    }`}
                    onClick={() => handleServerClick(server)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleServerClick(server);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`${server.name} server${!server.botPresent ? ' - Bot not added' : ''}`}
                  >
                    <button 
                      className="pin-button"
                      onClick={(e) => {
                        e.stopPropagation()
                        togglePin(server.id)
                      }}
                      aria-label={pinnedServers.has(server.id) ? "Unpin server" : "Pin server"}
                    >
                      <PinIcon isPinned={pinnedServers.has(server.id)} />
                    </button>

                    <div className="card-content">
                      <div className="server-header">
                        <Image 
                          src={server.icon 
                            ? `https://cdn.discordapp.com/icons/${server.id}/${server.icon}.${server.icon.startsWith('a_') ? 'gif' : 'png'}?size=128` 
                            : `https://ui-avatars.com/api/?name=${encodeURIComponent(server.name)}&background=1a1a1a&color=ffcc00&size=128`
                          }
                          alt={`${server.name} icon`}
                          width={56}
                          height={56}
                          className="server-icon"
                          unoptimized
                        />
                        <div className="server-info">
                          <div className="server-name">{server.name}</div>
                          <div className="server-members">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                              <circle cx="9" cy="7" r="4"/>
                              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                            </svg>
                            <span className="member-count">
                              {server.botPresent ? server.memberCount.toLocaleString() : "?"}
                            </span> members 
                            <span className="online-count">
                              {server.botPresent ? server.onlineCount.toLocaleString() : "?"} online
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="server-status">
                        <span className={`status-dot ${server.botPresent ? 'active' : 'inactive'}`}></span>
                        {server.botPresent ? 'Bot Active' : 'Bot Not Added'}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      )}
    </>
  )
}
