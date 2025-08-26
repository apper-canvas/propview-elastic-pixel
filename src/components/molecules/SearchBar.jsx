import { useState } from "react"
import Input from "@/components/atoms/Input"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const SearchBar = ({ onSearch, placeholder = "Search by city, state, or address...", className = "" }) => {
  const [query, setQuery] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(query.trim())
  }

  return (
    <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
      <div className="flex-1 relative">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="pl-10"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <ApperIcon name="Search" className="w-4 h-4 text-gray-500" />
        </div>
      </div>
      <Button type="submit" variant="primary" className="flex-shrink-0">
        <ApperIcon name="Search" className="w-4 h-4" />
        <span className="sr-only">Search</span>
      </Button>
    </form>
  )
}

export default SearchBar