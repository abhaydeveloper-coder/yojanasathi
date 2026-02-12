import { ArrowLeftRight } from "lucide-react";

const Compare = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Compare Schemes</h1>
      <div className="bg-white p-12 rounded-xl text-center border border-dashed border-slate-300">
        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <ArrowLeftRight className="w-8 h-8 text-blue-500" />
        </div>
        <h3 className="text-lg font-medium text-slate-900 mb-2">Select Schemes to Compare</h3>
        <p className="text-slate-500 max-w-md mx-auto">
          Choose up to 3 schemes to view their benefits, eligibility, and application process side-by-side.
        </p>
        <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
          Select Schemes
        </button>
      </div>
    </div>
  );
};

export default Compare;
