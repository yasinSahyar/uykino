import Header from "@/components/Header";
import MovieCard from "@/components/MovieCard";
import { movies } from "@/data/movies";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Index() {
  // Group movies by category
  const newMovies = movies.filter((m) => m.category === "new");
  const popularMovies = movies.filter((m) => m.category === "popular");
  const seriesMovies = movies.filter((m) => m.category === "series");

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy via-navy to-navy/95">
      <Header />

      {/* Hero section */}
      <div className="relative h-96 bg-gradient-to-r from-navy via-pink/20 to-navy flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,rgba(139,92,246,0.1)_100%)]" />

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink/10 rounded-full blur-3xl" />

        {/* Hero content */}
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-pink">ساز كىنو</span>
            <span className="block mt-2">تورى</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            سازكىنو تورىدىن ساتالدىق سىنىملىرنى كۆرۈڭ
          </p>
          <button className="bg-pink hover:bg-pink/90 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            ھازىر باشلاپ كۆرۈڭ
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-12">
        {/* Newly Added Movies Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">يېڭى قوشۇلغان</h2>
            <Link
              to="/movies"
              className="text-pink hover:text-pink/80 transition-colors flex items-center gap-2"
            >
              كۆپ رەختى <ChevronRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {newMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                title={movie.title}
                image={movie.image}
                isVip={movie.isVip}
                rating={movie.rating}
              />
            ))}
          </div>
        </section>

        {/* Popular Movies Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">مەشھۇر سىنىملار</h2>
            <Link
              to="/movies"
              className="text-pink hover:text-pink/80 transition-colors flex items-center gap-2"
            >
              كۆپ رەختى <ChevronRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {popularMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                title={movie.title}
                image={movie.image}
                isVip={movie.isVip}
                rating={movie.rating}
              />
            ))}
          </div>
        </section>

        {/* Series Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">كۆپ قسملىق</h2>
            <Link
              to="/series"
              className="text-pink hover:text-pink/80 transition-colors flex items-center gap-2"
            >
              كۆپ رەختى <ChevronRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {seriesMovies.slice(0, 8).map((movie) => (
              <MovieCard
                key={movie.id}
                title={movie.title}
                image={movie.image}
                isVip={movie.isVip}
                rating={movie.rating}
              />
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-navy/50 border-t border-pink/20 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
          <p>© 2024 سازكىنو تورى. بارلىق ھوقۇقلار قورۇقلانغان.</p>
          <p className="mt-2">www.sazkino.com</p>
        </div>
      </footer>
    </div>
  );
}
