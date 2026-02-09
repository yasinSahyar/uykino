export interface Movie {
  id: string;
  title: string;
  image: string;
  isVip: boolean;
  rating: number;
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
  },
  {
    id: "2",
    title: "تىجنە توغى",
    image:
      "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=600&fit=crop",
    isVip: false,
    rating: 5,
    category: "new",
  },
  {
    id: "3",
    title: "ئۆتكەن",
    image:
      "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=600&fit=crop",
    isVip: true,
    rating: 4,
    category: "new",
  },
  {
    id: "4",
    title: "ياشناس",
    image:
      "https://images.unsplash.com/photo-1489599849228-bed96c3ee9b0?w=400&h=600&fit=crop",
    isVip: false,
    rating: 5,
    category: "new",
  },
  {
    id: "5",
    title: "سازكىنو",
    image:
      "https://images.unsplash.com/photo-1515606403496-bb0b6cf35df9?w=400&h=600&fit=crop",
    isVip: true,
    rating: 3,
    category: "popular",
  },
  {
    id: "6",
    title: "كۆزنەك",
    image:
      "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&h=600&fit=crop",
    isVip: false,
    rating: 4,
    category: "popular",
  },
  {
    id: "7",
    title: "كۋچاش",
    image:
      "https://images.unsplash.com/photo-1533453104940-531a62bc8f29?w=400&h=600&fit=crop",
    isVip: false,
    rating: 4,
    category: "popular",
  },
  {
    id: "8",
    title: "ئېلىم",
    image:
      "https://images.unsplash.com/photo-1517604931442-7e0c6e4a9dba?w=400&h=600&fit=crop",
    isVip: true,
    rating: 5,
    category: "popular",
  },
  {
    id: "9",
    title: "مىزاج ۋەرسە",
    image:
      "https://images.unsplash.com/photo-1505686356902-48d3be3c6b5f?w=400&h=600&fit=crop",
    isVip: false,
    rating: 4,
    category: "series",
  },
  {
    id: "10",
    title: "ھالتۆ",
    image:
      "https://images.unsplash.com/photo-1534125845332-74f2f4737286?w=400&h=600&fit=crop",
    isVip: true,
    rating: 5,
    category: "series",
  },
  {
    id: "11",
    title: "سىنىباشى",
    image:
      "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop",
    isVip: false,
    rating: 4,
    category: "series",
  },
  {
    id: "12",
    title: "ئونار",
    image:
      "https://images.unsplash.com/photo-1508712526313-50dcd8acd34d?w=400&h=600&fit=crop",
    isVip: false,
    rating: 5,
    category: "series",
  },
];
