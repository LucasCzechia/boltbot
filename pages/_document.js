// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document'
import Image from 'next/image'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet" />
        
        {/* Primary Meta Tags */}
        <meta name="title" content="BoltBot⚡ Dashboard" />
        <meta name="description" content="BoltBot⚡ is an advanced AI-powered Discord bot featuring text generation, DALL-E image creation, Python code execution, and powerful utility tools." />
        <meta name="theme-color" content="#ffcc00" />

        {/* Open Graph / Discord */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://boltbot.app/" />
        <meta property="og:title" content="BoltBot⚡ Dashboard" />
        <meta property="og:description" content="BoltBot⚡ is an advanced AI-powered Discord bot featuring text generation, DALL-E image creation, Python code execution, and powerful utility tools." />
        <meta property="og:image" content="/images/boltbot.webp" />
        <meta property="og:image:width" content="300" />
        <meta property="og:image:height" content="300" />
        <meta name="twitter:card" content="summary" />

        {/* Discord specific */}
        <meta name="og:site_name" content="BoltBot⚡" />
        <meta name="og:image:alt" content="BoltBot Logo" />
        <meta property="discord:color" content="#ffcc00" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
