import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TNF Global Bangladesh | Your Pathway to Global Education',
  description: 'TNF Global Bangladesh is a premium education consultancy helping students study abroad with expert visa, admission, and documentation support.',
  keywords: 'study abroad Bangladesh, student visa, university admission, TNF Global, education consultancy',
  openGraph: {
    title: 'TNF Global Bangladesh | Your Pathway to Global Education',
    description: 'Expert guidance for studying abroad — from university selection to visa approval.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
