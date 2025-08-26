import { useState, useEffect } from "react"
import PropertyCard from "@/components/molecules/PropertyCard"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import propertyService from "@/services/api/propertyService"
import { toast } from "react-toastify"
import { motion } from "framer-motion"

const PropertyGrid = ({ filters, searchQuery }) => {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const loadProperties = async () => {
    try {
      setLoading(true)
      setError("")
      
      const searchFilters = { ...filters }
      if (searchQuery && searchQuery.trim()) {
        searchFilters.location = searchQuery.trim()
      }
      
      const data = await propertyService.getAll(searchFilters)
      setProperties(data)
    } catch (err) {
      setError(err.message || "Failed to load properties")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProperties()
  }, [filters, searchQuery])

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

  const clearFilters = () => {
    // This would be handled by parent component
    window.location.reload()
  }

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error message={error} onRetry={loadProperties} />
  }

  if (properties.length === 0) {
    return (
      <Empty
        title="No properties found"
        description="Try adjusting your search criteria or filters to find more properties."
        actionLabel="Clear Filters"
        onAction={clearFilters}
      />
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {properties.map((property, index) => (
        <motion.div
          key={property.Id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <PropertyCard
            property={property}
            isSaved={propertyService.isPropertySaved(property.Id)}
            onToggleSave={handleToggleSave}
          />
        </motion.div>
      ))}
    </div>
  )
}

export default PropertyGrid