import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { mockSchemes } from "@/data/mockData";
import SchemeCard from "@/components/SchemeCard";
import { ChevronLeft, Star } from "lucide-react";
import { translations } from "@/data/translations";

const Recommendations = () => {
  const { userProfile, language } = useApp();
  const navigate = useNavigate();
  const t = translations[language].dashboard;

  const recommendedSchemes = mockSchemes.filter((s) => {
    if (!userProfile?.occupation) return true;
    const occ = userProfile.occupation.toLowerCase();
    if (occ === "farmer") return s.category === "farmer";
    if (occ === "student") return s.category === "student";
    if (occ === "unemployed") return s.category === "employment";
    return true;
  });

  return (
    <div className="min-h-screen bg-background pb-12">
      <div className="gradient-navy px-4 py-6 sticky top-0 z-10 flex items-center gap-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-xl font-bold text-white">
          {t.recommended}
        </h1>
      </div>

      <div className="px-4 mt-6 max-w-lg mx-auto">
        <div className="flex items-center gap-2 mb-6 p-4 bg-primary/5 rounded-2xl border border-primary/10">
          <Star className="w-5 h-5 text-primary" />
          <p className="text-sm text-muted-foreground">
            {language === "hi" 
              ? "ये योजनाएं आपके प्रोफाइल के आधार पर चुनी गई हैं।" 
              : "These schemes are selected based on your profile."}
          </p>
        </div>

        <div className="space-y-4">
          {recommendedSchemes.map((scheme) => (
            <SchemeCard key={scheme.id} scheme={scheme} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
