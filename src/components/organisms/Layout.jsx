import Header from "@/components/organisms/Header"

const Layout = ({ children, onSearch, onToggleFilters }) => {
  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={onSearch} onToggleFilters={onToggleFilters} />
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}

export default Layout