import mockProperties from "@/services/mockData/properties.json"

class PropertyService {
  constructor() {
    this.properties = [...mockProperties]
    this.savedProperties = JSON.parse(localStorage.getItem("savedProperties") || "[]")
  }

  async getAll(filters = {}) {
    await this.delay()
    
    let filteredProperties = [...this.properties]
    
    // Apply filters
    if (filters.minPrice && filters.minPrice > 0) {
      filteredProperties = filteredProperties.filter(p => p.price >= filters.minPrice)
    }
    
    if (filters.maxPrice && filters.maxPrice > 0) {
      filteredProperties = filteredProperties.filter(p => p.price <= filters.maxPrice)
    }
    
    if (filters.propertyTypes && filters.propertyTypes.length > 0) {
      filteredProperties = filteredProperties.filter(p => 
        filters.propertyTypes.includes(p.propertyType)
      )
    }
    
    if (filters.minBeds && filters.minBeds > 0) {
      filteredProperties = filteredProperties.filter(p => p.bedrooms >= filters.minBeds)
    }
    
    if (filters.minBaths && filters.minBaths > 0) {
      filteredProperties = filteredProperties.filter(p => p.bathrooms >= filters.minBaths)
    }
    
    if (filters.location && filters.location.trim()) {
      const location = filters.location.toLowerCase().trim()
      filteredProperties = filteredProperties.filter(p => 
        p.city.toLowerCase().includes(location) ||
        p.state.toLowerCase().includes(location) ||
        p.address.toLowerCase().includes(location)
      )
    }
    
    return filteredProperties
  }

  async getById(id) {
    await this.delay()
    const property = this.properties.find(p => p.Id === parseInt(id))
    if (!property) {
      throw new Error("Property not found")
    }
    return { ...property }
  }

  async getSavedProperties() {
    await this.delay()
    const savedIds = this.savedProperties
    return this.properties.filter(p => savedIds.includes(p.Id))
  }

  async saveProperty(propertyId) {
    await this.delay()
    const id = parseInt(propertyId)
    if (!this.savedProperties.includes(id)) {
      this.savedProperties.push(id)
      localStorage.setItem("savedProperties", JSON.stringify(this.savedProperties))
    }
    return true
  }

  async unsaveProperty(propertyId) {
    await this.delay()
    const id = parseInt(propertyId)
    this.savedProperties = this.savedProperties.filter(savedId => savedId !== id)
    localStorage.setItem("savedProperties", JSON.stringify(this.savedProperties))
    return true
  }

  isPropertySaved(propertyId) {
    return this.savedProperties.includes(parseInt(propertyId))
  }

  async getPropertyTypes() {
    await this.delay()
    const types = [...new Set(this.properties.map(p => p.propertyType))]
    return types.sort()
  }

  async delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

export default new PropertyService()