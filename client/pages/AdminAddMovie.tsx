import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAdmin } from "@/context/AdminContext";
import { useMovieById } from "@/hooks/useMovies";
import { createMovie, updateMovie } from "@/hooks/useMovies";
import { ArrowLeft, Save, Upload, Loader } from "lucide-react";
import { Movie } from "@/data/movies";
import { genres, movieCategories } from "@/data/genres";

export default function AdminAddMovie() {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const { admin } = useAdmin();

  // Redirect if not logged in
  if (!admin) {
    navigate("/admin/login");
    return null;
  }

  const isEditing = !!id;
  const { data: existingMovie } = useMovieById(id || "");

  const [formData, setFormData] = useState<any>({
    title: "",
    image: "",
    video: "",
    isVip: false,
    views: 0,
    category: "new",
    genres: [],
    year: new Date().getFullYear(),
    country: "",
    language: "ئۇيغۇرچە",
    dateAdded: new Date().toISOString().split("T")[0],
    description: "",
  });

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{
    video?: boolean;
    image?: boolean;
  }>({});

  const [previewFiles, setPreviewFiles] = useState<{
    videoName?: string;
    imageName?: string;
    videoUrl?: string;
    imageUrl?: string;
  }>({});

  // Update form data when movie data is loaded
  useEffect(() => {
    if (existingMovie) {
      setFormData({
        title: existingMovie.title || "",
        image: existingMovie.image || "",
        video: existingMovie.video || "",
        isVip: existingMovie.isVip || false,
        views: existingMovie.views || 0,
        category: existingMovie.category || "new",
        genres: existingMovie.genres || [],
        year: existingMovie.year || new Date().getFullYear(),
        country: existingMovie.country || "",
        language: existingMovie.language || "ئۇيغۇرچە",
        dateAdded: existingMovie.dateAdded || "",
        description: existingMovie.description || "",
      });
      setPreviewFiles({
        videoUrl: existingMovie.video,
        imageUrl: existingMovie.image,
      });
    }
  }, [existingMovie]);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const newValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleGenreToggle = (genreId: string) => {
    setFormData((prev) => ({
      ...prev,
      genres: prev.genres?.includes(genreId)
        ? prev.genres.filter((g) => g !== genreId)
        : [...(prev.genres || []), genreId],
    }));
  };

  const uploadFile = async (file: File, type: "video" | "image") => {
    try {
      setUploadProgress((prev) => ({ ...prev, [type]: true }));

      const formDataToSend = new FormData();
      formDataToSend.append(type, file);

      const response = await fetch(`/api/upload/${type}`, {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error(`Failed to upload ${type}`);
      }

      const result = await response.json();

      if (result.success) {
        setFormData((prev) => ({
          ...prev,
          [type]: result.data.url,
        }));

        setPreviewFiles((prev) => ({
          ...prev,
          [`${type}Name`]: file.name,
          [`${type}Url`]: result.data.url,
        }));

        setError("");
      } else {
        const errorMsg = result.details || result.error || `Failed to upload ${type}`;
        throw new Error(errorMsg);
      }
    } catch (err) {
      setError(`خاتالىق: ${err instanceof Error ? err.message : "فايل يۆتكىلىپ بېرىشتە خاتالىق"}`);
    } finally {
      setUploadProgress((prev) => ({ ...prev, [type]: false }));
    }
  };

  const handleVideoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await uploadFile(file, "video");
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await uploadFile(file, "image");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate required fields
    if (!formData.title) {
      setError("فىلىم ئسمى مەجبۇرى");
      return;
    }
    if (!formData.image) {
      setError("فىلىم سۇرىتى مەجبۇرى");
      return;
    }
    if (!formData.video) {
      setError("فىلىم ۋىدېوسى مەجبۇرى");
      return;
    }

    try {
      setUploading(true);

      if (isEditing && id) {
        // Update existing movie
        await updateMovie(id, formData);
        setSuccess("فىلىم مۇۋەپپەقىيەتلىك ياڭىلاندى");
      } else {
        // Create new movie
        await createMovie(formData);
        setSuccess("فىلىم مۇۋەپپەقىيەتلىك قوشۇلدى");
      }

      setTimeout(() => {
        navigate("/admin/movies");
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "خاتالىق كۆرۈندى");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy via-navy to-navy/95">
      {/* Header */}
      <header className="bg-navy border-b border-pink/20 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/admin/movies")}
            className="flex items-center gap-2 text-pink hover:text-pink/80 font-semibold"
          >
            <ArrowLeft size={20} />
            بەتكە قايت
          </button>
          <h1 className="text-2xl font-bold text-white">
            {isEditing ? "فىلىم تەھرىرلە" : "يېڭى فىلىم قوش"}
          </h1>
          <div className="w-20"></div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-navy/50 border border-pink/20 rounded-lg p-8">
          {/* Messages */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500 rounded text-red-400">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500 rounded text-green-400">
              {success}
            </div>
          )}

          {/* Video Upload */}
          <div className="mb-8 p-6 border border-pink/30 rounded-lg bg-navy/30">
            <label className="block text-sm font-medium text-pink mb-4">
              فىلىم ۋىدېوسى *
            </label>
            <div className="relative">
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
                disabled={uploadProgress.video}
                className="hidden"
                id="video-input"
              />
              <label
                htmlFor="video-input"
                className="flex items-center justify-center w-full p-8 border-2 border-dashed border-pink/50 rounded-lg cursor-pointer hover:border-pink transition-colors"
              >
                <div className="text-center">
                  {uploadProgress.video ? (
                    <div className="flex flex-col items-center gap-2">
                      <Loader className="animate-spin text-pink" size={32} />
                      <p className="text-pink">يۆتكىلىۋاتىدۇ...</p>
                    </div>
                  ) : (
                    <>
                      <Upload className="mx-auto mb-2 text-pink" size={32} />
                      <p className="text-white font-medium">ۋىدېو فايلىنى تاللاڭ</p>
                      <p className="text-gray-400 text-sm">ياكى بۇيەرگە تۈشۈرۈڭ</p>
                    </>
                  )}
                </div>
              </label>
            </div>
            {previewFiles.videoUrl && (
              <div className="mt-4 p-4 bg-green-500/10 border border-green-500 rounded">
                <p className="text-green-400 text-sm">✓ ۋىدېو يۆتكىلىندى</p>
                <p className="text-gray-300 text-xs mt-1">{previewFiles.videoName}</p>
              </div>
            )}
          </div>

          {/* Image Upload */}
          <div className="mb-8 p-6 border border-pink/30 rounded-lg bg-navy/30">
            <label className="block text-sm font-medium text-pink mb-4">
              سۇرەت (پوستېر) *
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                disabled={uploadProgress.image}
                className="hidden"
                id="image-input"
              />
              <label
                htmlFor="image-input"
                className="flex items-center justify-center w-full p-8 border-2 border-dashed border-pink/50 rounded-lg cursor-pointer hover:border-pink transition-colors"
              >
                <div className="text-center">
                  {uploadProgress.image ? (
                    <div className="flex flex-col items-center gap-2">
                      <Loader className="animate-spin text-pink" size={32} />
                      <p className="text-pink">يۆتكىلىۋاتىدۇ...</p>
                    </div>
                  ) : (
                    <>
                      <Upload className="mx-auto mb-2 text-pink" size={32} />
                      <p className="text-white font-medium">سۇرەت فايلىنى تاللاڭ</p>
                      <p className="text-gray-400 text-sm">ياكى بۇيەرگە تۈشۈرۈڭ</p>
                    </>
                  )}
                </div>
              </label>
            </div>
            {previewFiles.imageUrl && (
              <div className="mt-4 flex gap-4">
                <img
                  src={previewFiles.imageUrl}
                  alt="Preview"
                  className="h-32 w-24 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="text-green-400 text-sm">✓ سۇرەت يۆتكىلىندى</p>
                  <p className="text-gray-300 text-xs mt-1">{previewFiles.imageName}</p>
                </div>
              </div>
            )}
          </div>

          {/* Two column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Left column */}
            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-pink mb-2">
                  فىلىم ئسمى *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title || ""}
                  onChange={handleInputChange}
                  placeholder="فىلىم ئسمىنى كىرگۈزۈڭ"
                  className="w-full bg-navy/50 border border-pink/30 rounded px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-pink"
                />
              </div>

              {/* Year */}
              <div>
                <label className="block text-sm font-medium text-pink mb-2">
                  فىلىم يىلى
                </label>
                <input
                  type="number"
                  name="year"
                  value={formData.year || ""}
                  onChange={handleInputChange}
                  placeholder="2024"
                  className="w-full bg-navy/50 border border-pink/30 rounded px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-pink"
                />
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm font-medium text-pink mb-2">
                  فىلىم رايۇنى
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country || ""}
                  onChange={handleInputChange}
                  placeholder="شىنجاڭ"
                  className="w-full bg-navy/50 border border-pink/30 rounded px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-pink"
                />
              </div>

              {/* Language */}
              <div>
                <label className="block text-sm font-medium text-pink mb-2">
                  فىلىم تىلى
                </label>
                <input
                  type="text"
                  name="language"
                  value={formData.language || ""}
                  onChange={handleInputChange}
                  placeholder="ئۇيغۇرچە"
                  className="w-full bg-navy/50 border border-pink/30 rounded px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-pink"
                />
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-6">
              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-pink mb-2">
                  توپ
                </label>
                <select
                  name="category"
                  value={formData.category || ""}
                  onChange={handleInputChange}
                  className="w-full bg-navy/50 border border-pink/30 rounded px-4 py-2 text-white focus:outline-none focus:border-pink"
                >
                  {movieCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.uyghur}
                    </option>
                  ))}
                </select>
              </div>

              {/* Views */}
              <div>
                <label className="block text-sm font-medium text-pink mb-2">
                  كۆرۈشلار
                </label>
                <input
                  type="number"
                  name="views"
                  value={formData.views || 0}
                  onChange={handleInputChange}
                  placeholder="0"
                  className="w-full bg-navy/50 border border-pink/30 rounded px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-pink"
                />
              </div>

              {/* Date Added */}
              <div>
                <label className="block text-sm font-medium text-pink mb-2">
                  يوللانغان ۋاقتى
                </label>
                <input
                  type="date"
                  name="dateAdded"
                  value={formData.dateAdded || ""}
                  onChange={handleInputChange}
                  className="w-full bg-navy/50 border border-pink/30 rounded px-4 py-2 text-white focus:outline-none focus:border-pink"
                />
              </div>

              {/* VIP */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="isVip"
                  checked={formData.isVip || false}
                  onChange={handleInputChange}
                  className="w-5 h-5 accent-pink cursor-pointer"
                />
                <label className="text-pink font-medium cursor-pointer">
                  VIP فىلىمى
                </label>
              </div>
            </div>
          </div>

          {/* Genres */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-pink mb-4">
              ژانۇس
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {genres.map((genre) => (
                <label
                  key={genre.id}
                  className="flex items-center gap-2 cursor-pointer text-gray-300 hover:text-white"
                >
                  <input
                    type="checkbox"
                    checked={formData.genres?.includes(genre.id) || false}
                    onChange={() => handleGenreToggle(genre.id)}
                    className="w-4 h-4 accent-pink"
                  />
                  {genre.uyghur}
                </label>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-pink mb-2">
              تېسىپپى
            </label>
            <textarea
              name="description"
              value={formData.description || ""}
              onChange={handleInputChange}
              placeholder="فىلىمنىڭ تېسىپپىسىنى كىرگۈزۈڭ"
              rows={4}
              className="w-full bg-navy/50 border border-pink/30 rounded px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-pink"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={uploading}
              className="flex items-center gap-2 bg-pink hover:bg-pink/90 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-2 rounded-lg font-semibold transition-colors"
            >
              {uploading ? <Loader className="animate-spin" size={20} /> : <Save size={20} />}
              {isEditing ? "ياڭىلا" : "قوش"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/movies")}
              className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-2 rounded-lg font-semibold transition-colors"
            >
              بىكار قىل
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
