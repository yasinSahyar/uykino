import { Star } from "lucide-react";

interface MovieCardProps {
  title: string;
  image: string;
  isVip?: boolean;
  rating?: number;
}

export default function MovieCard({
  title,
  image,
  isVip = false,
  rating = 0,
}: MovieCardProps) {
  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden rounded-lg mb-3">
        {/* Movie poster image */}
        <img
          src={image}
          alt={title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* VIP Badge */}
        {isVip && (
          <div className="absolute top-3 right-3 bg-pink text-white px-3 py-1 rounded-full text-xs font-bold">
            VIP
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
          <button className="opacity-0 group-hover:opacity-100 bg-pink text-white px-6 py-2 rounded-lg font-semibold transition-opacity duration-300">
            بېقىش
          </button>
        </div>
      </div>

      {/* Movie info */}
      <h3 className="text-white font-semibold text-center truncate line-clamp-2">
        {title}
      </h3>

      {/* Rating */}
      {rating > 0 && (
        <div className="flex justify-center gap-1 mt-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              className={i < Math.round(rating) ? "fill-pink text-pink" : "text-gray-500"}
            />
          ))}
        </div>
      )}
    </div>
  );
}
