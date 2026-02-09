import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useAuth();

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const navigationItems = [
    { label: "باش بەت", path: "/", uyghur: true },
    { label: "كىنو فىلىم", path: "/movies", uyghur: true },
    { label: "كۆپ قىسىملىق", path: "/series", uyghur: true },
    { label: "كارتون فىلىم", path: "/cartoons", uyghur: true },
    { label: "پروگىرامما", path: "/programs", uyghur: true },
  ];

  return (
    <header className="bg-gradient-to-b from-navy via-navy to-navy/95 sticky top-0 z-50 border-b border-pink/20">
      {/* Main header container */}
      <div className="container mx-auto px-4">
        {/* Top row with logo and search */}
        <div className="flex items-center justify-between py-3 gap-4">
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-pink hover:text-pink/80 transition-colors"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Search bar - desktop */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center bg-navy/50 border border-pink/30 rounded px-3 py-2 flex-1 max-w-md"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ئىزدە"
              className="bg-transparent outline-none text-sm w-full placeholder-gray-400 text-white rtl"
              dir="rtl"
            />
            <button
              type="submit"
              className="text-pink hover:text-pink/80 transition-colors ml-2"
            >
              <Search size={18} />
            </button>
          </form>

          {/* Logo and brand */}
          <Link
            to="/"
            className="flex items-center gap-2 flex-shrink-0"
          >
            <div className="text-center">
              <div className="text-2xl font-bold">
                <span className="text-pink">ساز</span>
                <span className="text-white ml-1">كىنو</span>
              </div>
              <div className="text-xs text-gray-400">www.sazkino.com</div>
            </div>
          </Link>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            {/* Search button mobile */}
            <button className="md:hidden text-pink hover:text-pink/80 transition-colors">
              <Search size={24} />
            </button>

            {/* VIP button */}
            <button className="bg-pink hover:opacity-90 text-white px-4 py-2 rounded-full font-semibold text-sm transition-opacity whitespace-nowrap">
              VIP ئەزا
            </button>
          </div>
        </div>

        {/* Navigation menu - desktop */}
        <nav className="hidden md:flex items-center justify-center gap-8 py-3 border-t border-pink/20 flex-wrap">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="text-white hover:text-pink transition-colors font-medium text-sm whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu - expanded */}
        {isMenuOpen && (
          <nav className="md:hidden border-t border-pink/20 py-4">
            <div className="flex flex-col gap-3">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white hover:text-pink transition-colors font-medium py-2 px-2"
                >
                  {item.label}
                </Link>
              ))}

              {/* Mobile search */}
              <form
                onSubmit={handleSearch}
                className="flex items-center bg-navy/50 border border-pink/30 rounded px-3 py-2 mt-2"
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ئىزدە"
                  className="bg-transparent outline-none text-sm flex-1 placeholder-gray-400 text-white rtl"
                  dir="rtl"
                />
                <button
                  type="submit"
                  className="text-pink hover:text-pink/80 transition-colors ml-2"
                >
                  <Search size={18} />
                </button>
              </form>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
