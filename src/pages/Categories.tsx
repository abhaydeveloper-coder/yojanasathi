import { useApp } from "@/contexts/AppContext";
import { translations } from "@/data/translations";
import { Sprout, GraduationCap, Briefcase, Heart, Star } from "lucide-react";

const Categories = () => {
  const { language } = useApp();
  const t = translations[language].dashboard;

  const categories = [
    { key: "farmer", label: translations[language].profile.farmer, icon: <Sprout className="w-8 h-8" />, color: "bg-green-100 text-green-700" },
    { key: "student", label: translations[language].profile.student, icon: <GraduationCap className="w-8 h-8" />, color: "bg-purple-100 text-purple-700" },
    { key: "employment", label: t.jobs, icon: <Briefcase className="w-8 h-8" />, color: "bg-orange-100 text-orange-700" },
    { key: "general", label: t.health, icon: <Heart className="w-8 h-8" />, color: "bg-red-100 text-red-700" },
    { key: "all", label: t.all, icon: <Star className="w-8 h-8" />, color: "bg-blue-100 text-blue-700" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">{t.categories}</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div key={cat.key} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all cursor-pointer flex flex-col items-center text-center gap-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${cat.color}`}>
              {cat.icon}
            </div>
            <h3 className="font-semibold text-slate-900">{cat.label}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
