import { useState, useEffect } from "react"
import Layout from "@/components/organisms/Layout"
import PropertyCard from "@/components/molecules/PropertyCard"
import Button from "@/components/atoms/Button"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import ApperIcon from "@/components/ApperIcon"
import propertyService from "@/services/api/propertyService"
import { toast } from "react-toastify"
import { motion } from "framer-motion"

const SavedProperties = () => {
  const [savedProperties, setSavedProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const loadSavedProperties = async () => {
    try {
      setLoading(true)
      setError("")
      const data = await propertyService.getSavedProperties()
      setSavedProperties(data)
    } catch (err) {
      setError(err.message || "Failed to load saved properties")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSavedProperties()
  }, [])

  const handleToggleSave = async (propertyId) => {
    try {
      await propertyService.unsaveProperty(propertyId)
      setSavedProperties(prev => prev.filter(p => p.Id !== propertyId))
      toast.success("Property removed from saved list")
    } catch (err) {
      toast.error("Failed to remove property")
    }
  }

  const clearAllSaved = async () => {
    try {
      for (const property of savedProperties) {
        await propertyService.unsaveProperty(property.Id)
      }
      setSavedProperties([])
      toast.success("All saved properties cleared")
    } catch (err) {
      toast.error("Failed to clear saved properties")
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
              Saved Properties
            </h1>
            <p className="text-gray-600">
              Your collection of favorite properties
            </p>
          </div>
          <Loading />
        </div>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
              Saved Properties
            </h1>
            <p className="text-gray-600">
              Your collection of favorite properties
            </p>
          </div>
          <Error message={error} onRetry={loadSavedProperties} />
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
              Saved Properties
            </h1>
            <p className="text-gray-600">
              {savedProperties.length === 0 
                ? "Your collection of favorite properties" 
                : `You have ${savedProperties.length} saved propert${savedProperties.length === 1 ? 'y' : 'ies'}`
              }
            </p>
          </div>
          
          {savedProperties.length > 0 && (
            <Button
              variant="ghost"
              onClick={clearAllSaved}
              className="text-error hover:text-error/80 hover:bg-error/10"
            >
              <ApperIcon name="Trash2" className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          )}
        </motion.div>

        {/* Content */}
        {savedProperties.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Empty
              title="No saved properties yet"
              description="Start browsing properties and save your favorites to see them here. Click the heart icon on any property to add it to your saved list."
              actionLabel="Browse Properties"
              onAction={() => window.location.href = "/"}
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {savedProperties.map((property, index) => (
              <motion.div
                key={property.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <PropertyCard
                  property={property}
                  isSaved={true}
                  onToggleSave={handleToggleSave}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Additional Actions */}
        {savedProperties.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-12 text-center"
          >
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Ready to Take the Next Step?
              </h3>
              <p className="text-gray-600 mb-6">
                Contact agents, schedule tours, or get more information about your saved properties.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="primary" className="flex items-center space-x-2">
                  <ApperIcon name="Phone" className="w-4 h-4" />
                  <span>Contact Agents</span>
                </Button>
                <Button variant="secondary" className="flex items-center space-x-2">
                  <ApperIcon name="Calendar" className="w-4 h-4" />
                  <span>Schedule Tours</span>
                </Button>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <ApperIcon name="Share2" className="w-4 h-4" />
                  <span>Share List</span>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  )
}

export default SavedProperties