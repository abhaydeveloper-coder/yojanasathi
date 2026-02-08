import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { Globe, Languages } from "lucide-react";
import logo from "@/assets/logo.png";

const languages = [
  { code: "en", label: "English", icon: "🇬🇧" },
  { code: "hi", label: "हिंदी", sublabel: "Hindi", icon: "🇮🇳" },
  { code: "rg", label: "Regional", sublabel: "Coming soon", icon: "🌐" },
];

const Welcome = () => {
  const navigate = useNavigate();
  const { setLanguage } = useApp();

  const handleSelect = (code: string) => {
    if (code === "rg") return; // placeholder
    setLanguage(code);
    navigate("/login");
  };

  return (
    <div className="min-h-screen gradient-hero flex flex-col items-center justify-center px-4 py-8">
      {/* Decorative top stripe */}
      <div className="fixed top-0 left-0 right-0 h-1.5 flex">
        <div className="flex-1 gradient-saffron" />
        <div className="flex-1 bg-card" />
        <div className="flex-1 gradient-green" />
      </div>

      <div className="w-full max-w-sm flex flex-col items-center animate-slide-up">
        {/* Logo */}
        <div className="mb-6 relative">
          <div className="w-28 h-28 rounded-full bg-card shadow-card flex items-center justify-center overflow-hidden">
            <img src={logo} alt="YojanaSathi Logo" className="w-20 h-20 object-contain" />
          </div>
        </div>

        {/* App Name */}
        <h1 className="text-3xl font-bold text-foreground tracking-tight mb-1">
          Yojana<span className="text-gradient-saffron">Sathi</span>
        </h1>
        <p className="text-muted-foreground text-sm mb-1">योजनासाथी</p>
        <p className="text-muted-foreground text-center text-sm mb-10 max-w-[260px]">
          Your Guide to Government Schemes
        </p>

        {/* Language Selection */}
        <div className="w-full space-y-3 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Languages className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Choose your language</span>
          </div>

          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              disabled={lang.code === "rg"}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-lg border-2 transition-all duration-200 
                ${lang.code === "rg"
                  ? "border-border bg-muted/50 opacity-60 cursor-not-allowed"
                  : "border-border bg-card hover:border-primary hover:shadow-card-hover active:scale-[0.98] cursor-pointer"
                }`}
            >
              <span className="text-2xl">{lang.icon}</span>
              <div className="text-left">
                <span className="font-semibold text-foreground text-base">{lang.label}</span>
                {lang.sublabel && (
                  <span className="block text-xs text-muted-foreground">{lang.sublabel}</span>
                )}
              </div>
              {lang.code !== "rg" && (
                <svg className="w-5 h-5 ml-auto text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            🇮🇳 Built for every citizen of India
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
