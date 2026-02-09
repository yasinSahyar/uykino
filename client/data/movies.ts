export interface Movie {
  id: string;
  title: string;
  image: string;
  isVip: boolean;
  views: number; // View count (rating will be calculated from this)
  category: "new" | "popular" | "series" | "cartoon" | "program";
  genres: string[];
  year?: number;
}

export const movies: Movie[] = [
  {
    id: "1",
    title: "قۇياش",
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop",
    isVip: true,
    rating: 4,
    category: "new",
    genres: ["action", "drama"],
    year: 2024,
  },
  {
    id: "2",
    title: "تىجنە توغى",
    image:
      "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=600&fit=crop",
    isVip: false,
    rating: 5,
    category: "new",
    genres: ["romance", "drama"],
    year: 2024,
  },
  {
    id: "3",
    title: "ئۆتكەن",
    image:
      "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=600&fit=crop",
    isVip: true,
    rating: 4,
    category: "new",
    genres: ["drama"],
    year: 2024,
  },
  {
    id: "4",
    title: "ياشناس",
    image:
      "https://images.unsplash.com/photo-1489599849228-bed96c3ee9b0?w=400&h=600&fit=crop",
    isVip: false,
    rating: 5,
    category: "new",
    genres: ["action", "adventure"],
    year: 2024,
  },
  {
    id: "5",
    title: "سازكىنو",
    image:
      "https://images.unsplash.com/photo-1515606403496-bb0b6cf35df9?w=400&h=600&fit=crop",
    isVip: true,
    rating: 3,
    category: "popular",
    genres: ["action"],
    year: 2023,
  },
  {
    id: "6",
    title: "كۆزنەك",
    image:
      "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&h=600&fit=crop",
    isVip: false,
    rating: 4,
    category: "popular",
    genres: ["comedy", "family"],
    year: 2023,
  },
  {
    id: "7",
    title: "كۋچاش",
    image:
      "https://images.unsplash.com/photo-1533453104940-531a62bc8f29?w=400&h=600&fit=crop",
    isVip: false,
    rating: 4,
    category: "popular",
    genres: ["drama"],
    year: 2023,
  },
  {
    id: "8",
    title: "ئېلىم",
    image:
      "https://images.unsplash.com/photo-1517604931442-7e0c6e4a9dba?w=400&h=600&fit=crop",
    isVip: true,
    rating: 5,
    category: "popular",
    genres: ["sci-fi", "action"],
    year: 2023,
  },
  {
    id: "9",
    title: "مىزاج ۋەرسە",
    image:
      "https://images.unsplash.com/photo-1505686356902-48d3be3c6b5f?w=400&h=600&fit=crop",
    isVip: false,
    rating: 4,
    category: "series",
    genres: ["drama"],
    year: 2023,
  },
  {
    id: "10",
    title: "ھالتۆ",
    image:
      "https://images.unsplash.com/photo-1534125845332-74f2f4737286?w=400&h=600&fit=crop",
    isVip: true,
    rating: 5,
    category: "series",
    genres: ["romance", "drama"],
    year: 2023,
  },
  {
    id: "11",
    title: "سىنىباشى",
    image:
      "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop",
    isVip: false,
    rating: 4,
    category: "series",
    genres: ["comedy"],
    year: 2022,
  },
  {
    id: "12",
    title: "ئونار",
    image:
      "https://images.unsplash.com/photo-1508712526313-50dcd8acd34d?w=400&h=600&fit=crop",
    isVip: false,
    rating: 5,
    category: "series",
    genres: ["family", "adventure"],
    year: 2022,
  },
  {
    id: "13",
    title: "قايۇق",
    image:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop",
    isVip: true,
    rating: 4,
    category: "cartoon",
    genres: ["family", "comedy"],
    year: 2024,
  },
  {
    id: "14",
    title: "ئۈزگەن",
    image:
      "https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?w=400&h=600&fit=crop",
    isVip: false,
    rating: 5,
    category: "cartoon",
    genres: ["family"],
    year: 2024,
  },
  {
    id: "15",
    title: "ستار",
    image:
      "https://images.unsplash.com/photo-1489599849228-bed96c3ee9b0?w=400&h=600&fit=crop",
    isVip: false,
    rating: 4,
    category: "program",
    genres: ["drama"],
    year: 2024,
  },
];
