import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PublicLayout({ children }) {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
  

      <main className="flex-1">{children}</main>

      
    </div>
  );
}
