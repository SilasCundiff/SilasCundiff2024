import { Layout } from '@/components/dom/Layout'
import '@/global.css'

export const metadata = {
  title: 'Silas Cundiff Portfolio',
  description: 'Silas Cundiff Portfolio Website built with Next.js, Three.js, and Tailwind CSS',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en' className='antialiased'>
      <head />
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
