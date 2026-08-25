import './globals.css'

export const metadata = {
  title: 'Localystics',
  description: 'AI-powered hyper-local opportunity discovery',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}