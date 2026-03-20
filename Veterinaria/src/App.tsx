import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/layout.tsx"
import Home from "./pages/Home/home.tsx"
import Owner from "./pages/Owner/owner.tsx"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="owners" element={<Owner />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
