import { useNavigate, Link } from "react-router-dom";
import { useAdmin } from "@/context/AdminContext";
import { useMovies } from "@/hooks/useMovies";
import { LogOut, Film, Plus, Edit2, Trash2, Users, BarChart3 } from "lucide-react";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { admin, adminLogout } = useAdmin();
  const { data: allMovies = [] } = useMovies({ limit: 100 });

  // Redirect if not logged in
  if (!admin) {
    navigate("/admin/login");
    return null;
  }

  const handleLogout = () => {
    adminLogout();
    navigate("/");
  };

  const totalMovies = allMovies.length;
  const totalViews = allMovies.reduce((sum: number, m: any) => sum + (m.views || 0), 0);
  const vipMovies = allMovies.filter((m: any) => m.isVip).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy via-navy to-navy/95">
      {/* Header */}
      <header className="bg-navy border-b border-pink/20 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-pink p-2 rounded">
              <Film size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">سازكىنو ئادمىن</h1>
              <p className="text-gray-400 text-sm">ھېسابى: {admin.username}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-pink/20 border border-pink text-pink hover:bg-pink/30 px-4 py-2 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            چىقىش
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {/* Total Movies */}
          <div className="bg-navy/50 border border-pink/20 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">جەمئى فىلىملار</p>
                <p className="text-3xl font-bold text-white mt-2">{totalMovies}</p>
              </div>
              <Film size={32} className="text-pink/50" />
            </div>
          </div>

          {/* Total Views */}
          <div className="bg-navy/50 border border-pink/20 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">جەمئى كۆرۈشلار</p>
                <p className="text-3xl font-bold text-white mt-2">
                  {(totalViews / 1000).toFixed(0)}K
                </p>
              </div>
              <BarChart3 size={32} className="text-pink/50" />
            </div>
          </div>

          {/* VIP Movies */}
          <div className="bg-navy/50 border border-pink/20 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">VIP فىلىملار</p>
                <p className="text-3xl font-bold text-pink mt-2">{vipMovies}</p>
              </div>
              <Film size={32} className="text-pink/20" />
            </div>
          </div>

          {/* Users (Placeholder) */}
          <div className="bg-navy/50 border border-pink/20 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">تىزىمگە قوشۇلغان ئۇسۇل</p>
                <p className="text-3xl font-bold text-white mt-2">۰</p>
              </div>
              <Users size={32} className="text-pink/50" />
            </div>
          </div>
        </div>

        {/* Management Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-white">فىلىملار باشقۇرۇش</h2>
            <Link
              to="/admin/movies/add"
              className="flex items-center gap-2 bg-pink hover:bg-pink/90 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              <Plus size={20} />
              يېڭى فىلىم قوش
            </Link>
          </div>

          {/* Movies List Preview */}
          <div className="bg-navy/50 border border-pink/20 rounded-lg overflow-hidden">
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
                  {allMovies.slice(0, 10).map((movie: any) => (
                    <tr
                      key={movie._id}
                      className="border-b border-pink/10 hover:bg-navy/30 transition-colors"
                    >
                      <td className="px-6 py-4 text-white">{movie.title}</td>
                      <td className="px-6 py-4 text-gray-400 text-sm">
                        {movie.category}
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
                          to={`/admin/movies/edit/${movie._id}`}
                          className="text-blue-400 hover:text-blue-300 p-2 hover:bg-blue-500/10 rounded transition-colors"
                        >
                          <Edit2 size={18} />
                        </Link>
                        <button className="text-red-400 hover:text-red-300 p-2 hover:bg-red-500/10 rounded transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* View all link */}
            <div className="px-6 py-4 border-t border-pink/20 text-center">
              <Link
                to="/admin/movies"
                className="text-pink hover:text-pink/80 font-semibold"
              >
                ھەممىسىنى كۆر ({totalMovies})
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
