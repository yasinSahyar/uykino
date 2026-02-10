import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { adminLogin } = useAdmin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await adminLogin(username, password);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "خاتالىق كۆرۈندى");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-navy to-navy/95 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink/10 rounded-full blur-3xl" />
      </div>

      {/* Login card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-navy/50 border border-pink/30 rounded-lg p-8 backdrop-blur">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-pink/20 p-3 rounded-full">
                <LogIn size={32} className="text-pink" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              ئادمىن پىتقاق
            </h1>
            <p className="text-gray-400">سازكىنو تورى ئادمىن بۆلىمىگە كىرىش</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                نۇستا
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="نۇستاڭىزنى كىرگۈزۈڭ"
                className="w-full bg-navy/50 border border-pink/30 rounded px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-pink transition-colors"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                پاسپۇرت
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="پاسپۇرتىڭىزنى كىرگۈزۈڭ"
                className="w-full bg-navy/50 border border-pink/30 rounded px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-pink transition-colors"
              />
            </div>

            {/* Error message */}
            {error && <p className="text-red-400 text-sm">{error}</p>}

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-pink hover:bg-pink/90 text-white font-semibold py-2 rounded-lg transition-all disabled:opacity-50 mt-6"
            >
              {isLoading ? "جاملىنىۋاتىدۇ..." : "كىرىش"}
            </button>
          </form>

          {/* Info */}
          <div className="mt-8 pt-6 border-t border-pink/20">
            <p className="text-xs text-gray-400 text-center">
              سىناق ئادمىن ھېسابى:
            </p>
            <p className="text-xs text-gray-400 text-center mt-2">
              نۇستا: <span className="text-pink font-mono">admin</span>
            </p>
            <p className="text-xs text-gray-400 text-center">
              پاسپۇرت: <span className="text-pink font-mono">admin@2024</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
