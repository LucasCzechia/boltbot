// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet" />
        
        {/* Primary Meta Tags */}
        <meta name="title" content="BoltBot⚡ - Advanced AI Discord Bot" />
        <meta name="description" content="Your advanced AI-powered Discord companion with powerful features including text generation, image creation, and real-time tools." />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://boltbot.app/" />
        <meta property="og:title" content="BoltBot⚡ - Advanced AI Discord Bot" />
        <meta property="og:description" content="Your advanced AI-powered Discord companion with powerful features including text generation, image creation, and real-time tools." />
        <meta property="og:image" content="https://cdn.discordapp.com/attachments/1309823577687851028/1311442603606282290/1000020718-removebg-preview.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://boltbot.app/" />
        <meta property="twitter:title" content="BoltBot⚡ - Advanced AI Discord Bot" />
        <meta property="twitter:description" content="Your advanced AI-powered Discord companion with powerful features including text generation, image creation, and real-time tools." />
        <meta property="twitter:image" content="https://cdn.discordapp.com/attachments/1309823577687851028/1311442603606282290/1000020718-removebg-preview.png" />

        {/* Discord specific */}
        <meta property="discord:color" content="#ffcc00" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
