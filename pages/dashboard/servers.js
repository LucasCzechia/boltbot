// pages/dashboard/servers.js
import { useSession } from 'next-auth/react'
import { getServerSession } from "next-auth/next"
import { authOptions } from '../api/auth/[...nextauth]'
import { useRouter } from 'next/router'
import DashboardNav from '../../components/dashboard/DashboardNav'
import GreetingBanner from '../../components/dashboard/servers/GreetingBanner'
import ServerGrid from '../../components/dashboard/servers/ServerGrid'
import DashboardFooter from '../../components/dashboard/DashboardFooter'
import ScrollToTop from '../../components/dashboard/ScrollToTop'
import Starfield from '../../components/misc/Starfield'
import Head from 'next/head'

export default function ServersPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace('/auth/login')
    },
  })

  if (status === 'loading') {
    return (
      <div className="loading-screen">
        <svg className="lightning" viewBox="0 0 24 24" fill="var(--primary)">
          <path d="M13 0L0 13h9v11l13-13h-9z"/>
        </svg>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Select Server - BoltBot⚡</title>
      </Head>
      
      <Starfield />
      
      <DashboardNav />
      
      <div className="servers-container">
        <GreetingBanner username={session?.user?.global_name || session?.user?.name} />
        <h1 className="page-title">Select a Server</h1>
        <p className="page-subtitle">Choose a server to manage BoltBot⚡ settings</p>
        <ServerGrid />
      </div>

      <ScrollToTop />
      <DashboardFooter />
    </>
  )
}

export async function getServerSideProps({ req, res }) {
  const session = await getServerSession(req, res, authOptions)
  
  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    }
  }

  return {
    props: {
      session,
    }
  }
}
