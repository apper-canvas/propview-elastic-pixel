import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Layout from "@/components/organisms/Layout"
import Button from "@/components/atoms/Button"
import ImageGallery from "@/components/molecules/ImageGallery"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import ApperIcon from "@/components/ApperIcon"
import propertyService from "@/services/api/propertyService"
import { formatPrice, formatAddress, formatSquareFeet, formatYearBuilt, formatListingDate, getStatusColor } from "@/utils/formatters"
import { toast } from "react-toastify"
import { motion } from "framer-motion"

const PropertyDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [isSaved, setIsSaved] = useState(false)

  const loadProperty = async () => {
    try {
      setLoading(true)
      setError("")
      const data = await propertyService.getById(id)
      setProperty(data)
      setIsSaved(propertyService.isPropertySaved(data.Id))
    } catch (err) {
      setError(err.message || "Property not found")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProperty()
  }, [id])

  const handleToggleSave = async () => {
    if (!property) return
    
    try {
      if (isSaved) {
        await propertyService.unsaveProperty(property.Id)
        setIsSaved(false)
        toast.success("Property removed from saved list")
      } else {
        await propertyService.saveProperty(property.Id)
        setIsSaved(true)
        toast.success("Property saved to your list")
      }
    } catch (err) {
      toast.error("Failed to update saved properties")
    }
  }

  const handleBack = () => {
    navigate(-1)
  }

  if (loading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto p-6">
          <Loading type="details" />
        </div>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto p-6">
          <Error message={error} onRetry={loadProperty} />
        </div>
      </Layout>
    )
  }

  if (!property) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto p-6">
          <Error message="Property not found" />
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-6">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Button
            variant="ghost"
            onClick={handleBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <ApperIcon name="ArrowLeft" className="w-4 h-4" />
            <span>Back to Properties</span>
          </Button>
        </motion.div>

        <div className="space-y-8">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <ImageGallery images={property.images} title={property.title} />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 space-y-8"
            >
              {/* Header */}
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
                      {property.title}
                    </h1>
                    <p className="text-lg text-gray-600">
                      {formatAddress(property.address, property.city, property.state)} {property.zipCode}
                    </p>
                  </div>
                  {property.status && (
                    <div className={`px-4 py-2 text-sm font-semibold rounded-full ${getStatusColor(property.status)}`}>
                      {property.status}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {formatPrice(property.price)}
                  </div>
                  <Button
                    onClick={handleToggleSave}
                    variant={isSaved ? "accent" : "outline"}
                    className="flex items-center space-x-2"
                  >
                    <ApperIcon
                      name="Heart"
                      className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`}
                    />
                    <span>{isSaved ? "Saved" : "Save Property"}</span>
                  </Button>
                </div>
              </div>

              {/* Key Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200">
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl mb-3 mx-auto">
                    <ApperIcon name="Bed" className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{property.bedrooms}</div>
                  <div className="text-sm text-gray-600">Bedroom{property.bedrooms !== 1 ? 's' : ''}</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-xl mb-3 mx-auto">
                    <ApperIcon name="Bath" className="w-6 h-6 text-secondary" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{property.bathrooms}</div>
                  <div className="text-sm text-gray-600">Bathroom{property.bathrooms !== 1 ? 's' : ''}</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-accent/20 to-success/20 rounded-xl mb-3 mx-auto">
                    <ApperIcon name="Square" className="w-6 h-6 text-accent" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{property.squareFeet?.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Sq Ft</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-success/20 to-info/20 rounded-xl mb-3 mx-auto">
                    <ApperIcon name="Calendar" className="w-6 h-6 text-success" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{property.yearBuilt}</div>
                  <div className="text-sm text-gray-600">Year Built</div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">About This Property</h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {property.description}
                </p>
              </div>

              {/* Amenities */}
              {property.amenities && property.amenities.length > 0 && (
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Amenities & Features</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {property.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-200">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                          <ApperIcon name="Check" className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-gray-900 font-medium">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Map Placeholder */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Location</h2>
                <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <ApperIcon name="MapPin" className="w-12 h-12 text-gray-500 mx-auto mb-2" />
                    <p className="text-gray-600">Map view would be displayed here</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {formatAddress(property.address, property.city, property.state)}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              {/* Contact Card */}
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border border-gray-200 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Interested in this property?</h3>
                <div className="space-y-3">
                  <Button variant="primary" className="w-full justify-center">
                    <ApperIcon name="Phone" className="w-4 h-4 mr-2" />
                    Call Agent
                  </Button>
                  <Button variant="secondary" className="w-full justify-center">
                    <ApperIcon name="Mail" className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                  <Button variant="ghost" className="w-full justify-center">
                    <ApperIcon name="Calendar" className="w-4 h-4 mr-2" />
                    Schedule Tour
                  </Button>
                </div>
              </div>

              {/* Property Details */}
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border border-gray-200 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Details</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Property Type</span>
                    <span className="font-medium text-gray-900">{property.propertyType}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Square Feet</span>
                    <span className="font-medium text-gray-900">{formatSquareFeet(property.squareFeet)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Year Built</span>
                    <span className="font-medium text-gray-900">{property.yearBuilt}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Listed Date</span>
                    <span className="font-medium text-gray-900">{formatListingDate(property.listingDate)}</span>
                  </div>
                </div>
              </div>

              {/* Share */}
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border border-gray-200 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Share This Property</h3>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" className="flex-1">
                    <ApperIcon name="Share2" className="w-4 h-4 mr-1" />
                    Share
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1">
                    <ApperIcon name="Copy" className="w-4 h-4 mr-1" />
                    Copy Link
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default PropertyDetails