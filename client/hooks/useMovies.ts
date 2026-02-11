import { useQuery } from "@tanstack/react-query";

export interface MovieQueryParams {
  category?: string;
  search?: string;
  country?: string;
  year?: number;
  sort?: string;
  limit?: number;
  skip?: number;
}

export function useMovies(params?: MovieQueryParams) {
  return useQuery({
    queryKey: ["movies", params],
    queryFn: async () => {
      // Build query string
      const searchParams = new URLSearchParams();

      if (params?.category) searchParams.append("category", params.category);
      if (params?.search) searchParams.append("search", params.search);
      if (params?.country) searchParams.append("country", params.country);
      if (params?.year) searchParams.append("year", params.year.toString());
      if (params?.sort) searchParams.append("sort", params.sort);
      if (params?.limit) searchParams.append("limit", params.limit.toString());
      if (params?.skip) searchParams.append("skip", params.skip.toString());

      const queryString = searchParams.toString();
      const url = `/api/movies${queryString ? `?${queryString}` : ""}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();
      return data.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
  });
}

export function useMovieById(id: string) {
  return useQuery({
    queryKey: ["movie", id],
    queryFn: async () => {
      const response = await fetch(`/api/movies/${id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch movie");
      }

      const data = await response.json();
      return data.data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}

export async function createMovie(movieData: any) {
  const response = await fetch("/api/movies", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movieData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to create movie");
  }

  return response.json();
}

export async function updateMovie(id: string, movieData: any) {
  const response = await fetch(`/api/movies/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movieData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to update movie");
  }

  return response.json();
}

export async function deleteMovie(id: string) {
  const response = await fetch(`/api/movies/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to delete movie");
  }

  return response.json();
}
