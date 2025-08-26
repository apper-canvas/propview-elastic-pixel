import { useState, useEffect } from "react"
import Layout from "@/components/organisms/Layout"
import PropertyCard from "@/components/molecules/PropertyCard"
import FilterSidebar from "@/components/molecules/FilterSidebar"
import Button from "@/components/atoms/Button"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import ApperIcon from "@/components/ApperIcon"
import propertyService from "@/services/api/propertyService"
import { formatPrice } from "@/utils/formatters"
import { toast } from "react-toastify"
import { motion } from "framer-motion"

const MapView = () => {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false)
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 0,
    propertyTypes: [],
    minBeds: 0,
    minBaths: 0,
    location: ""
  })

  const loadProperties = async () => {
    try {
      setLoading(true)
      setError("")
      const data = await propertyService.getAll(filters)
      setProperties(data)
    } catch (err) {
      setError(err.message || "Failed to load properties")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProperties()
  }, [filters])

  const handleToggleSave = async (propertyId) => {
    try {
      const isSaved = propertyService.isPropertySaved(propertyId)
      
      if (isSaved) {
        await propertyService.unsaveProperty(propertyId)
        toast.success("Property removed from saved list")
      } else {
        await propertyService.saveProperty(propertyId)
        toast.success("Property saved to your list")
      }
    } catch (err) {
      toast.error("Failed to update saved properties")
    }
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
    <Layout onToggleFilters={toggleFilters}>
      <div className="flex h-[calc(100vh-64px)]">
        <FilterSidebar
          filters={filters}
          onFiltersChange={handleFiltersChange}
          isOpen={isFilterSidebarOpen}
          onClose={closeFilters}
        />

        <div className="flex-1 flex">
          {/* Map Area */}
          <div className="flex-1 relative">
            {/* Mock Map */}
            <div className="h-full bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 relative">
              {/* Map UI Controls */}
              <div className="absolute top-6 left-6 z-10">
                <Button
                  variant="ghost"
                  onClick={toggleFilters}
                  className="lg:hidden bg-white shadow-lg hover:shadow-xl"
                >
                  <ApperIcon name="SlidersHorizontal" className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>

              <div className="absolute top-6 right-6 z-10 space-y-2">
                <Button variant="secondary" size="sm" className="bg-white shadow-lg">
                  <ApperIcon name="Plus" className="w-4 h-4" />
                </Button>
                <Button variant="secondary" size="sm" className="bg-white shadow-lg">
                  <ApperIcon name="Minus" className="w-4 h-4" />
                </Button>
              </div>

              {/* Loading State */}
              {loading && (
                <div className="absolute inset-0 bg-white/90 flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading map...</p>
                  </div>
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="absolute inset-0 bg-white/90 flex items-center justify-center">
                  <Error message={error} onRetry={loadProperties} />
                </div>
              )}

              {/* Empty State */}
              {!loading && !error && properties.length === 0 && (
                <div className="absolute inset-0 bg-white/90 flex items-center justify-center">
                  <Empty
                    title="No properties to display"
                    description="Adjust your filters to see more properties on the map."
                  />
                </div>
              )}

              {/* Map Markers */}
              {!loading && !error && properties.length > 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <ApperIcon name="Map" className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Interactive Map View</h3>
                    <p className="text-gray-600 mb-4">
                      Showing {properties.length} properties
                    </p>
                    
                    {/* Mock Property Markers */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-md">
                      {properties.slice(0, 6).map((property, index) => (
                        <motion.button
                          key={property.Id}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          onClick={() => setSelectedProperty(property)}
                          className="bg-white rounded-lg shadow-lg p-3 hover:shadow-xl transition-all duration-200 hover:scale-105 border-2 border-transparent hover:border-primary"
                        >
                          <div className="text-sm font-semibold text-primary">
                            {formatPrice(property.price)}
                          </div>
                          <div className="text-xs text-gray-600 truncate">
                            {property.city}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Property Details Sidebar */}
          {selectedProperty && (
            <motion.div
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              className="w-80 bg-white border-l border-gray-200 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Property Details</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedProperty(null)}
                  >
                    <ApperIcon name="X" className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="transform scale-90 origin-top">
                  <PropertyCard
                    property={selectedProperty}
                    isSaved={propertyService.isPropertySaved(selectedProperty.Id)}
                    onToggleSave={handleToggleSave}
                  />
                </div>

                <div className="mt-6 space-y-4">
                  <Button variant="primary" className="w-full">
                    <ApperIcon name="Eye" className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  <Button variant="secondary" className="w-full">
                    <ApperIcon name="Navigation" className="w-4 h-4 mr-2" />
                    Get Directions
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default MapView