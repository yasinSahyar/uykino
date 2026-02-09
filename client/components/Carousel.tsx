import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselItem {
  id: string;
  image: string;
  title: string;
}

interface CarouselProps {
  items: CarouselItem[];
  title?: string;
}

export default function Carousel({ items, title }: CarouselProps) {
  const scrollContainer = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainer.current) return;

    const scrollAmount = 400;
    const currentScroll = scrollContainer.current.scrollLeft;

    if (direction === "left") {
      scrollContainer.current.scrollTo({
        left: currentScroll - scrollAmount,
        behavior: "smooth",
      });
    } else {
      scrollContainer.current.scrollTo({
        left: currentScroll + scrollAmount,
        behavior: "smooth",
      });
    }

    setTimeout(checkScroll, 300);
  };

  const checkScroll = () => {
    if (!scrollContainer.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  return (
    <div className="relative w-full mb-8">
      {title && (
        <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      )}

      <div className="relative group">
        {/* Left scroll button */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-pink p-2 rounded-full transition-colors"
          >
            <ChevronLeft size={24} className="text-white" />
          </button>
        )}

        {/* Carousel container */}
        <div
          ref={scrollContainer}
          onScroll={checkScroll}
          className="flex gap-4 overflow-x-auto scroll-smooth pb-4"
          style={{
            scrollBehavior: "smooth",
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-48 h-32 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Right scroll button */}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-pink p-2 rounded-full transition-colors"
          >
            <ChevronRight size={24} className="text-white" />
          </button>
        )}
      </div>

      <style>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
