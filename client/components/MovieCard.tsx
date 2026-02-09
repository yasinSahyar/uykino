import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star, Play } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import RegistrationModal from "./RegistrationModal";

interface MovieCardProps {
  id: string;
  title: string;
  image: string;
  isVip?: boolean;
  views: number;
}

export default function MovieCard({
  id,
  title,
  image,
  isVip = false,
  views,
}: MovieCardProps) {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [showRegistration, setShowRegistration] = useState(false);

  // Calculate rating from views (0-5 stars)
  // More views = higher rating, with logarithmic scale for realism
  const calculateRating = (viewCount: number): number => {
    // Scale: 0 views = 0 stars, 50k = 2.5 stars, 200k = 5 stars
    if (viewCount === 0) return 0;
    const rating = Math.min(5, Math.log(viewCount / 10000 + 1) * 2.5);
    return Math.round(rating * 10) / 10;
  };

  const rating = calculateRating(views);

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      setShowRegistration(true);
    }
  };

  const handleCardClick = () => {
    navigate(`/movie/${id}`);
  };

  // Format view count for display
  const formatViews = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <>
      <div className="group cursor-pointer" onClick={handleCardClick}>
        <div className="relative overflow-hidden rounded-lg mb-3">
          {/* Movie poster image */}
          <img
            src={image}
            alt={title}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* VIP Badge */}
          {isVip && (
            <div className="absolute top-3 right-3 bg-pink text-white px-3 py-1 rounded-full text-xs font-bold z-10">
              VIP
            </div>
          )}

          {/* Hover overlay with play button */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <button
              onClick={handlePlayClick}
              className="bg-pink hover:bg-pink/90 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 transform scale-75 group-hover:scale-100"
            >
              <Play size={20} fill="currentColor" />
              بېقىش
            </button>
          </div>
        </div>

        {/* Movie info */}
        <h3 className="text-white font-semibold text-center truncate line-clamp-2 mb-2">
          {title}
        </h3>

        {/* Views count */}
        <div className="text-center text-gray-400 text-xs mb-2">
          {formatViews(views)} كۆرۈش
        </div>

        {/* Rating based on views */}
        <div className="flex justify-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => {
            const fillPercentage = Math.max(0, Math.min(1, rating - i));
            return (
              <div key={i} className="relative">
                <Star size={14} className="text-gray-600" />
                <div
                  className="absolute top-0 left-0 overflow-hidden"
                  style={{ width: `${fillPercentage * 100}%` }}
                >
                  <Star size={14} className="fill-pink text-pink" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Rating number */}
        <div className="text-center text-gray-400 text-xs">
          {rating.toFixed(1)} / 5
        </div>
      </div>

      {/* Registration Modal */}
      <RegistrationModal
        isOpen={showRegistration}
        onClose={() => setShowRegistration(false)}
        movieTitle={title}
      />
    </>
  );
}
