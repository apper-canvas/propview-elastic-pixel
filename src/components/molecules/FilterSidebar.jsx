import { useState, useEffect } from "react"
import Button from "@/components/atoms/Button"
import FormField from "@/components/molecules/FormField"
import ApperIcon from "@/components/ApperIcon"
import propertyService from "@/services/api/propertyService"
import { motion, AnimatePresence } from "framer-motion"

const FilterSidebar = ({ filters, onFiltersChange, isOpen, onClose }) => {
  const [propertyTypes, setPropertyTypes] = useState([])
  const [localFilters, setLocalFilters] = useState(filters)

  useEffect(() => {
    const loadPropertyTypes = async () => {
      try {
        const types = await propertyService.getPropertyTypes()
        setPropertyTypes(types)
      } catch (error) {
        console.error("Failed to load property types:", error)
      }
    }
    loadPropertyTypes()
  }, [])

  useEffect(() => {
    setLocalFilters(filters)
  }, [filters])

  const handleFilterChange = (field, value) => {
    const updatedFilters = { ...localFilters, [field]: value }
    setLocalFilters(updatedFilters)
    onFiltersChange(updatedFilters)
  }

  const handlePropertyTypeToggle = (type) => {
    const currentTypes = localFilters.propertyTypes || []
    const updatedTypes = currentTypes.includes(type)
      ? currentTypes.filter(t => t !== type)
      : [...currentTypes, type]
    handleFilterChange("propertyTypes", updatedTypes)
  }

  const clearFilters = () => {
    const clearedFilters = {
      minPrice: 0,
      maxPrice: 0,
      propertyTypes: [],
      minBeds: 0,
      minBaths: 0,
      location: ""
    }
    setLocalFilters(clearedFilters)
    onFiltersChange(clearedFilters)
  }

  const hasActiveFilters = Object.values(localFilters).some(value => 
    Array.isArray(value) ? value.length > 0 : value && value !== 0
  )

  const sidebarContent = (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-accent hover:text-accent/80"
            >
              Clear All
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="lg:hidden"
          >
            <ApperIcon name="X" className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* Price Range */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Price Range</h3>
          <div className="grid grid-cols-1 gap-4">
            <FormField
              label="Min Price"
              type="number"
              placeholder="Any"
              value={localFilters.minPrice || ""}
              onChange={(e) => handleFilterChange("minPrice", parseInt(e.target.value) || 0)}
            />
            <FormField
              label="Max Price"
              type="number"
              placeholder="Any"
              value={localFilters.maxPrice || ""}
              onChange={(e) => handleFilterChange("maxPrice", parseInt(e.target.value) || 0)}
            />
          </div>
        </div>

        {/* Property Types */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Property Type</h3>
          <div className="space-y-3">
            {propertyTypes.map(type => (
              <label
                key={type}
                className="flex items-center space-x-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={(localFilters.propertyTypes || []).includes(type)}
                  onChange={() => handlePropertyTypeToggle(type)}
                  className="rounded border-gray-300 text-primary focus:ring-primary/20 focus:ring-offset-0"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Bedrooms */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Minimum Bedrooms</h3>
          <div className="grid grid-cols-4 gap-2">
            {[0, 1, 2, 3, 4, 5].map(beds => (
              <Button
                key={beds}
                variant={localFilters.minBeds === beds ? "primary" : "secondary"}
                size="sm"
                onClick={() => handleFilterChange("minBeds", beds)}
                className="text-center"
              >
                {beds === 0 ? "Any" : beds === 5 ? "5+" : beds}
              </Button>
            ))}
          </div>
        </div>

        {/* Bathrooms */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Minimum Bathrooms</h3>
          <div className="grid grid-cols-4 gap-2">
            {[0, 1, 2, 3, 4].map(baths => (
              <Button
                key={baths}
                variant={localFilters.minBaths === baths ? "primary" : "secondary"}
                size="sm"
                onClick={() => handleFilterChange("minBaths", baths)}
                className="text-center"
              >
                {baths === 0 ? "Any" : baths === 4 ? "4+" : baths}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-80 bg-white border-r border-gray-200 h-full">
        {sidebarContent}
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={onClose}
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-80 bg-white z-50 shadow-2xl"
            >
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default FilterSidebar