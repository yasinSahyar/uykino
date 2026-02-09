import { X } from "lucide-react";
import { useState } from "react";

interface BannerProps {
  title: string;
  description?: string;
  image?: string;
  cta?: string;
  onClose?: () => void;
  type?: "info" | "promotion" | "announcement";
}

export default function Banner({
  title,
  description,
  image,
  cta,
  onClose,
  type = "info",
}: BannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  const bgColor = {
    info: "bg-gradient-to-r from-blue-600 to-purple-600",
    promotion: "bg-gradient-to-r from-pink to-purple-600",
    announcement: "bg-gradient-to-r from-yellow-600 to-orange-600",
  }[type];

  return (
    <div className={`${bgColor} rounded-lg p-6 mb-8 relative overflow-hidden`}>
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          {description && (
            <p className="text-white/90 text-sm mb-4">{description}</p>
          )}
          {cta && (
            <button className="bg-white text-pink font-semibold px-6 py-2 rounded hover:opacity-90 transition-opacity">
              {cta}
            </button>
          )}
        </div>

        {image && (
          <div className="hidden md:block ml-8">
            <img
              src={image}
              alt={title}
              className="w-32 h-32 object-cover rounded-lg opacity-90"
            />
          </div>
        )}

        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-white hover:text-pink transition-colors"
        >
          <X size={24} />
        </button>
      </div>
    </div>
  );
}
