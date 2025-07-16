import TopHeader from '@/components/common/TopHeader/TopHeader'
import React from 'react'

const MainLayout = ({children}:any) => {
  return (
    <div className="flex h-screen">
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <TopHeader/>

          {children}

        </main>
    </div>
  )
}

export default MainLayout