export const metadata = {
  title: 'Stock Price Web Application',
  description: 'Web application for viewing historical stock price charts using the Coinbase API',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
