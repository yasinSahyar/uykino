// In-memory database for testing when MongoDB is not available
interface Movie {
  _id: string;
  title: string;
  image: string;
  video: string;
  isVip: boolean;
  views: number;
  category: "new" | "popular" | "series" | "cartoon" | "program";
  genres: string[];
  year?: number;
  country?: string;
  language?: string;
  dateAdded?: string;
  description?: string;
}

let movies: Movie[] = [];
let nextId = 1;

export const memoryDb = {
  // Find all movies with filters
  async find(filter: any = {}) {
    let results = [...movies];

    if (filter.category) {
      results = results.filter((m) => m.category === filter.category);
    }
    if (filter.country) {
      results = results.filter((m) => m.country === filter.country);
    }
    if (filter.year) {
      results = results.filter((m) => m.year === filter.year);
    }
    if (filter.$text) {
      const searchTerm = filter.$text.$search?.toLowerCase();
      if (searchTerm) {
        results = results.filter(
          (m) =>
            m.title.toLowerCase().includes(searchTerm) ||
            m.description?.toLowerCase().includes(searchTerm)
        );
      }
    }

    return results;
  },

  // Find single movie by ID
  async findById(id: string) {
    return movies.find((m) => m._id === id) || null;
  },

  // Count documents
  async countDocuments(filter: any = {}) {
    const results = await this.find(filter);
    return results.length;
  },

  // Create new movie
  async create(data: Partial<Movie>) {
    const id = `mem_${nextId++}_${Date.now()}`;
    const movie: Movie = {
      _id: id,
      title: data.title || "",
      image: data.image || "",
      video: data.video || "",
      isVip: data.isVip || false,
      views: data.views || 0,
      category: data.category || "new",
      genres: data.genres || [],
      year: data.year,
      country: data.country,
      language: data.language || "ئۇيغۇرچە",
      dateAdded: data.dateAdded || new Date().toISOString().split("T")[0],
      description: data.description,
    };

    movies.push(movie);
    return movie;
  },

  // Update movie
  async findByIdAndUpdate(id: string, updateData: Partial<Movie>) {
    const index = movies.findIndex((m) => m._id === id);
    if (index === -1) return null;

    movies[index] = { ...movies[index], ...updateData };
    return movies[index];
  },

  // Delete movie
  async findByIdAndDelete(id: string) {
    const index = movies.findIndex((m) => m._id === id);
    if (index === -1) return null;

    const deleted = movies[index];
    movies.splice(index, 1);
    return deleted;
  },

  // Aggregate (for stats)
  async aggregate(pipeline: any[]) {
    // Simple aggregation for stats
    if (pipeline[0]?.$group) {
      const totalViews = movies.reduce((sum, m) => sum + m.views, 0);
      return [
        {
          _id: null,
          views: totalViews,
        },
      ];
    }
    return [];
  },
};
