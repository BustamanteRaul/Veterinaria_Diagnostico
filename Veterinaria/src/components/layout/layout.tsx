import { Outlet } from "react-router-dom";
import Header from "../Header/header.tsx";
import Footer from "../Footer/footer.tsx";

import "./layout.css"

export default function Layout() {
  return (
    <>
      <div className="layout">
        <Header />
        <main className="main">
          <Outlet /> 
        </main>
        <Footer />
      </div>
    </>
  );
}
