
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar"
import { AppSidebar } from "./AppSidebar"
import UsernameEmail from "./UsernameEmail"

export function SidebarTab() {
  return (
    <div className="flex h-full w-[80%] ml-40 border-red-500 border-2">
      <SidebarProvider>
        <div className="flex h-full w-full">
          <div className="h-full border-r">
            <AppSidebar />
          </div>
          <div className="flex-1  overflow-y-visible scroll-auto h-[40%] p-6">
            <SidebarTrigger className="p-2" />
            <UsernameEmail />
          </div>
        </div>
      </SidebarProvider>
    </div>
  )
}
