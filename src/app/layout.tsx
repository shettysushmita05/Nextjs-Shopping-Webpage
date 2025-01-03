import '@/app/globals.css'
import { Providers } from '@/components/providers'
import { Navbar } from '@/components/navbar'
import { Sidebar } from '@/components/sidebar'
import { ThemeProvider } from '@/components/theme-provider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="min-h-screen bg-background text-foreground">
              <Navbar />
              <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
                <Sidebar />
                <main className="flex-1">{children}</main>
              </div>
            </div>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}

