import './globals.css'
import { AuthProvider } from '@/context/AuthContext'
import Sidebar from '../components/Sidebar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="d-flex min-vh-100">
            <Sidebar />
            <main className="flex-grow-1">
              <div className="container-fluid p-4">
                {children}
              </div>
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}