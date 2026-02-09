import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import MovieCard from "@/components/MovieCard";
import { movies } from "@/data/movies";
import { genres, movieCategories } from "@/data/genres";

export default function Search() {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) {
      setSearchQuery(q);
    }
  }, [searchParams]);

  // Get unique countries and years for filtering
  const countries = Array.from(
    new Set(movies.map((m) => m.country).filter(Boolean)),
  );
  const years = Array.from(
    new Set(movies.map((m) => m.year).filter(Boolean)),
  ).sort((a, b) => (b || 0) - (a || 0));

  // Filter movies
  const filteredMovies = movies.filter((movie) => {
    const matchesSearch =
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre =
      selectedGenres.length === 0 ||
      selectedGenres.some((g) => movie.genres.includes(g));
    const matchesCategory =
      !selectedCategory || movie.category === selectedCategory;
    const matchesCountry =
      !selectedCountry || movie.country === selectedCountry;
    const matchesYear =
      !selectedYear || movie.year?.toString() === selectedYear;

    return (
      matchesSearch &&
      matchesGenre &&
      matchesCategory &&
      matchesCountry &&
      matchesYear
    );
  });

  const toggleGenre = (genreId: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId)
        ? prev.filter((g) => g !== genreId)
        : [...prev, genreId],
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy via-navy to-navy/95">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Search input */}
        <div className="mb-8">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="فىلىم ئىزدەش..."
            className="w-full bg-navy/50 border border-pink/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-pink"
            dir="rtl"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar filters */}
          <div className="lg:w-48 flex-shrink-0">
            <div className="bg-navy/50 rounded-lg p-6 border border-pink/20">
              {/* Category filter */}
              <div className="mb-8">
                <h3 className="text-pink font-bold mb-4">توپ</h3>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => setSelectedCategory("")}
                    className={`text-left py-2 px-3 rounded transition-colors ${
                      !selectedCategory
                        ? "bg-pink text-white"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    ھەمسە
                  </button>
                  {movieCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`text-left py-2 px-3 rounded transition-colors ${
                        selectedCategory === cat.id
                          ? "bg-pink text-white"
                          : "text-gray-300 hover:text-white"
                      }`}
                    >
                      {cat.uyghur}
                    </button>
                  ))}
                </div>
              </div>

              {/* Genre filter */}
              <div className="mb-8">
                <h3 className="text-pink font-bold mb-4">ژانۇس</h3>
                <div className="flex flex-col gap-3">
                  {genres.map((genre) => (
                    <label
                      key={genre.id}
                      className="flex items-center gap-3 cursor-pointer text-gray-300 hover:text-white transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedGenres.includes(genre.id)}
                        onChange={() => toggleGenre(genre.id)}
                        className="w-4 h-4 rounded border-pink/50 accent-pink"
                      />
                      {genre.uyghur}
                    </label>
                  ))}
                </div>
              </div>

              {/* Country filter */}
              <div className="mb-8">
                <h3 className="text-pink font-bold mb-4">فىلىم رايۇنى</h3>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full bg-navy/50 border border-pink/30 rounded px-3 py-2 text-white focus:outline-none focus:border-pink"
                >
                  <option value="">ھەمسە رايۇن</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              {/* Year filter */}
              <div>
                <h3 className="text-pink font-bold mb-4">فىلىم يىلى</h3>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full bg-navy/50 border border-pink/30 rounded px-3 py-2 text-white focus:outline-none focus:border-pink"
                >
                  <option value="">ھەمسە يىل</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1">
            {/* Results header */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white">
                نتىجىلار: {filteredMovies.length}
              </h2>
            </div>

            {/* Movies grid */}
            {filteredMovies.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {filteredMovies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    id={movie.id}
                    title={movie.title}
                    image={movie.image}
                    isVip={movie.isVip}
                    views={movie.views}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 text-xl">
                  ئايتىدىغان فىلىم تېپىلمىدى
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-navy/50 border-t border-pink/20 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
          <p>© 2024 سازكىنو تورى. بارلىق ھوقۇقلار قورۇقلانغان.</p>
        </div>
      </footer>
    </div>
  );
}
