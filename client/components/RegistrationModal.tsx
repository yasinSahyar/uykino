import { useState } from "react";
import { X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  movieTitle?: string;
}

export default function RegistrationModal({
  isOpen,
  onClose,
  movieTitle = "فىلىم",
}: RegistrationModalProps) {
  const { register, login } = useAuth();
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (isLogin) {
        if (!formData.email || !formData.password) {
          throw new Error("ئىمايل ۋە پاسپۇرت مەجبۇرى");
        }
        await login(formData.email, formData.password);
      } else {
        if (!formData.email || !formData.name || !formData.password) {
          throw new Error("تهيه مايدىلار مەجبۇرى");
        }
        if (formData.password !== formData.confirmPassword) {
          throw new Error("پاسپۇرتلار ماتچ قىلمايدۇ");
        }
        if (formData.password.length < 6) {
          throw new Error("پاسپۇرت ئېلىگە 6 خاراكتىردىن كۆپ بولۇشى كېرەك");
        }
        await register(formData.email, formData.name, formData.password);
      }
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "خاتالىق كۆرۈندى");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-navy border border-pink/30 rounded-lg p-8 w-full max-w-md">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <h2 className="text-3xl font-bold text-white mb-2">
          {isLogin ? "تىزىمغا كىرىش" : "تىزىمگە قوشۇلۇش"}
        </h2>
        <p className="text-gray-400 mb-6">
          {movieTitle} كۆرۈش ئۈچۈن{" "}
          {isLogin ? "تىزىمغا كىرىش" : "تىزىمگە قوشۇلۇش"} كېرەك
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              ئىمايل
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="example@email.com"
              className="w-full bg-navy/50 border border-pink/30 rounded px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-pink"
            />
          </div>

          {/* Name - only for registration */}
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                ئىسمى
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="ئىسمىڭىزنى كىرگۈزۈڭ"
                className="w-full bg-navy/50 border border-pink/30 rounded px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-pink"
              />
            </div>
          )}

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              پاسپۇرت
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="پاسپۇرتىڭىزنى كىرگۈزۈڭ"
              className="w-full bg-navy/50 border border-pink/30 rounded px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-pink"
            />
          </div>

          {/* Confirm Password - only for registration */}
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                پاسپۇرتنى جەزملاش
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="پاسپۇرتنى قايتا كىرگۈزۈڭ"
                className="w-full bg-navy/50 border border-pink/30 rounded px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-pink"
              />
            </div>
          )}

          {/* Error message */}
          {error && <p className="text-red-400 text-sm">{error}</p>}

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-pink hover:opacity-90 text-white font-semibold py-2 rounded-lg transition-opacity disabled:opacity-50"
          >
            {isLoading
              ? "جاملىنىۋاتىدۇ..."
              : isLogin
                ? "تىزىمغا كىرىش"
                : "تىزىمگە قوشۇلۇش"}
          </button>
        </form>

        {/* Toggle between login and register */}
        <div className="mt-6 text-center text-gray-400">
          <p>
            {isLogin ? "تىزىمگە قوشۇلغان ئېمەسسىز؟" : "ئېچۈن تىزىمنى بارۇ؟"}{" "}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
                setFormData({
                  email: "",
                  name: "",
                  password: "",
                  confirmPassword: "",
                });
              }}
              className="text-pink hover:text-pink/80 transition-colors font-semibold"
            >
              {isLogin ? "تىزىمگە قوشۇلۇش" : "تىزىمغا كىرىش"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
