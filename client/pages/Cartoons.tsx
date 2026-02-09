import Header from "@/components/Header";
import MovieCard from "@/components/MovieCard";
import { movies } from "@/data/movies";

export default function Cartoons() {
  const cartoonContent = movies
    .filter((m) => m.category === "cartoon")
    .sort((a, b) => b.views - a.views);

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy via-navy to-navy/95">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-white mb-12">كارتون فىلىملار</h1>

        {cartoonContent.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {cartoonContent.map((movie) => (
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
          <div className="text-center py-24">
            <p className="text-xl text-gray-400">
              ھازىرچە مايدىلى كۇنى قوشۇلاتتۇ. باشقا سېكتىسىنى كۆرۈڭ!
            </p>
          </div>
        )}
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
