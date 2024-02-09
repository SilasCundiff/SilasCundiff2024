import './global.css'

export const metadata = {
  title: 'Silas Cundiff Portfolio',
  description: 'Silas Cundiff Portfolio Website built with Next.js, Three.js, and Tailwind CSS',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className='antialiased'>
      <head />
      <body id='root'>
        <div className='scroll-snap-parent'>{children}</div>
      </body>
    </html>
  )
}
