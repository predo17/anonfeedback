import { Outlet } from "react-router-dom"

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto py-8">
        <Outlet />
      </main>
    </div>
  )
}
