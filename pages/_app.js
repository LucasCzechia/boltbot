// pages/_app.js
import '../styles/globals.css'; 
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      </AuthProvider>
      <Analytics />
    </>
  )
}

export default MyApp
