import Header from "@/components/Header";

export default function Cartoons() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-navy via-navy to-navy/95">
      <Header />

      <div className="container mx-auto px-4 py-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-6">كارتون</h1>
          <p className="text-xl text-gray-400 mb-8">
            ھازىرچە مايدىلى كۇنى قوشۇلاتتۇ. باشقا سېكتىسىنى كۆرۈڭ!
          </p>
          <div className="text-pink text-lg font-semibold">
            ساتالدىق مايدىلى ۋۇجۇدى يوق
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-navy/50 border-t border-pink/20 py-8 mt-16 absolute bottom-0 w-full">
        <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
          <p>© 2024 سازكىنو تورى. بارلىق ھوقۇقلار قورۇقلانغان.</p>
          <p className="mt-2">www.sazkino.com</p>
        </div>
      </footer>
    </div>
  );
}
