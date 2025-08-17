import * as React from "react"
import { cn } from "@/lib/utils"

type TabItem = {
  id: string
  label: React.ReactNode
  content: React.ReactNode
  disabled?: boolean
}

type TabLayout = "single-line" | "two-line" | "three-line" | "auto"

interface BoxTabProps {
  items: TabItem[]
  defaultValue?: string
  layout?: TabLayout
  boxClassName?: string
  activeBoxClassName?: string
  containerClassName?: string
  contentClassName?: string
  onValueChange?: (value: string) => void
}

const BoxTab = React.forwardRef<HTMLDivElement, BoxTabProps>(
  (
    {
      items,
      defaultValue,
      layout = "auto",
      boxClassName,
      activeBoxClassName,
      containerClassName,
      contentClassName,
      onValueChange,
      ...props
    },
    ref
  ) => {
    const [activeTab, setActiveTab] = React.useState(
      defaultValue || items[0]?.id || ""
    )

    const handleTabChange = (tabId: string) => {
      if (items.find((item) => item.id === tabId)?.disabled) return
      setActiveTab(tabId)
      onValueChange?.(tabId)
    }

    // Determine line layout
    const getLayoutClass = () => {
      switch (layout) {
        case "single-line":
          return "flex-nowrap overflow-x-auto"
        case "two-line":
          return "flex-wrap max-h-[calc(2*var(--tab-height))]"
        case "three-line":
          return "flex-wrap max-h-[calc(3*var(--tab-height))]"
        case "auto":
        default:
          return "flex-wrap"
      }
    }

    return (
      <div
        ref={ref}
        className={cn("flex flex-col w-full", containerClassName)}
        {...props}
      >
        {/* Tab Boxes Container */}
        <div
          className={cn(
            "flex gap-2 pb-2 overflow-hidden",
            getLayoutClass(),
            layout !== "single-line" && "overflow-y-auto"
          )}
          style={{ "--tab-height": "3rem" } as React.CSSProperties}
        >
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              disabled={item.disabled}
              className={cn(
                "min-h-[var(--tab-height)] px-4 py-2 border rounded-md flex items-center justify-center",
                "transition-colors duration-200",
                "hover:bg-gray-100 hover:text-cgray-dtext hover:border-gray-300",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                activeTab === item.id
                  ? cn(
                      "bg-primary text-primary-foreground border-primary",
                      activeBoxClassName
                    )
                  : cn("bg-background text-foreground border-input", boxClassName),
                item.disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div
          className={cn(
            "flex-1 p-4 border rounded-lg max-h-[600px] overflow-y-auto custom-scrollbar2",
            contentClassName
          )}
        >
          {items.find((item) => item.id === activeTab)?.content || (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Select a tab
            </div>
          )}
        </div>
      </div>
    )
  }
)

BoxTab.displayName = "BoxTab"

export { BoxTab }
export type { BoxTabProps, TabItem, TabLayout }