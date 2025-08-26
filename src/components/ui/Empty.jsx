import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const Empty = ({ 
  title = "No properties found", 
  description = "Try adjusting your search criteria or browse all properties.",
  actionLabel = "Clear Filters",
  onAction,
  className = ""
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-6 text-center ${className}`}>
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6">
        <ApperIcon name="Home" className="w-12 h-12 text-primary" />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-6 max-w-md">
        {description}
      </p>
      
      {onAction && (
        <Button
          onClick={onAction}
          variant="primary"
          className="inline-flex items-center space-x-2"
        >
          <ApperIcon name="Search" className="w-4 h-4" />
          <span>{actionLabel}</span>
        </Button>
      )}
    </div>
  )
}

export default Empty