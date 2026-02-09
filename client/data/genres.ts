export interface Genre {
  id: string;
  name: string;
  uyghur: string;
}

export interface MovieCategory {
  id: string;
  name: string;
  uyghur: string;
}

export const genres: Genre[] = [
  { id: "action", name: "Action", uyghur: "ھارىقا" },
  { id: "drama", name: "Drama", uyghur: "دراما" },
  { id: "comedy", name: "Comedy", uyghur: "يۇمۇر" },
  { id: "romance", name: "Romance", uyghur: "مۇھەببەت" },
  { id: "horror", name: "Horror", uyghur: "قورقۇنچ" },
  { id: "sci-fi", name: "Sci-Fi", uyghur: "ئىلمىي خىيالى" },
  { id: "adventure", name: "Adventure", uyghur: "سەپارى" },
  { id: "family", name: "Family", uyghur: "خاق قورغان" },
];

export const movieCategories: MovieCategory[] = [
  { id: "new", name: "Newly Added", uyghur: "يېڭى قوشۇلغان" },
  { id: "popular", name: "Popular", uyghur: "مەشھۇر" },
  { id: "series", name: "Multi-Episode", uyghur: "كۆپ قسملىق" },
  { id: "cartoon", name: "Cartoon", uyghur: "كارتون فىلىم" },
  { id: "program", name: "Programs", uyghur: "پروگراملار" },
];
