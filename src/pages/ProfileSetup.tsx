import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp, UserProfile } from "@/contexts/AppContext";
import { ArrowLeft, ArrowRight, Shield, CheckCircle2 } from "lucide-react";
import { indianStates } from "@/data/mockData";
import { translations } from "@/data/translations";

const ProfileSetup = () => {
  const navigate = useNavigate();
  const { setUserProfile, language } = useApp();
  const [step, setStep] = useState(1);
  
  const t = translations[language].profile;

  const incomeRanges = [
    translations[language].language === "hi" ? "Below ₹1 lakh" : "Below ₹1 lakh", // I should probably translate these too but for now let's keep it simple
    "Below ₹1 lakh",
    "₹1 lakh – ₹2.5 lakh",
    "₹2.5 lakh – ₹5 lakh",
    "₹5 lakh – ₹10 lakh",
    "Above ₹10 lakh",
  ];

  const occupations = [
    { id: "Farmer", label: t.farmer },
    { id: "Student", label: t.student },
    { id: "Unemployed", label: t.unemployed },
    { id: "Self-employed", label: t.selfEmployed },
    { id: "Other", label: t.other }
  ];

  const categories = ["General", "OBC", "SC", "ST"];
  const genders = [
    { id: "Male", label: t.male },
    { id: "Female", label: t.female },
    { id: "Other", label: t.other }
  ];

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
          <h2 className="text-lg font-bold text-foreground">{t.setup}</h2>
          <p className="text-xs text-muted-foreground">{t.step} {step} of 2</p>
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
              <span className="font-semibold text-foreground text-sm">{t.personalDetails}</span>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">{t.fullName} *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder={t.enterFullName}
                className="w-full bg-card border border-input rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* Age */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">{t.age} *</label>
              <input
                type="number"
                value={form.age}
                onChange={(e) => updateField("age", e.target.value)}
                placeholder={t.enterAge}
                min="1"
                max="120"
                className="w-full bg-card border border-input rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">{t.gender} *</label>
              <div className="flex gap-2">
                {genders.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => updateField("gender", g.id)}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-medium border-2 transition-all
                      ${form.gender === g.id
                        ? "border-primary bg-saffron-light text-primary"
                        : "border-border bg-card text-muted-foreground hover:border-primary/30"
                      }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            {/* State */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">{t.state} *</label>
              <select
                value={form.state}
                onChange={(e) => updateField("state", e.target.value)}
                className="w-full bg-card border border-input rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring appearance-none"
              >
                <option value="">{t.selectState}</option>
                {indianStates.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* District */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">{t.district}</label>
              <input
                type="text"
                value={form.district}
                onChange={(e) => updateField("district", e.target.value)}
                placeholder={t.enterDistrict}
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
              {t.next} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-7 h-7 rounded-full gradient-green flex items-center justify-center text-secondary-foreground text-xs font-bold">2</span>
              <span className="font-semibold text-foreground text-sm">{t.economicDetails}</span>
            </div>

            {/* Occupation */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">{t.occupation} *</label>
              <div className="grid grid-cols-2 gap-2">
                {occupations.map((o) => (
                  <button
                    key={o.id}
                    onClick={() => updateField("occupation", o.id)}
                    className={`py-2.5 px-3 rounded-lg text-sm font-medium border-2 transition-all
                      ${form.occupation === o.id
                        ? "border-secondary bg-green-light text-secondary"
                        : "border-border bg-card text-muted-foreground hover:border-secondary/30"
                      }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Annual Income */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">{t.income} *</label>
              <select
                value={form.annualIncome}
                onChange={(e) => updateField("annualIncome", e.target.value)}
                className="w-full bg-card border border-input rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring appearance-none"
              >
                <option value="">{t.selectIncome}</option>
                {incomeRanges.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">{t.category}</label>
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
              {t.complete}
            </button>
          </div>
        )}

        {/* Privacy */}
        <div className="flex items-center gap-2 mt-8 px-4 py-3 rounded-lg bg-green-light">
          <Shield className="w-4 h-4 text-secondary flex-shrink-0" />
          <p className="text-xs text-foreground">
            {t.privacy}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;
