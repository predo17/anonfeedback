import { createBrowserRouter, RouterProvider } from "react-router-dom"

import { PublicLayout } from "./layouts/PublicLayout"
import { AdminLayout } from "./layouts/AdminLayout"

import { HomePage } from "./pages/home/HomePage"
import { FeedbackPage } from "./pages/feedback/FeedbackPage"
import { AdminDashboard } from "./pages/admin/AdminDashboard"

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/feedback", element: <FeedbackPage /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
    ],
  },
])

export function AppRoutes() {
  return <RouterProvider router={router} />
}
