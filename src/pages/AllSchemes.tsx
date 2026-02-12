import { mockSchemes } from "@/data/mockData";
import SchemeCard from "@/components/SchemeCard";
import { useApp } from "@/contexts/AppContext";
import { translations } from "@/data/translations";

const AllSchemes = () => {
  const { language } = useApp();
  const t = translations[language].dashboard;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">{t.allSchemes}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockSchemes.map((scheme) => (
          <SchemeCard key={scheme.id} scheme={scheme} />
        ))}
      </div>
    </div>
  );
};

export default AllSchemes;
