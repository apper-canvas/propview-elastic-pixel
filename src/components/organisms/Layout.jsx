// Header import removed - no longer using inner header section

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
{/* Inner header section removed as requested */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}

export default Layout