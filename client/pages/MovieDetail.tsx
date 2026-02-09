import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Play, Share2 } from "lucide-react";
import Header from "@/components/Header";
import RegistrationModal from "@/components/RegistrationModal";
import { movies } from "@/data/movies";
import { useAuth } from "@/context/AuthContext";

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [showRegistration, setShowRegistration] = useState(false);

  const movie = movies.find((m) => m.id === id);

  if (!movie) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-navy via-navy to-navy/95">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-pink hover:text-pink/80 mb-8"
          >
            <ArrowLeft size={24} />
            گەرىگە قايت
          </button>
          <div className="text-center">
            <p className="text-gray-400 text-xl">فىلىم تېپىلمىدى</p>
          </div>
        </div>
      </div>
    );
  }

  const handlePlay = () => {
    if (!isLoggedIn) {
      setShowRegistration(true);
    }
  };

  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("ug-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Calculate rating from views
  const calculateRating = (viewCount: number): number => {
    if (viewCount === 0) return 0;
    const rating = Math.min(5, Math.log(viewCount / 10000 + 1) * 2.5);
    return Math.round(rating * 10) / 10;
  };

  const rating = calculateRating(movie.views);

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy via-navy to-navy/95">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-pink hover:text-pink/80 mb-8 font-semibold"
        >
          <ArrowLeft size={24} />
          گەرىگە قايت
        </button>

        {/* Movie detail container */}
        <div className="bg-navy/50 rounded-lg overflow-hidden border border-pink/20">
          {/* Header with image and play button */}
          <div className="relative overflow-hidden h-80 md:h-96 bg-black">
            <img
              src={movie.image}
              alt={movie.title}
              className="w-full h-full object-cover"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent" />

            {/* VIP badge */}
            {movie.isVip && (
              <div className="absolute top-6 right-6 bg-pink text-white px-4 py-2 rounded-full font-bold text-sm">
                VIP
              </div>
            )}

            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={handlePlay}
                className="bg-pink hover:bg-pink/90 text-white px-12 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-110 flex items-center gap-3"
              >
                <Play size={28} fill="currentColor" />
                بېقىش
              </button>
            </div>
          </div>

          {/* Movie information */}
          <div className="p-8">
            {/* Title and rating */}
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {movie.title}
              </h1>

              {/* Rating and views */}
              <div className="flex items-center gap-6 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400 text-lg font-bold">
                    ⭐ {rating.toFixed(1)}/5
                  </span>
                  <span className="text-gray-400">({movie.views} كۆرۈش)</span>
                </div>
              </div>
            </div>

            {/* Movie metadata grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8 pb-8 border-b border-pink/20">
              {/* Movie Name */}
              <div>
                <p className="text-pink font-bold text-sm mb-2">فىلىم ئسمى</p>
                <p className="text-white text-lg">{movie.title}</p>
              </div>

              {/* Movie Category/Genre */}
              <div>
                <p className="text-pink font-bold text-sm mb-2">فىلىم تۈرى</p>
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre}
                      className="bg-pink/20 border border-pink/50 text-pink px-3 py-1 rounded text-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>

              {/* Country of Origin */}
              <div>
                <p className="text-pink font-bold text-sm mb-2">
                  فىلىم رايۇنى
                </p>
                <p className="text-white text-lg">{movie.country || "نەمە"}</p>
              </div>

              {/* Movie Year */}
              <div>
                <p className="text-pink font-bold text-sm mb-2">فىلىم يىلى</p>
                <p className="text-white text-lg">{movie.year || "نەمە"}</p>
              </div>

              {/* Movie Language */}
              <div>
                <p className="text-pink font-bold text-sm mb-2">فىلىم تىلى</p>
                <p className="text-white text-lg">{movie.language || "نەمە"}</p>
              </div>

              {/* Date Added */}
              <div>
                <p className="text-pink font-bold text-sm mb-2">
                  يوللانغان ۋاقتى
                </p>
                <p className="text-white text-lg">
                  {formatDate(movie.dateAdded)}
                </p>
              </div>
            </div>

            {/* Description */}
            {movie.description && (
              <div className="mb-8">
                <p className="text-pink font-bold text-sm mb-3">تېسىپپى</p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {movie.description}
                </p>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex gap-4 flex-wrap">
              <button
                onClick={handlePlay}
                className="bg-pink hover:bg-pink/90 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all"
              >
                <Play size={20} fill="currentColor" />
                بېقىش
              </button>

              <button className="border border-pink text-pink hover:bg-pink/10 px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all">
                <Share2 size={20} />
                ئورتاق قىل
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      <RegistrationModal
        isOpen={showRegistration}
        onClose={() => setShowRegistration(false)}
        movieTitle={movie.title}
      />

      {/* Footer */}
      <footer className="bg-navy/50 border-t border-pink/20 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
          <p>© 2024 سازكىنو تورى. بارلىق ھوقۇقلار قورۇقلانغان.</p>
        </div>
      </footer>
    </div>
  );
}
