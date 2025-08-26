export const formatPrice = (price) => {
  if (!price) return "$0"
  
  if (price >= 1000000) {
    return `$${(price / 1000000).toFixed(1)}M`
  } else if (price >= 1000) {
    return `$${(price / 1000).toFixed(0)}K`
  }
  
  return `$${price.toLocaleString()}`
}

export const formatAddress = (address, city, state) => {
  return `${address}, ${city}, ${state}`
}

export const formatSquareFeet = (sqft) => {
  if (!sqft) return "N/A"
  return `${sqft.toLocaleString()} sq ft`
}

export const formatYearBuilt = (year) => {
  if (!year) return "N/A"
  return `Built ${year}`
}

export const formatListingDate = (dateString) => {
  if (!dateString) return "N/A"
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", { 
    year: "numeric", 
    month: "short", 
    day: "numeric" 
  })
}

export const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "new":
      return "bg-success text-white"
    case "price reduced":
      return "bg-accent text-white"
    case "open house":
      return "bg-info text-white"
    case "pending":
      return "bg-warning text-white"
    default:
      return "bg-gray-500 text-white"
  }
}

export const pluralize = (count, singular, plural) => {
  return count === 1 ? singular : plural || `${singular}s`
}