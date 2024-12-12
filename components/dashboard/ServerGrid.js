// components/dashboard/ServerGrid.js
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import SearchServers from './SearchServers'
import LoadingPreview from './LoadingPreview'

export default function ServerGrid() {
  const [servers, setServers] = useState([])
  const [filteredServers, setFilteredServers] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCards, setActiveCards] = useState([])
  const router = useRouter()

  useEffect(() => {
    fetchServers()
  }, [])

  useEffect(() => {
    if (!loading && filteredServers.length > 0) {
      startAnimation()
    }
  }, [loading, filteredServers])

  const startAnimation = () => {
    setActiveCards([])
    setTimeout(() => {
      filteredServers.forEach((_, index) => {
        setTimeout(() => {
          setActiveCards(prev => [...prev, index])
        }, index * 200)
      })
    }, 300)
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
      <div className="servers-grid">
        {filteredServers.map((server, index) => (
          <div 
            key={server.id} 
            className={`server-card ${!server.botPresent ? 'inactive' : ''} ${
              activeCards.includes(index) ? 'card-active' : ''
            }`}
            onClick={() => handleServerClick(server)}
          >
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
        ))}
      </div>
    </>
  )
}
