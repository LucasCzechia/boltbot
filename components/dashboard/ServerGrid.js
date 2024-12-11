// components/dashboard/ServerGrid.js
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

export default function ServerGrid() {
  const [servers, setServers] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchServers()
  }, [])

  const fetchServers = async () => {
    try {
      const response = await fetch('/api/discord/servers')
      if (!response.ok) throw new Error('Failed to fetch servers')
      const data = await response.json()
      setServers(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const getServerIcon = (server) => {
    if (server.icon) {
      return `https://cdn.discordapp.com/icons/${server.id}/${server.icon}.${server.icon.startsWith('a_') ? 'gif' : 'png'}?size=128`
    }
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(server.name)}&background=1a1a1a&color=ffcc00&size=128`
  }

  const handleServerClick = (server) => {
    if (server.botPresent) {
      router.push(`/dashboard/servers/${server.id}`)
    } else {
      window.location.href = `https://discord.com/oauth2/authorize?client_id=1250114494081007697&permissions=8&scope=bot&guild_id=${server.id}`
    }
  }

  if (loading) {
    return (
      <div className="loading-screen">
        <svg className="lightning" viewBox="0 0 24 24" fill="var(--primary)">
          <path d="M13 0L0 13h9v11l13-13h-9z"/>
        </svg>
      </div>
    )
  }

  return (
    <div className="servers-grid">
      {servers.map((server) => (
        <div 
          key={server.id} 
          className={`server-card ${!server.botPresent ? 'inactive' : ''}`}
          onClick={() => handleServerClick(server)}
        >
          <div className="server-header">
            <Image 
              src={getServerIcon(server)}
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
                {server.memberCount.toLocaleString()} members
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
  )
}
