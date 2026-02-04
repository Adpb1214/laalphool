import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Beautiful Surprise 💖',
  description: 'A special surprise for someone special',
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
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap" 
          rel="stylesheet" 
        />
        <link 
          rel="icon" 
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💖</text></svg>" 
        />
      </head>
      <body style={{
        background: 'linear-gradient(to bottom right, #fdf2f8, #fff1f2)',
        minHeight: '100vh',
      }}>
        {children}
      </body>
    </html>
  )
}