// components/dashboard/servers/ServerGrid.js
import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import SearchServers from './SearchServers'
import LoadingPreview from './LoadingPreview'
import PinIcon from './PinIcon'

const MIN_CARD_WIDTH = 280; // Minimum width for server cards
const GRID_GAP = 24; // Gap between cards

export default function ServerGrid() {
  const [servers, setServers] = useState([])
  const [filteredServers, setFilteredServers] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCards, setActiveCards] = useState([])
  const [pinnedServers, setPinnedServers] = useState(new Set())
  const [gridLayout, setGridLayout] = useState([])
  const gridRef = useRef(null)
  const router = useRouter()

  useEffect(() => {
    fetchServers()
    const savedPins = localStorage.getItem('pinnedServers')
    if (savedPins) {
      setPinnedServers(new Set(JSON.parse(savedPins)))
    }
  }, [])

  useEffect(() => {
    if (!loading && filteredServers.length > 0) {
      startAnimation()
      calculateLayout()
    }
  }, [loading, filteredServers])

  useEffect(() => {
    const handleResize = () => {
      calculateLayout()
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [filteredServers])

  const calculateLayout = useCallback(() => {
    if (!gridRef.current) return

    const containerWidth = gridRef.current.offsetWidth
    const cardsPerRow = Math.max(1, Math.floor((containerWidth + GRID_GAP) / (MIN_CARD_WIDTH + GRID_GAP)))
    const actualCardWidth = (containerWidth - (cardsPerRow - 1) * GRID_GAP) / cardsPerRow

    const sortedServers = [...filteredServers].sort((a, b) => {
      const aPin = pinnedServers.has(a.id)
      const bPin = pinnedServers.has(b.id)
      return bPin - aPin
    })

    const rows = Math.ceil(sortedServers.length / cardsPerRow)
    let newLayout = []

    for (let i = 0; i < rows; i++) {
      const rowCards = sortedServers.slice(i * cardsPerRow, (i + 1) * cardsPerRow)
      const rowWidth = rowCards.length * actualCardWidth + (rowCards.length - 1) * GRID_GAP
      const rowOffset = (containerWidth - rowWidth) / 2

      newLayout.push({
        cards: rowCards,
        offset: Math.max(0, rowOffset),
        cardWidth: actualCardWidth
      })
    }

    setGridLayout(newLayout)
  }, [filteredServers, pinnedServers])

  const startAnimation = () => {
    setActiveCards([])
    const totalCards = filteredServers.length
    for (let i = 0; i < totalCards; i++) {
      setTimeout(() => {
        setActiveCards(prev => [...prev, i])
      }, i * 100)
    }
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

  const fetchServers = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/discord/servers')
      if (!response.ok) throw new Error('Failed to fetch servers')
      const data = await response.json()
      setServers(data)
      setFilteredServers(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setTimeout(() => setLoading(false), 500)
    }
  }

  const handleSearch = (searchResults) => {
    setFilteredServers(searchResults)
    setActiveCards([])
  }

  const handleServerClick = (server) => {
    if (server.botPresent) {
      router.push(`/dashboard/servers/${server.id}`)
    } else {
      window.location.href = `https://discord.com/oauth2/authorize?client_id=1250114494081007697&permissions=8&scope=bot&guild_id=${server.id}`
    }
  }

  if (loading) {
    return <LoadingPreview />
  }

  return (
    <>
      <SearchServers servers={servers} onSearch={handleSearch} />
      <div className="servers-grid" ref={gridRef}>
        {gridLayout.map((row, rowIndex) => (
          <div 
            key={rowIndex} 
            className="servers-row"
            style={{ 
              marginLeft: `${row.offset}px`,
              gap: `${GRID_GAP}px`,
              width: `calc(100% - ${row.offset * 2}px)`
            }}
          >
            {row.cards.map((server, index) => {
              const cardIndex = rowIndex * Math.ceil(filteredServers.length / gridLayout.length) + index;
              return (
                <div 
                  key={server.id} 
                  className={`server-card ${!server.botPresent ? 'inactive' : ''} ${
                    activeCards.includes(cardIndex) ? 'card-active' : ''
                  }`}
                  style={{
                    width: `${row.cardWidth}px`,
                    minWidth: `${row.cardWidth}px`
                  }}
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

                  <div className="card-content" onClick={() => handleServerClick(server)}>
                    <div className="server-header">
                      <Image 
                        src={server.icon 
                          ? `https://cdn.discordapp.com/icons/${server.id}/${server.icon}.${server.icon.startsWith('a_') ? 'gif' : 'png'}?size=128` 
                          : `https://ui-avatars.com/api/?name=${encodeURIComponent(server.name)}&background=1a1a1a&color=ffcc00&size=128`
                        }
                        alt={server.name}
                        width={50}
                        height={50}
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
                          <span className="member-count">{server.memberCount.toLocaleString()}</span> members 
                          <span className="online-count">{server.onlineCount.toLocaleString()} online</span>
                        </div>
                      </div>
                    </div>
                    <div className="server-status">
                      <span className={`status-dot ${server.botPresent ? 'active' : 'inactive'}`}></span>
                      {server.botPresent ? 'Bot Active' : 'Bot Not Added'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  )
}
