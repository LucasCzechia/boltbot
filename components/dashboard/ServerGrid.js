// components/dashboard/ServerGrid.js
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

export default function ServerGrid() {
  const [servers, setServers] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function fetchServers() {
      try {
        const response = await fetch('/api/discord/servers')
        const data = await response.json()
        setServers(data)
      } catch (error) {
        console.error('Failed to fetch servers:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchServers()
  }, [])

  const handleServerClick = (server) => {
    if (server.botPresent) {
      router.push(`/dashboard/servers/${server.id}`)
    } else {
      window.location.href = `https://discord.com/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID}&permissions=8&scope=bot&guild_id=${server.id}`
    }
  }

  if (loading) return <div>Loading servers...</div>

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
              src={server.icon ? `https://cdn.discordapp.com/icons/${server.id}/${server.icon}.png` : '/api/placeholder/50/50'} 
              alt={`${server.name} Icon`}
              width={50}
              height={50}
              className="server-icon"
            />
            <div className="server-info">
              <div className="server-name">{server.name}</div>
              <div className="server-members">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
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
