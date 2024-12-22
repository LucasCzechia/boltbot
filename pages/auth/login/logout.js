// pages/auth/login/logout.js
import { useEffect } from 'react'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function Logout() {
  const router = useRouter()

  useEffect(() => {
    const performLogout = async () => {
      await signOut({ 
        redirect: false,
      })
      localStorage.clear()
      sessionStorage.clear()
      router.push('/auth/login')
    }

    performLogout()
  }, [router])

  return null
}
