import { useState } from "react"
import Layout from "@/components/organisms/Layout"
import PropertyGrid from "@/components/organisms/PropertyGrid"
import FilterSidebar from "@/components/molecules/FilterSidebar"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const BrowseProperties = () => {
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 0,
    propertyTypes: [],
    minBeds: 0,
    minBaths: 0,
    location: ""
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false)

  const handleSearch = (query) => {
    setSearchQuery(query)
  }

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters)
  }

  const toggleFilters = () => {
    setIsFilterSidebarOpen(!isFilterSidebarOpen)
  }

  const closeFilters = () => {
    setIsFilterSidebarOpen(false)
  }

  return (
    <Layout onSearch={handleSearch} onToggleFilters={toggleFilters}>
      <div className="flex h-[calc(100vh-64px)]">
        <FilterSidebar
          filters={filters}
          onFiltersChange={handleFiltersChange}
          isOpen={isFilterSidebarOpen}
          onClose={closeFilters}
        />

        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto">
            <div className="max-w-7xl mx-auto p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
                    Find Your Dream Home
                  </h1>
                  <p className="text-gray-600">
                    Discover amazing properties in your preferred location
                  </p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    onClick={toggleFilters}
                    className="lg:hidden flex items-center space-x-2"
                  >
                    <ApperIcon name="SlidersHorizontal" className="w-4 h-4" />
                    <span>Filters</span>
                  </Button>
                </div>
              </div>

              {/* Active Filters Display */}
              {(filters.minPrice > 0 || filters.maxPrice > 0 || 
                filters.propertyTypes.length > 0 || filters.minBeds > 0 || 
                filters.minBaths > 0 || searchQuery) && (
                <div className="mb-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm text-gray-600 mr-2">Active filters:</span>
                    
                    {searchQuery && (
                      <div className="inline-flex items-center bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                        <ApperIcon name="Search" className="w-3 h-3 mr-1" />
                        {searchQuery}
                        <button
                          onClick={() => setSearchQuery("")}
                          className="ml-2 hover:bg-primary/20 rounded-full p-0.5"
                        >
                          <ApperIcon name="X" className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                    
                    {filters.minPrice > 0 && (
                      <div className="inline-flex items-center bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm">
                        Min: ${filters.minPrice.toLocaleString()}
                        <button
                          onClick={() => handleFiltersChange({...filters, minPrice: 0})}
                          className="ml-2 hover:bg-secondary/20 rounded-full p-0.5"
                        >
                          <ApperIcon name="X" className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                    
                    {filters.maxPrice > 0 && (
                      <div className="inline-flex items-center bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm">
                        Max: ${filters.maxPrice.toLocaleString()}
                        <button
                          onClick={() => handleFiltersChange({...filters, maxPrice: 0})}
                          className="ml-2 hover:bg-secondary/20 rounded-full p-0.5"
                        >
                          <ApperIcon name="X" className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                    
                    {filters.propertyTypes.map(type => (
                      <div
                        key={type}
                        className="inline-flex items-center bg-accent/10 text-accent px-3 py-1 rounded-full text-sm"
                      >
                        {type}
                        <button
                          onClick={() => handleFiltersChange({
                            ...filters,
                            propertyTypes: filters.propertyTypes.filter(t => t !== type)
                          })}
                          className="ml-2 hover:bg-accent/20 rounded-full p-0.5"
                        >
                          <ApperIcon name="X" className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                    
                    {filters.minBeds > 0 && (
                      <div className="inline-flex items-center bg-success/10 text-success px-3 py-1 rounded-full text-sm">
                        {filters.minBeds}+ beds
                        <button
                          onClick={() => handleFiltersChange({...filters, minBeds: 0})}
                          className="ml-2 hover:bg-success/20 rounded-full p-0.5"
                        >
                          <ApperIcon name="X" className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                    
                    {filters.minBaths > 0 && (
                      <div className="inline-flex items-center bg-info/10 text-info px-3 py-1 rounded-full text-sm">
                        {filters.minBaths}+ baths
                        <button
                          onClick={() => handleFiltersChange({...filters, minBaths: 0})}
                          className="ml-2 hover:bg-info/20 rounded-full p-0.5"
                        >
                          <ApperIcon name="X" className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Property Grid */}
              <PropertyGrid filters={filters} searchQuery={searchQuery} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default BrowseProperties