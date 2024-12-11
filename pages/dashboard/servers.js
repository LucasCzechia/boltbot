// pages/dashboard/servers.js
import { useSession, getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import DashboardNav from '../../components/dashboard/DashboardNav'
import ServerGrid from '../../components/dashboard/ServerGrid'
import Head from 'next/head'

export default function ServersPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === 'loading') {
    return (
      <div className="loading-screen">
        <svg className="lightning" viewBox="0 0 24 24" fill="var(--primary)">
          <path d="M13 0L0 13h9v11l13-13h-9z"/>
        </svg>
      </div>
    )
  }

  if (!session) {
    router.push('/auth/login')
    return null
  }

  return (
    <>
      <Head>
        <title>Select Server - BoltBot⚡</title>
      </Head>

      <DashboardNav />
      
      <div className="servers-container">
        <h1 className="page-title">Select a Server</h1>
        <p className="page-subtitle">Choose a server to manage BoltBot⚡ settings</p>
        <ServerGrid />
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  
  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    }
  }

  return {
    props: {}
  }
}
