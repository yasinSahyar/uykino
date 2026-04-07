import { Router, Request, Response } from "express";
import { Movie, IMovie } from "../models/Movie";
import { connectDatabase } from "../config/database";
import { memoryDb } from "../db/memory";

const router = Router();

let useMemoryDb = false;

// Ensure database is connected
router.use(async (req, res, next) => {
  try {
    await connectDatabase();
    useMemoryDb = false;
  } catch (error) {
    // Fall back to memory database
    useMemoryDb = true;
    console.warn(
      "MongoDB not available, using in-memory database for this session"
    );
  }
  next();
});

// GET all movies with filters
router.get("/", async (req: Request, res: Response) => {
  try {
    const {
      category,
      search,
      country,
      year,
      sort = "-views",
      limit = "50",
      skip = "0",
    } = req.query;

    // Build filter object
    const filter: any = {};

    if (category) {
      filter.category = category;
    }

    if (country) {
      filter.country = country;
    }

    if (year) {
      filter.year = parseInt(year as string);
    }

    if (search) {
      filter.$text = { $search: search };
    }

    let movies: any[];
    let total: number;

    if (useMemoryDb) {
      // Use memory database
      movies = await memoryDb.find(filter);
      total = await memoryDb.countDocuments(filter);

      // Apply sorting
      if (sort === "-views") {
        movies.sort((a, b) => b.views - a.views);
      } else if (sort === "-year") {
        movies.sort((a, b) => (b.year || 0) - (a.year || 0));
      }
    } else {
      // Use MongoDB
      movies = await Movie.find(filter)
        .sort(sort as string)
        .limit(parseInt(limit as string))
        .skip(parseInt(skip as string))
        .exec();

      total = await Movie.countDocuments(filter);
    }

    // Apply pagination from memory results if needed
    if (useMemoryDb) {
      const skipNum = parseInt(skip as string);
      const limitNum = parseInt(limit as string);
      movies = movies.slice(skipNum, skipNum + limitNum);
    }

    res.json({
      success: true,
      data: movies,
      pagination: {
        total,
        limit: parseInt(limit as string),
        skip: parseInt(skip as string),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch movies",
      details: String(error),
    });
  }
});

// GET single movie by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    let movie;

    if (useMemoryDb) {
      movie = await memoryDb.findById(req.params.id);
    } else {
      movie = await Movie.findById(req.params.id);
    }

    if (!movie) {
      res.status(404).json({
        success: false,
        error: "Movie not found",
      });
      return;
    }

    res.json({
      success: true,
      data: movie,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch movie",
      details: String(error),
    });
  }
});

// POST create new movie
router.post("/", async (req: Request, res: Response) => {
  try {
    const {
      title,
      image,
      video,
      isVip,
      views,
      category,
      genres,
      year,
      country,
      language,
      dateAdded,
      description,
    } = req.body;

    // Validate required fields
    if (!title || !image || !video || !category) {
      res.status(400).json({
        success: false,
        error: "Missing required fields: title, image, video, category",
      });
      return;
    }

    const movieData: Partial<IMovie> = {
      title,
      image,
      video,
      isVip: isVip ?? false,
      views: views ?? 0,
      category,
      genres: genres ?? [],
      year,
      country,
      language: language || "ئۇيغۇرچە",
      dateAdded: dateAdded || new Date().toISOString().split("T")[0],
      description,
    };

    let movie;

    if (useMemoryDb) {
      movie = await memoryDb.create(movieData);
    } else {
      movie = await Movie.create(movieData);
    }

    res.status(201).json({
      success: true,
      data: movie,
      message: "Movie created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to create movie",
      details: String(error),
    });
  }
});

// PUT update movie
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const {
      title,
      image,
      video,
      isVip,
      views,
      category,
      genres,
      year,
      country,
      language,
      dateAdded,
      description,
    } = req.body;

    // Build update object
    const updateData: any = {};

    if (title !== undefined) updateData.title = title;
    if (image !== undefined) updateData.image = image;
    if (video !== undefined) updateData.video = video;
    if (isVip !== undefined) updateData.isVip = isVip;
    if (views !== undefined) updateData.views = views;
    if (category !== undefined) updateData.category = category;
    if (genres !== undefined) updateData.genres = genres;
    if (year !== undefined) updateData.year = year;
    if (country !== undefined) updateData.country = country;
    if (language !== undefined) updateData.language = language;
    if (dateAdded !== undefined) updateData.dateAdded = dateAdded;
    if (description !== undefined) updateData.description = description;

    let movie;

    if (useMemoryDb) {
      movie = await memoryDb.findByIdAndUpdate(req.params.id, updateData);
    } else {
      movie = await Movie.findByIdAndUpdate(req.params.id, updateData, {
        new: true,
        runValidators: true,
      });
    }

    if (!movie) {
      res.status(404).json({
        success: false,
        error: "Movie not found",
      });
      return;
    }

    res.json({
      success: true,
      data: movie,
      message: "Movie updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to update movie",
      details: String(error),
    });
  }
});

// DELETE movie
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    let movie;

    if (useMemoryDb) {
      movie = await memoryDb.findByIdAndDelete(req.params.id);
    } else {
      movie = await Movie.findByIdAndDelete(req.params.id);
    }

    if (!movie) {
      res.status(404).json({
        success: false,
        error: "Movie not found",
      });
      return;
    }

    res.json({
      success: true,
      message: "Movie deleted successfully",
      data: movie,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to delete movie",
      details: String(error),
    });
  }
});

// GET stats/summary
router.get("/stats/summary", async (req: Request, res: Response) => {
  try {
    let total: number;
    let totalViews: number;
    let vipCount: number;

    if (useMemoryDb) {
      const allMovies = await memoryDb.find({});
      total = allMovies.length;
      totalViews = allMovies.reduce((sum, m) => sum + m.views, 0);
      vipCount = allMovies.filter((m) => m.isVip).length;
    } else {
      total = await Movie.countDocuments();
      const result = await Movie.aggregate([
        {
          $group: {
            _id: null,
            views: { $sum: "$views" },
          },
        },
      ]);
      totalViews = result[0]?.views || 0;
      vipCount = await Movie.countDocuments({ isVip: true });
    }

    res.json({
      success: true,
      data: {
        totalMovies: total,
        totalViews: totalViews,
        vipMovies: vipCount,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch stats",
      details: String(error),
    });
  }
});

export default router;
