import { useState } from "react";
import Header from "@/components/Header";
import MovieCard from "@/components/MovieCard";
import Carousel from "@/components/Carousel";
import Banner from "@/components/Banner";
import { useMovies } from "@/hooks/useMovies";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Index() {
  const [showBanner, setShowBanner] = useState(true);

  // Fetch movies from API
  const { data: allMovies = [] } = useMovies({ limit: 100 });
  const { data: newMovies = [] } = useMovies({
    sort: "-year",
    limit: 10,
  });
  const { data: mostWatchedMovies = [] } = useMovies({
    sort: "-views",
    limit: 10,
  });
  const { data: mostPopularMovies = [] } = useMovies({
    category: "popular",
    sort: "-views",
    limit: 10,
  });
  const { data: seriesMovies = [] } = useMovies({
    category: "series",
    limit: 10,
  });
  const { data: cartoonMovies = [] } = useMovies({
    category: "cartoon",
    limit: 10,
  });

  // Featured carousel items
  const featuredItems = mostWatchedMovies.slice(0, 8).map((m: any) => ({
    id: m._id || m.id,
    image: m.image,
    title: m.title,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy via-navy to-navy/95">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Featured carousel section */}
        <section className="mb-12">
          <Carousel items={featuredItems} title="ساتالدىق مايدىلى" />
        </section>

        {/* Banner/Promotion */}
        {showBanner && (
          <Banner
            type="promotion"
            title="ئىپتىدائى VIP ئەزاسى"
            description="ھازىرچە VIP ئەزا بولۇپ، ھەممە پريميۇم مايدىلىنى بىسپلىتسىز كۆرۈڭ"
            cta="ھازىرلا قوش"
            onClose={() => setShowBanner(false)}
          />
        )}

        {/* Newest Movies Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">يېڭى فىلىملار</h2>
            <Link
              to="/search"
              className="text-pink hover:text-pink/80 transition-colors flex items-center gap-2 font-semibold"
            >
              كۆپ رەختى <ChevronRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {newMovies.map((movie: any) => (
              <MovieCard
                key={movie._id}
                id={movie._id}
                title={movie.title}
                image={movie.image}
                isVip={movie.isVip}
                views={movie.views}
              />
            ))}
          </div>
        </section>

        {/* Most Watched Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">كۆپ كۆرۈلگەن</h2>
            <Link
              to="/search"
              className="text-pink hover:text-pink/80 transition-colors flex items-center gap-2 font-semibold"
            >
              كۆپ رەختى <ChevronRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {mostWatchedMovies.map((movie: any) => (
              <MovieCard
                key={movie._id}
                id={movie._id}
                title={movie.title}
                image={movie.image}
                isVip={movie.isVip}
                views={movie.views}
              />
            ))}
          </div>
        </section>

        {/* Most Popular Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">مەشھۇر فىلىملار</h2>
            <Link
              to="/search"
              className="text-pink hover:text-pink/80 transition-colors flex items-center gap-2 font-semibold"
            >
              كۆپ رەختى <ChevronRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {mostPopularMovies.map((movie: any) => (
              <MovieCard
                key={movie._id}
                id={movie._id}
                title={movie.title}
                image={movie.image}
                isVip={movie.isVip}
                views={movie.views}
              />
            ))}
          </div>
        </section>

        {/* Series Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">كۆپ قسملىق</h2>
            <Link
              to="/series"
              className="text-pink hover:text-pink/80 transition-colors flex items-center gap-2 font-semibold"
            >
              كۆپ رەختى <ChevronRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {seriesMovies.map((movie: any) => (
              <MovieCard
                key={movie._id}
                id={movie._id}
                title={movie.title}
                image={movie.image}
                isVip={movie.isVip}
                views={movie.views}
              />
            ))}
          </div>
        </section>

        {/* Cartoon Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">كارتون فىلىملار</h2>
            <Link
              to="/cartoons"
              className="text-pink hover:text-pink/80 transition-colors flex items-center gap-2 font-semibold"
            >
              كۆپ رەختى <ChevronRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {cartoonMovies.map((movie: any) => (
              <MovieCard
                key={movie._id}
                id={movie._id}
                title={movie.title}
                image={movie.image}
                isVip={movie.isVip}
                views={movie.views}
              />
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-navy/50 border-t border-pink/20 py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-400 text-sm mb-4">
            <p>© 2024 سازكىنو تورى. بارلىق ھوقۇقلار قورۇقلانغان.</p>
            <p className="mt-2">www.sazkino.com</p>
          </div>

          {/* Footer links */}
          <div
            className="text-center text-xs text-gray-500 rtl text-right"
            dir="rtl"
          >
            <p>
              سازكىنو تورى | كىنو فىلىملار | ئۇيغۇر فىلىملار | ھىندى فىلىملار |
              تۈركى فىلىملار | ئەرەب فىلىملار
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
