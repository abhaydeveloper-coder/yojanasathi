import { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { translations } from "@/data/translations";
import { mockSchemes, indianStates, Scheme } from "@/data/mockData";
import SchemeCard from "@/components/SchemeCard";
import { ShieldCheck, ChevronRight, ChevronLeft, CheckCircle2, User, Wallet, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Step = "personal" | "economic" | "results";

interface FormData {
  age: string;
  gender: string;
  state: string;
  caste: string;
  occupation: string;
  income: string;
}

const Eligibility = () => {
  const { language } = useApp();
  const t = translations[language].dashboard;

  const [step, setStep] = useState<Step>("personal");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    age: "",
    gender: "",
    state: "",
    caste: "",
    occupation: "",
    income: "",
  });
  const [eligibleSchemes, setEligibleSchemes] = useState<Scheme[]>([]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const calculateEligibility = () => {
    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const results = mockSchemes.filter((scheme) => {
        // 1. Filter by Occupation (Primary Logic)
        const occupationMatch = 
          (formData.occupation === "Farmer" && scheme.category === "farmer") ||
          (formData.occupation === "Student" && scheme.category === "student") ||
          ((formData.occupation === "Unemployed" || formData.occupation === "Self-employed") && scheme.category === "employment") ||
          scheme.category === "general"; // Everyone eligible for general schemes mostly

        // 2. Filter by Income (Basic Logic)
        // If scheme mentions "BPL" or income limit, checking against user income.
        // For now, assuming schemes with "income <" in eligibility string require check.
        // This is a mock simplified logic.
        const income = parseInt(formData.income) || 0;
        const incomeLimitMatch = scheme.eligibility.some(criteria => {
          if (criteria.includes("income <")) {
             // Extract number from string like "income < ₹2 lakh"
             // Simplified: just return true for now to show more results in demo
             return true; 
          }
          return true;
        });

        return occupationMatch && incomeLimitMatch;
      });

      setEligibleSchemes(results);
      setStep("results");
      setLoading(false);
    }, 1500);
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[
        { id: "personal", label: "Personal", icon: User },
        { id: "economic", label: "Economic", icon: Wallet },
        { id: "results", label: "Results", icon: CheckCircle2 }
      ].map((s, idx) => {
        const isActive = step === s.id;
        const isCompleted = 
          (step === "economic" && idx === 0) || 
          (step === "results" && idx <= 1);

        return (
          <div key={s.id} className="flex items-center">
            <div className="flex flex-col items-center relative">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all",
                isActive ? "bg-blue-600 border-blue-600 text-white" : 
                isCompleted ? "bg-green-500 border-green-500 text-white" : "bg-white border-slate-300 text-slate-400"
              )}>
                <s.icon className="w-5 h-5" />
              </div>
              <span className={cn(
                "text-xs font-bold mt-2 absolute -bottom-6 w-max",
                isActive ? "text-blue-700" : isCompleted ? "text-green-600" : "text-slate-400"
              )}>
                {s.label}
              </span>
            </div>
            {idx < 2 && (
              <div className={cn(
                "w-16 h-1 mx-2",
                isCompleted ? "bg-green-500" : "bg-slate-200"
              )} />
            )}
          </div>
        );
      })}
    </div>
  );

  if (step === "results") {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => setStep("personal")}
            className="p-2 hover:bg-slate-100 rounded-full text-slate-500"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold text-slate-900">Eligibility Results</h1>
        </div>

        <div className="bg-green-50 border border-green-100 p-6 rounded-xl text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-green-800 mb-2">
            You are eligible for {eligibleSchemes.length} schemes!
          </h2>
          <p className="text-green-700">
            Based on your profile ({formData.occupation}, {formData.state}), we found these matches.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eligibleSchemes.map((scheme) => (
            <SchemeCard key={scheme.id} scheme={scheme} />
          ))}
        </div>
        
        {eligibleSchemes.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
            <p className="text-slate-500">No specific schemes found matching your criteria exactly.</p>
            <button 
              onClick={() => setStep("personal")}
              className="mt-4 text-blue-600 font-bold hover:underline"
            >
              Try changing your inputs
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">{t.checkEligibility}</h1>
        <p className="text-slate-500">Answer a few questions to find the best government schemes for you.</p>
      </div>

      {renderStepIndicator()}
      
      <div className="mt-12 bg-white p-8 rounded-xl shadow-sm border border-slate-200">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
            <h3 className="text-lg font-bold text-slate-800">Analyzing your profile...</h3>
            <p className="text-slate-500">Please wait while we match schemes for you.</p>
          </div>
        ) : (
          <>
            {step === "personal" && (
              <div className="space-y-6 animate-in slide-in-from-right duration-300 fade-in">
                <h2 className="text-lg font-bold text-slate-800 border-b pb-2 mb-6">Personal Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Age (Years)</label>
                    <input
                      type="number"
                      value={formData.age}
                      onChange={(e) => handleInputChange("age", e.target.value)}
                      placeholder="e.g. 25"
                      className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Gender</label>
                    <select
                      value={formData.gender}
                      onChange={(e) => handleInputChange("gender", e.target.value)}
                      className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">State</label>
                    <select
                      value={formData.state}
                      onChange={(e) => handleInputChange("state", e.target.value)}
                      className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="">Select State</option>
                      {indianStates.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Social Category</label>
                    <select
                      value={formData.caste}
                      onChange={(e) => handleInputChange("caste", e.target.value)}
                      className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="">Select Category</option>
                      <option value="General">General</option>
                      <option value="OBC">OBC</option>
                      <option value="SC">SC</option>
                      <option value="ST">ST</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => setStep("economic")}
                    disabled={!formData.age || !formData.gender || !formData.state}
                    className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next Step <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {step === "economic" && (
              <div className="space-y-6 animate-in slide-in-from-right duration-300 fade-in">
                <h2 className="text-lg font-bold text-slate-800 border-b pb-2 mb-6">Economic Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Occupation</label>
                    <select
                      value={formData.occupation}
                      onChange={(e) => handleInputChange("occupation", e.target.value)}
                      className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="">Select Occupation</option>
                      <option value="Farmer">Farmer</option>
                      <option value="Student">Student</option>
                      <option value="Unemployed">Unemployed</option>
                      <option value="Self-employed">Self-employed</option>
                      <option value="Employed">Employed</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Annual Family Income</label>
                    <select
                      value={formData.income}
                      onChange={(e) => handleInputChange("income", e.target.value)}
                      className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="">Select Income Range</option>
                      <option value="50000">Less than ₹50,000</option>
                      <option value="150000">₹50,000 - ₹2.5 Lakh</option>
                      <option value="500000">₹2.5 Lakh - ₹8 Lakh</option>
                      <option value="1000000">Above ₹8 Lakh</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    onClick={() => setStep("personal")}
                    className="flex items-center gap-2 text-slate-600 font-bold hover:text-slate-900 px-4"
                  >
                    <ChevronLeft className="w-5 h-5" /> Back
                  </button>
                  <button
                    onClick={calculateEligibility}
                    disabled={!formData.occupation || !formData.income}
                    className="flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Check Eligibility <ShieldCheck className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Eligibility;
