import React from 'react'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
{/* Main content area */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}

export default Layout