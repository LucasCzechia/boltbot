// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
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
        <meta property="og:image" content="https://cdn.discordapp.com/attachments/1309823577687851028/1311442603606282290/1000020718-removebg-preview.png" />
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="600" />
        <meta name="twitter:card" content="summary_large_image" />

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
