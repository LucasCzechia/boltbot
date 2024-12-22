// pages/auth/login/logout.js
import { useEffect } from 'react'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function Logout() {
  const router = useRouter()

  useEffect(() => {
    const handleLogout = async () => {
      try {
        localStorage.clear()
        sessionStorage.clear()
        
        const cookies = document.cookie.split(";")
        for (let cookie of cookies) {
          const eqPos = cookie.indexOf("=")
          const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
          document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/"
        }

        await signOut({
          redirect: false,
        })

        router.push('/auth/login')
      } catch (error) {
        console.error('Logout error:', error)
        router.push('/auth/login')
      }
    }

    handleLogout()
  }, [router])

  return (
    <>
      <Head>
        <title>Logging out... - BoltBot⚡</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <div className="loading-screen">
        <svg className="lightning" viewBox="0 0 24 24" fill="var(--primary)">
          <path d="M13 0L0 13h9v11l13-13h-9z"/>
        </svg>
      </div>
    </>
  )
}

export async function getServerSideProps({ req, res }) {
  res.setHeader(
    'Cache-Control',
    'private, no-cache, no-store, max-age=0, must-revalidate'
  )
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')

  return {
    props: {}
  }
}
