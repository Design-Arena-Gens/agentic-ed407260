export const metadata = {
  title: 'ESL Conversation Course - Grade 10',
  description: 'Interactive ESL lessons for Grade 10 students',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
