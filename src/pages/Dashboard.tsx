import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { mockSchemes, Scheme } from "@/data/mockData";
import SchemeCard from "@/components/SchemeCard";
import ChatAssistant from "@/components/ChatAssistant";
import { Search, Sprout, GraduationCap, Briefcase, Heart, Star, LogOut } from "lucide-react";

type CategoryFilter = "all" | "farmer" | "student" | "employment" | "general";

const categoryTabs: { key: CategoryFilter; label: string; icon: React.ReactNode; color: string }[] = [
  { key: "all", label: "All", icon: <Star className="w-4 h-4" />, color: "gradient-saffron" },
  { key: "farmer", label: "Farmer", icon: <Sprout className="w-4 h-4" />, color: "gradient-green" },
  { key: "student", label: "Student", icon: <GraduationCap className="w-4 h-4" />, color: "gradient-navy" },
  { key: "employment", label: "Jobs", icon: <Briefcase className="w-4 h-4" />, color: "gradient-saffron" },
  { key: "general", label: "Health", icon: <Heart className="w-4 h-4" />, color: "bg-destructive" },
];

const Dashboard = () => {
  const { userProfile } = useApp();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const firstName = userProfile?.name?.split(" ")[0] || "Guest";

  const filteredSchemes = mockSchemes.filter((scheme) => {
    const matchesCategory = activeFilter === "all" || scheme.category === activeFilter;
    const matchesSearch =
      !searchQuery ||
      scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Recommend schemes based on occupation
  const recommendedSchemes = mockSchemes.filter((s) => {
    if (!userProfile?.occupation) return true;
    const occ = userProfile.occupation.toLowerCase();
    if (occ === "farmer") return s.category === "farmer";
    if (occ === "student") return s.category === "student";
    if (occ === "unemployed") return s.category === "employment";
    return true;
  });

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="gradient-navy px-4 pt-6 pb-8 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4 max-w-lg mx-auto">
          <div>
            <p className="text-navy-foreground/70 text-xs">Welcome back 👋</p>
            <h1 className="text-xl font-bold text-navy-foreground">
              Hello, {firstName}!
            </h1>
          </div>
          <button
            onClick={() => navigate("/")}
            className="w-9 h-9 rounded-full bg-navy-foreground/10 flex items-center justify-center hover:bg-navy-foreground/20 transition-colors"
            title="Logout"
          >
            <LogOut className="w-4 h-4 text-navy-foreground" />
          </button>
        </div>

        {/* Search */}
        <div className="relative max-w-lg mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search government schemes..."
            className="w-full bg-card rounded-xl pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring shadow-card"
          />
        </div>
      </div>

      <div className="px-4 max-w-lg mx-auto">
        {/* Stats Summary */}
        <div className="flex gap-3 -mt-4 mb-6">
          <div className="flex-1 bg-card rounded-xl shadow-card p-3 text-center">
            <p className="text-2xl font-bold text-primary">{mockSchemes.length}</p>
            <p className="text-[10px] text-muted-foreground">Total Schemes</p>
          </div>
          <div className="flex-1 bg-card rounded-xl shadow-card p-3 text-center">
            <p className="text-2xl font-bold text-secondary">{recommendedSchemes.length}</p>
            <p className="text-[10px] text-muted-foreground">For You</p>
          </div>
          <div className="flex-1 bg-card rounded-xl shadow-card p-3 text-center">
            <p className="text-2xl font-bold text-accent">4</p>
            <p className="text-[10px] text-muted-foreground">Categories</p>
          </div>
        </div>

        {/* Recommended Section */}
        {userProfile?.occupation && (
          <div className="mb-6">
            <h2 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
              <Star className="w-4 h-4 text-primary" />
              Recommended for You
            </h2>
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-none">
              {recommendedSchemes.slice(0, 3).map((scheme) => (
                <div key={scheme.id} className="min-w-[260px] flex-shrink-0">
                  <SchemeCard scheme={scheme} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-none -mx-1 px-1">
          {categoryTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all
                ${activeFilter === tab.key
                  ? `${tab.color} text-primary-foreground shadow-sm`
                  : "bg-card border border-border text-muted-foreground hover:border-primary/30"
                }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* All Schemes */}
        <h2 className="text-sm font-bold text-foreground mb-3">
          {activeFilter === "all" ? "All Schemes" : `${categoryTabs.find((t) => t.key === activeFilter)?.label} Schemes`}
          <span className="ml-2 text-xs font-normal text-muted-foreground">({filteredSchemes.length})</span>
        </h2>

        <div className="space-y-3">
          {filteredSchemes.map((scheme) => (
            <SchemeCard key={scheme.id} scheme={scheme} />
          ))}
        </div>

        {filteredSchemes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-sm">No schemes found matching your search.</p>
          </div>
        )}
      </div>

      {/* Chat Assistant */}
      <ChatAssistant />
    </div>
  );
};

export default Dashboard;
