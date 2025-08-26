import { useState } from "react"
import { Link } from "react-router-dom"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import { formatPrice, formatAddress, getStatusColor } from "@/utils/formatters"
import { motion } from "framer-motion"

const PropertyCard = ({ property, isSaved = false, onToggleSave }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [imageLoaded, setImageLoaded] = useState(false)

  const nextImage = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    )
  }

  const handleSave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    onToggleSave(property.Id)
  }

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
    >
      <Link to={`/property/${property.Id}`} className="block">
        <div className="relative aspect-property overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 image-placeholder"></div>
          )}
          <img
            src={property.images[currentImageIndex]}
            alt={property.title}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Image Navigation */}
          {property.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white hover:scale-110"
              >
                <ApperIcon name="ChevronLeft" className="w-4 h-4 text-gray-800" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white hover:scale-110"
              >
                <ApperIcon name="ChevronRight" className="w-4 h-4 text-gray-800" />
              </button>
              
              {/* Image Dots */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
                {property.images.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentImageIndex 
                        ? 'bg-white' 
                        : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Status Badge */}
          {property.status && (
            <div className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(property.status)}`}>
              {property.status}
            </div>
          )}

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200 hover:bg-white hover:scale-110 group/save"
          >
            <ApperIcon
              name={isSaved ? "Heart" : "Heart"}
              className={`w-5 h-5 transition-colors duration-200 ${
                isSaved 
                  ? 'text-accent fill-accent' 
                  : 'text-gray-600 group-hover/save:text-accent'
              }`}
            />
          </button>

          {/* Gradient Overlay for Text */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-display font-semibold text-gray-900 group-hover:text-primary transition-colors duration-200">
              {property.title}
            </h3>
            <div className="text-xl font-bold text-primary bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {formatPrice(property.price)}
            </div>
          </div>

          <p className="text-sm text-gray-600 mb-4">
            {formatAddress(property.address, property.city, property.state)}
          </p>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <ApperIcon name="Bed" className="w-4 h-4" />
                <span>{property.bedrooms} bed{property.bedrooms !== 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center space-x-1">
                <ApperIcon name="Bath" className="w-4 h-4" />
                <span>{property.bathrooms} bath{property.bathrooms !== 1 ? 's' : ''}</span>
              </div>
            </div>
            <div className="text-primary font-medium">
              {property.propertyType}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default PropertyCard