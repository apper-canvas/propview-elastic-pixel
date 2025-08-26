import { cn } from "@/utils/cn"

const Loading = ({ className, type = "grid" }) => {
  if (type === "property") {
    return (
      <div className={cn("animate-pulse", className)}>
        <div className="aspect-property bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl mb-4"></div>
        <div className="space-y-3">
          <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-3/4"></div>
          <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-1/2"></div>
          <div className="flex space-x-4">
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16"></div>
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16"></div>
          </div>
        </div>
      </div>
    )
  }

  if (type === "details") {
    return (
      <div className={cn("animate-pulse space-y-6", className)}>
        <div className="aspect-property bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-2/3"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4"></div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-6 space-y-4">
              <div className="h-6 bg-gradient-to-r from-gray-300 to-gray-400 rounded w-1/2"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gradient-to-r from-gray-300 to-gray-400 rounded w-full"></div>
                <div className="h-4 bg-gradient-to-r from-gray-300 to-gray-400 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
      {[...Array(6)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-property bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl mb-4"></div>
          <div className="space-y-3">
            <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-3/4"></div>
            <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-1/2"></div>
            <div className="flex space-x-4">
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Loading