import { Outlet } from "react-router-dom"

export function AdminLayout() {
  return (
    <div className="min-h-screen bg-muted">
      <header className="border-b p-4 font-semibold">
        Painel Administrativo
      </header>

      <main className="container mx-auto py-6">
        <Outlet />
      </main>
    </div>
  )
}
