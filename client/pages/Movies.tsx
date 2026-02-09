import Header from "@/components/Header";
import MovieCard from "@/components/MovieCard";
import { movies } from "@/data/movies";

export default function Movies() {
  const allMovies = movies.filter(
    (m) => m.category === "new" || m.category === "popular"
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy via-navy to-navy/95">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-white mb-12">فىلىملار</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              image={movie.image}
              isVip={movie.isVip}
              rating={movie.rating}
            />
          ))}
        </div>
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
