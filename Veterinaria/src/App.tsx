import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/layout.tsx"
import Home from "./pages/Home/home.tsx"
import Owner from "./pages/Owner/owner.tsx"
import Pet from "./pages/Pet/pet.tsx"
import Visit from "./pages/Visit/visit.tsx"
import Bill from "./pages/Bill/bill.tsx"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="owners" element={<Owner />} />
            <Route path="pets" element={<Pet />} />
            <Route path="visits" element={<Visit />} />
            <Route path="bills" element={<Bill />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
