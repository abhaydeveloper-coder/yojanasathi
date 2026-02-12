import { useApp } from "@/contexts/AppContext";
import { translations } from "@/data/translations";
import { Bookmark } from "lucide-react";

const SavedSchemes = () => {
  const { language } = useApp();
  const t = translations[language].dashboard;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">{t.saved}</h1>
      <div className="bg-white rounded-xl p-12 text-center border border-dashed border-slate-300">
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <Bookmark className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-medium text-slate-900 mb-2">No saved schemes yet</h3>
        <p className="text-slate-500">Schemes you save will appear here for quick access.</p>
      </div>
    </div>
  );
};

export default SavedSchemes;
