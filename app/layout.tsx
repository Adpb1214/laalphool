import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Tere Liye 🌹',
  description: 'Kuch khaas tere liye...',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link 
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
        <link 
          rel="icon" 
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌹</text></svg>" 
        />
      </head>
      <body style={{
        background: '#fff5f5',
        minHeight: '100vh',
      }}>
        {children}
      </body>
    </html>
  )
}