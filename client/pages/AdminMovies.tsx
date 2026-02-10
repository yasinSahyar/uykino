import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAdmin } from "@/context/AdminContext";
import { ArrowLeft, Plus, Edit2, Trash2, Search } from "lucide-react";
import { movies } from "@/data/movies";

export default function AdminMovies() {
  const navigate = useNavigate();
  const { admin } = useAdmin();
  const [searchQuery, setSearchQuery] = useState("");

  // Redirect if not logged in
  if (!admin) {
    navigate("/admin/login");
    return null;
  }

  const filteredMovies = movies.filter((m) =>
    m.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy via-navy to-navy/95">
      {/* Header */}
      <header className="bg-navy border-b border-pink/20 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="flex items-center gap-2 text-pink hover:text-pink/80 font-semibold"
          >
            <ArrowLeft size={20} />
            بەتكە قايت
          </button>
          <h1 className="text-2xl font-bold text-white">فىلىملار باشقۇرۇش</h1>
          <div className="w-20"></div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div className="flex items-center bg-navy/50 border border-pink/30 rounded px-4 py-2 flex-1 max-w-md">
            <Search size={20} className="text-pink mr-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="فىلىم ئىزدە..."
              className="bg-transparent outline-none text-white placeholder-gray-400 flex-1"
            />
          </div>

          <Link
            to="/admin/movies/add"
            className="flex items-center gap-2 bg-pink hover:bg-pink/90 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            <Plus size={20} />
            يېڭى فىلىم قوش
          </Link>
        </div>

        {/* Movies table */}
        <div className="bg-navy/50 border border-pink/20 rounded-lg overflow-hidden">
          {filteredMovies.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-navy border-b border-pink/20">
                  <tr>
                    <th className="text-left px-6 py-4 text-pink font-semibold">
                      فىلىم ئسمى
                    </th>
                    <th className="text-left px-6 py-4 text-pink font-semibold">
                      توپ
                    </th>
                    <th className="text-left px-6 py-4 text-pink font-semibold">
                      يىل
                    </th>
                    <th className="text-left px-6 py-4 text-pink font-semibold">
                      رايۇن
                    </th>
                    <th className="text-left px-6 py-4 text-pink font-semibold">
                      كۆرۈشلار
                    </th>
                    <th className="text-left px-6 py-4 text-pink font-semibold">
                      VIP
                    </th>
                    <th className="text-left px-6 py-4 text-pink font-semibold">
                      ھەركەت
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMovies.map((movie) => (
                    <tr
                      key={movie.id}
                      className="border-b border-pink/10 hover:bg-navy/30 transition-colors"
                    >
                      <td className="px-6 py-4 text-white font-medium">
                        {movie.title}
                      </td>
                      <td className="px-6 py-4 text-gray-400 text-sm">
                        {movie.category}
                      </td>
                      <td className="px-6 py-4 text-gray-400">
                        {movie.year}
                      </td>
                      <td className="px-6 py-4 text-gray-400 text-sm">
                        {movie.country}
                      </td>
                      <td className="px-6 py-4 text-gray-400">
                        {movie.views}
                      </td>
                      <td className="px-6 py-4">
                        {movie.isVip ? (
                          <span className="bg-pink/20 text-pink px-3 py-1 rounded text-sm font-semibold">
                            VIP
                          </span>
                        ) : (
                          <span className="text-gray-500 text-sm">نورمال</span>
                        )}
                      </td>
                      <td className="px-6 py-4 flex gap-2">
                        <Link
                          to={`/admin/movies/edit/${movie.id}`}
                          className="text-blue-400 hover:text-blue-300 p-2 hover:bg-blue-500/10 rounded transition-colors"
                          title="تەھرىرلە"
                        >
                          <Edit2 size={18} />
                        </Link>
                        <button
                          className="text-red-400 hover:text-red-300 p-2 hover:bg-red-500/10 rounded transition-colors"
                          title="ئۆچۈر"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-gray-400">فىلىم تېپىلمىدى</p>
            </div>
          )}
        </div>

        {/* Results count */}
        <div className="mt-4 text-gray-400 text-sm">
          {filteredMovies.length} فىلىم تېپىلدى
        </div>
      </div>
    </div>
  );
}
