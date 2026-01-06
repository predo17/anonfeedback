import  { BrowserRouter, Routes, Route } from "react-router-dom"

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/admin" element={<div>Admin</div>} />
      </Routes>
    </BrowserRouter>
  )
}
