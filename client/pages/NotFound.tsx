import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy via-navy to-navy/95">
      <Header />
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-pink mb-4">404</h1>
          <p className="text-2xl text-white mb-4">بەت تېپىلمىدى!</p>
          <p className="text-gray-400 mb-8">
            سىز ئىزدىگىنىڭىز بەتى مەۋجۇد ئەمەس.
          </p>
          <Link
            to="/"
            className="inline-block bg-pink hover:opacity-90 text-white px-8 py-3 rounded-lg font-semibold transition-opacity"
          >
            باش بەتكە قايتىڭ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
