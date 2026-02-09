import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-navy text-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top row with logo and search */}
        <div className="flex items-center justify-between py-4 border-b border-pink/30">
          <Link to="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold">
              <span className="text-pink">ساز</span>
              <span className="ml-1">كىنو</span>
            </div>
          </Link>

          {/* Search bar - hidden on mobile */}
          <div className="hidden md:flex items-center bg-navy/50 border border-pink/30 rounded px-3 py-2">
            <input
              type="text"
              placeholder="ئىزدە"
              className="bg-transparent outline-none text-sm w-48 placeholder-gray-400"
            />
            <Search size={18} className="text-pink ml-2" />
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* VIP button - hidden on small screens */}
          <button className="hidden sm:inline-block bg-pink hover:bg-pink/90 px-6 py-2 rounded font-semibold text-sm">
            VIP ئەزا بۇلۇش
          </button>
        </div>

        {/* Navigation menu */}
        <nav
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:flex md:items-center md:justify-center md:gap-8 py-4`}
        >
          <Link
            to="/"
            className="block py-2 md:py-0 hover:text-pink transition-colors"
          >
            باش بەت
          </Link>
          <Link
            to="/movies"
            className="block py-2 md:py-0 hover:text-pink transition-colors"
          >
            فىلىملار
          </Link>
          <Link
            to="/series"
            className="block py-2 md:py-0 hover:text-pink transition-colors"
          >
            كۆپ قسملىق
          </Link>
          <Link
            to="/cartoons"
            className="block py-2 md:py-0 hover:text-pink transition-colors"
          >
            كارتون
          </Link>
          <Link
            to="/programs"
            className="block py-2 md:py-0 hover:text-pink transition-colors"
          >
            پروگراملار
          </Link>

          {/* VIP button for mobile */}
          <button className="md:hidden w-full mt-2 bg-pink hover:bg-pink/90 px-6 py-2 rounded font-semibold text-sm">
            VIP ئەزا بۇلۇش
          </button>
        </nav>

        {/* Mobile search - appears when menu is open */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 flex items-center bg-navy/50 border border-pink/30 rounded px-3 py-2">
            <input
              type="text"
              placeholder="ئىزدە"
              className="bg-transparent outline-none text-sm flex-1 placeholder-gray-400"
            />
            <Search size={18} className="text-pink ml-2" />
          </div>
        )}
      </div>
    </header>
  );
}
