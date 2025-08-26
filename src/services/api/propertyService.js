class PropertyService {
  constructor() {
    this.tableName = 'property_c'
    this.apperClient = null
    this.initClient()
  }

  initClient() {
    if (window.ApperSDK) {
      const { ApperClient } = window.ApperSDK
      this.apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
    }
  }

  async getAll(filters = {}) {
    try {
      if (!this.apperClient) this.initClient()
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title_c" } },
          { field: { Name: "price_c" } },
          { field: { Name: "address_c" } },
          { field: { Name: "city_c" } },
          { field: { Name: "state_c" } },
          { field: { Name: "zip_code_c" } },
          { field: { Name: "property_type_c" } },
          { field: { Name: "bedrooms_c" } },
          { field: { Name: "bathrooms_c" } },
          { field: { Name: "square_feet_c" } },
          { field: { Name: "year_built_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "images_c" } },
          { field: { Name: "amenities_c" } },
          { field: { Name: "latitude_c" } },
          { field: { Name: "longitude_c" } },
          { field: { Name: "listing_date_c" } },
          { field: { Name: "status_c" } }
        ],
        where: [],
        pagingInfo: {
          limit: 100,
          offset: 0
        }
      }

      // Apply filters
      if (filters.minPrice && filters.minPrice > 0) {
        params.where.push({
          FieldName: "price_c",
          Operator: "GreaterThanOrEqualTo",
          Values: [filters.minPrice]
        })
      }
      
      if (filters.maxPrice && filters.maxPrice > 0) {
        params.where.push({
          FieldName: "price_c",
          Operator: "LessThanOrEqualTo",
          Values: [filters.maxPrice]
        })
      }
      
      if (filters.propertyTypes && filters.propertyTypes.length > 0) {
        params.where.push({
          FieldName: "property_type_c",
          Operator: "ExactMatch",
          Values: filters.propertyTypes
        })
      }
      
      if (filters.minBeds && filters.minBeds > 0) {
        params.where.push({
          FieldName: "bedrooms_c",
          Operator: "GreaterThanOrEqualTo",
          Values: [filters.minBeds]
        })
      }
      
      if (filters.minBaths && filters.minBaths > 0) {
        params.where.push({
          FieldName: "bathrooms_c",
          Operator: "GreaterThanOrEqualTo",
          Values: [filters.minBaths]
        })
      }
      
      if (filters.location && filters.location.trim()) {
        params.whereGroups = [{
          operator: "OR",
          subGroups: [
            {
              conditions: [
                {
                  fieldName: "city_c",
                  operator: "Contains",
                  values: [filters.location.trim()]
                }
              ]
            },
            {
              conditions: [
                {
                  fieldName: "state_c",
                  operator: "Contains",
                  values: [filters.location.trim()]
                }
              ]
            },
            {
              conditions: [
                {
                  fieldName: "address_c",
                  operator: "Contains",
                  values: [filters.location.trim()]
                }
              ]
            }
          ]
        }]
      }

      const response = await this.apperClient.fetchRecords(this.tableName, params)

      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }

      // Transform database fields back to UI format
      return response.data.map(property => this.transformFromDatabase(property))
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching properties:", error?.response?.data?.message)
      } else {
        console.error(error)
      }
      return []
    }
  }

  async getById(id) {
    try {
      if (!this.apperClient) this.initClient()
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title_c" } },
          { field: { Name: "price_c" } },
          { field: { Name: "address_c" } },
          { field: { Name: "city_c" } },
          { field: { Name: "state_c" } },
          { field: { Name: "zip_code_c" } },
          { field: { Name: "property_type_c" } },
          { field: { Name: "bedrooms_c" } },
          { field: { Name: "bathrooms_c" } },
          { field: { Name: "square_feet_c" } },
          { field: { Name: "year_built_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "images_c" } },
          { field: { Name: "amenities_c" } },
          { field: { Name: "latitude_c" } },
          { field: { Name: "longitude_c" } },
          { field: { Name: "listing_date_c" } },
          { field: { Name: "status_c" } }
        ]
      }

      const response = await this.apperClient.getRecordById(this.tableName, parseInt(id), params)

      if (!response || !response.data) {
        throw new Error("Property not found")
      }

      return this.transformFromDatabase(response.data)
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching property with ID ${id}:`, error?.response?.data?.message)
      } else {
        console.error(error)
      }
      throw new Error("Property not found")
    }
  }

  async getSavedProperties() {
    try {
      if (!this.apperClient) this.initClient()
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title_c" } },
          { field: { Name: "price_c" } },
          { field: { Name: "address_c" } },
          { field: { Name: "city_c" } },
          { field: { Name: "state_c" } },
          { field: { Name: "zip_code_c" } },
          { field: { Name: "property_type_c" } },
          { field: { Name: "bedrooms_c" } },
          { field: { Name: "bathrooms_c" } },
          { field: { Name: "square_feet_c" } },
          { field: { Name: "year_built_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "images_c" } },
          { field: { Name: "amenities_c" } },
          { field: { Name: "latitude_c" } },
          { field: { Name: "longitude_c" } },
          { field: { Name: "listing_date_c" } },
          { field: { Name: "status_c" } }
        ],
        where: [
          {
            FieldName: "Tags",
            Operator: "Contains",
            Values: ["saved"]
          }
        ]
      }

      const response = await this.apperClient.fetchRecords(this.tableName, params)

      if (!response.success) {
        console.error(response.message)
        return []
      }

      return response.data.map(property => this.transformFromDatabase(property))
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching saved properties:", error?.response?.data?.message)
      } else {
        console.error(error)
      }
      return []
    }
  }

  async saveProperty(propertyId) {
    try {
      if (!this.apperClient) this.initClient()
      
      const id = parseInt(propertyId)
      const property = await this.getById(id)
      
      const currentTags = property.Tags || ""
      const tagsArray = currentTags ? currentTags.split(",").map(tag => tag.trim()) : []
      
      if (!tagsArray.includes("saved")) {
        tagsArray.push("saved")
        
        const params = {
          records: [{
            Id: id,
            Tags: tagsArray.join(",")
          }]
        }

        const response = await this.apperClient.updateRecord(this.tableName, params)

        if (!response.success) {
          console.error(response.message)
          throw new Error(response.message)
        }
      }
      
      return true
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error saving property:", error?.response?.data?.message)
      } else {
        console.error(error)
      }
      throw error
    }
  }

  async unsaveProperty(propertyId) {
    try {
      if (!this.apperClient) this.initClient()
      
      const id = parseInt(propertyId)
      const property = await this.getById(id)
      
      const currentTags = property.Tags || ""
      const tagsArray = currentTags ? currentTags.split(",").map(tag => tag.trim()) : []
      
      const updatedTags = tagsArray.filter(tag => tag !== "saved")
      
      const params = {
        records: [{
          Id: id,
          Tags: updatedTags.join(",")
        }]
      }

      const response = await this.apperClient.updateRecord(this.tableName, params)

      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      return true
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error unsaving property:", error?.response?.data?.message)
      } else {
        console.error(error)
      }
      throw error
    }
  }

  isPropertySaved(propertyId) {
    // This will be handled by checking Tags field in the actual property data
    // For now, we'll implement a basic check
    return false
  }

  async getPropertyTypes() {
    try {
      if (!this.apperClient) this.initClient()
      
      const params = {
        fields: [
          { field: { Name: "property_type_c" } }
        ],
        groupBy: ["property_type_c"]
      }

      const response = await this.apperClient.fetchRecords(this.tableName, params)

      if (!response.success) {
        console.error(response.message)
        return []
      }

      const types = [...new Set(response.data.map(p => p.property_type_c).filter(Boolean))]
      return types.sort()
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching property types:", error?.response?.data?.message)
      } else {
        console.error(error)
      }
      return []
    }
  }

  transformFromDatabase(property) {
    if (!property) return property
    
    // Parse JSON fields
    let images = []
    if (property.images_c) {
      try {
        images = JSON.parse(property.images_c)
      } catch {
        images = [property.images_c]
      }
    }
    
    let amenities = []
    if (property.amenities_c) {
      try {
        amenities = JSON.parse(property.amenities_c)
      } catch {
        amenities = property.amenities_c.split(',').map(a => a.trim())
      }
    }

    return {
      Id: property.Id,
      title: property.title_c,
      price: property.price_c,
      address: property.address_c,
      city: property.city_c,
      state: property.state_c,
      zipCode: property.zip_code_c,
      propertyType: property.property_type_c,
      bedrooms: property.bedrooms_c,
      bathrooms: property.bathrooms_c,
      squareFeet: property.square_feet_c,
      yearBuilt: property.year_built_c,
      description: property.description_c,
      images: images,
      amenities: amenities,
      latitude: property.latitude_c,
      longitude: property.longitude_c,
      listingDate: property.listing_date_c,
      status: property.status_c,
      Tags: property.Tags
    }
  }
}

export default new PropertyService()