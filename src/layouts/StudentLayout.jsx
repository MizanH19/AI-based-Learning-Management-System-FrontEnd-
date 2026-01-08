import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

function StudentLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow bg-gray-50">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default StudentLayout;
