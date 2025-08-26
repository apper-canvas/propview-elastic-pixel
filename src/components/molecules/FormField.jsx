import Label from "@/components/atoms/Label"
import Input from "@/components/atoms/Input"
import Select from "@/components/atoms/Select"
import { cn } from "@/utils/cn"

const FormField = ({ 
  label, 
  type = "text", 
  error, 
  className, 
  children,
  required = false,
  ...props 
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label className={cn(required && "after:content-['*'] after:ml-0.5 after:text-error")}>
          {label}
        </Label>
      )}
      {children || (
        type === "select" ? (
          <Select error={!!error} {...props}>
            {props.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        ) : (
          <Input type={type} error={!!error} {...props} />
        )
      )}
      {error && (
        <p className="text-sm text-error">{error}</p>
      )}
    </div>
  )
}

export default FormField