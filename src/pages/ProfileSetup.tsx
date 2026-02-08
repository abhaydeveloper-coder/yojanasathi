import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp, UserProfile } from "@/contexts/AppContext";
import { ArrowLeft, ArrowRight, Shield, CheckCircle2 } from "lucide-react";
import { indianStates } from "@/data/mockData";

const incomeRanges = [
  "Below ₹1 lakh",
  "₹1 lakh – ₹2.5 lakh",
  "₹2.5 lakh – ₹5 lakh",
  "₹5 lakh – ₹10 lakh",
  "Above ₹10 lakh",
];

const occupations = ["Farmer", "Student", "Unemployed", "Self-employed", "Other"];
const categories = ["General", "OBC", "SC", "ST"];
const genders = ["Male", "Female", "Other"];

const ProfileSetup = () => {
  const navigate = useNavigate();
  const { setUserProfile } = useApp();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<UserProfile>({
    name: "",
    age: "",
    gender: "",
    state: "",
    district: "",
    annualIncome: "",
    occupation: "",
    category: "",
  });

  const updateField = (field: keyof UserProfile, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => setStep(2);
  const handleBack = () => (step === 1 ? navigate("/login") : setStep(1));

  const handleSubmit = () => {
    setUserProfile({ ...form, name: form.name || "Guest User" });
    navigate("/dashboard");
  };

  const isStep1Valid = form.name && form.age && form.gender && form.state;
  const isStep2Valid = form.occupation && form.annualIncome;

  return (
    <div className="min-h-screen gradient-hero flex flex-col px-4 py-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={handleBack}
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="flex-1">
          <h2 className="text-lg font-bold text-foreground">Profile Setup</h2>
          <p className="text-xs text-muted-foreground">Step {step} of 2</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="flex gap-2 mb-8">
        <div className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${step >= 1 ? "gradient-saffron" : "bg-muted"}`} />
        <div className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${step >= 2 ? "gradient-green" : "bg-muted"}`} />
      </div>

      <div className="flex-1 w-full max-w-sm mx-auto animate-fade-in">
        {step === 1 ? (
          <div className="space-y-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-7 h-7 rounded-full gradient-saffron flex items-center justify-center text-primary-foreground text-xs font-bold">1</span>
              <span className="font-semibold text-foreground text-sm">Personal Details</span>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Full Name *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="Enter your full name"
                className="w-full bg-card border border-input rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* Age */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Age *</label>
              <input
                type="number"
                value={form.age}
                onChange={(e) => updateField("age", e.target.value)}
                placeholder="Enter your age"
                min="1"
                max="120"
                className="w-full bg-card border border-input rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Gender *</label>
              <div className="flex gap-2">
                {genders.map((g) => (
                  <button
                    key={g}
                    onClick={() => updateField("gender", g)}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-medium border-2 transition-all
                      ${form.gender === g
                        ? "border-primary bg-saffron-light text-primary"
                        : "border-border bg-card text-muted-foreground hover:border-primary/30"
                      }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* State */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">State *</label>
              <select
                value={form.state}
                onChange={(e) => updateField("state", e.target.value)}
                className="w-full bg-card border border-input rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring appearance-none"
              >
                <option value="">Select your state</option>
                {indianStates.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* District */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">District</label>
              <input
                type="text"
                value={form.district}
                onChange={(e) => updateField("district", e.target.value)}
                placeholder="Enter your district"
                className="w-full bg-card border border-input rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <button
              onClick={handleNext}
              disabled={!isStep1Valid}
              className={`w-full flex items-center justify-center gap-2 font-semibold py-3.5 rounded-lg transition-all text-sm mt-4
                ${isStep1Valid
                  ? "gradient-saffron text-primary-foreground hover:opacity-90 active:scale-[0.98]"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
            >
              Next <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-7 h-7 rounded-full gradient-green flex items-center justify-center text-secondary-foreground text-xs font-bold">2</span>
              <span className="font-semibold text-foreground text-sm">Economic & Social Details</span>
            </div>

            {/* Occupation */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Occupation *</label>
              <div className="grid grid-cols-2 gap-2">
                {occupations.map((o) => (
                  <button
                    key={o}
                    onClick={() => updateField("occupation", o)}
                    className={`py-2.5 px-3 rounded-lg text-sm font-medium border-2 transition-all
                      ${form.occupation === o
                        ? "border-secondary bg-green-light text-secondary"
                        : "border-border bg-card text-muted-foreground hover:border-secondary/30"
                      }`}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>

            {/* Annual Income */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Annual Income *</label>
              <select
                value={form.annualIncome}
                onChange={(e) => updateField("annualIncome", e.target.value)}
                className="w-full bg-card border border-input rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring appearance-none"
              >
                <option value="">Select income range</option>
                {incomeRanges.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Category</label>
              <div className="flex gap-2 flex-wrap">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => updateField("category", c)}
                    className={`py-2 px-4 rounded-lg text-sm font-medium border-2 transition-all
                      ${form.category === c
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-border bg-card text-muted-foreground hover:border-accent/30"
                      }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!isStep2Valid}
              className={`w-full flex items-center justify-center gap-2 font-semibold py-3.5 rounded-lg transition-all text-sm mt-4
                ${isStep2Valid
                  ? "gradient-green text-secondary-foreground hover:opacity-90 active:scale-[0.98]"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              Complete Setup
            </button>
          </div>
        )}

        {/* Privacy */}
        <div className="flex items-center gap-2 mt-8 px-4 py-3 rounded-lg bg-green-light">
          <Shield className="w-4 h-4 text-secondary flex-shrink-0" />
          <p className="text-xs text-foreground">
            Your information is used only to suggest relevant government schemes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;
