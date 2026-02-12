import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { mockSchemes } from "@/data/mockData";
import SchemeCard from "@/components/SchemeCard";
import StatCard from "@/components/dashboard/StatCard";
import QuickActionButton from "@/components/dashboard/QuickActionButton";
import { 
  Search, 
  Sprout, 
  GraduationCap, 
  Briefcase, 
  Heart, 
  Star, 
  ChevronRight,
  TrendingUp,
  Clock,
  Zap,
  CheckCircle2,
  Bookmark,
  Bell,
  Calendar,
  Lightbulb,
  ArrowRight,
  FileText,
  Download,
  ShieldCheck,
  Scale,
  MessageSquare,
  Mic,
  Filter
} from "lucide-react";
import { translations } from "@/data/translations";

type CategoryFilter = "all" | "farmer" | "student" | "employment" | "general";

const ServiceCard = ({ icon: Icon, label, onClick }: { icon: React.ElementType, label: string, onClick?: () => void }) => (
  <div 
    onClick={onClick}
    className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all cursor-pointer flex flex-col items-center justify-center text-center gap-3 aspect-square group"
  >
    <div className="w-10 h-10 rounded-full bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center text-blue-700 transition-colors">
      <Icon className="w-5 h-5" />
    </div>
    <span className="text-xs font-bold text-slate-700 group-hover:text-blue-800 leading-tight">{label}</span>
  </div>
);

const ProgressStep = ({ label, status, isLast }: { label: string, status: 'completed' | 'current' | 'pending', isLast?: boolean }) => {
  const statusColor = 
    status === 'completed' ? 'bg-green-600 border-green-600 text-white' : 
    status === 'current' ? 'bg-blue-600 border-blue-600 text-white' : 
    'bg-white border-slate-300 text-slate-400';

  return (
    <div className="flex items-center flex-1 last:flex-none">
      <div className="flex flex-col items-center relative z-10">
        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-xs ${statusColor} transition-colors`}>
          {status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : (status === 'current' ? <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" /> : <div className="w-2.5 h-2.5 bg-slate-300 rounded-full" />)}
        </div>
        <span className={`text-[10px] font-bold mt-2 uppercase tracking-wide ${status === 'current' ? 'text-blue-700' : 'text-slate-500'}`}>{label}</span>
      </div>
      {!isLast && (
        <div className={`flex-1 h-0.5 mx-2 -mt-6 ${status === 'completed' ? 'bg-green-600' : 'bg-slate-200'}`} />
      )}
    </div>
  );
};

const Dashboard = () => {
  const { userProfile, language } = useApp();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  const t = translations[language].dashboard;

  const categoryTabs: { key: CategoryFilter; label: string; icon: React.ReactNode; color: string }[] = [
    { key: "all", label: t.all, icon: <Star className="w-4 h-4" />, color: "bg-blue-600" },
    { key: "farmer", label: translations[language].profile.farmer, icon: <Sprout className="w-4 h-4" />, color: "bg-green-600" },
    { key: "student", label: translations[language].profile.student, icon: <GraduationCap className="w-4 h-4" />, color: "bg-purple-600" },
    { key: "employment", label: t.jobs, icon: <Briefcase className="w-4 h-4" />, color: "bg-orange-600" },
    { key: "general", label: t.health, icon: <Heart className="w-4 h-4" />, color: "bg-red-600" },
  ];

  const firstName = userProfile?.name?.split(" ")[0] || (language === "hi" ? "अतिथि" : "Guest");

  const filteredSchemes = mockSchemes.filter((scheme) => {
    const matchesCategory = activeFilter === "all" || scheme.category === activeFilter;
    const matchesSearch =
      !searchQuery ||
      scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (scheme.nameHi && scheme.nameHi.toLowerCase().includes(searchQuery.toLowerCase())) ||
      scheme.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const recommendedSchemes = mockSchemes.filter((s) => {
    if (!userProfile?.occupation) return true;
    const occ = userProfile.occupation.toLowerCase();
    if (occ === "farmer") return s.category === "farmer";
    if (occ === "student") return s.category === "student";
    if (occ === "unemployed") return s.category === "employment";
    return true;
  });

  return (
    <div className="flex flex-col xl:flex-row gap-8">
      <div className="flex-1 min-w-0">
        
        {/* Hero Section */}
        <section className="bg-[#1E3A8A] rounded-2xl p-8 mb-8 relative overflow-hidden shadow-lg shadow-blue-900/20 group border border-blue-800">
          <div className="relative z-10 max-w-3xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-blue-800/50 rounded text-[10px] font-bold text-blue-200 border border-blue-700/50 uppercase tracking-widest">
                Official Portal
              </span>
            </div>
            <h1 className="text-2xl lg:text-4xl font-bold text-white mb-3 leading-tight tracking-tight">
              {t.hello}, {firstName}! <span className="font-normal text-blue-300 text-2xl">| Welcome to Scheme Samadhan</span>
            </h1>
            <p className="text-blue-100/90 text-sm lg:text-base mb-8 max-w-xl leading-relaxed">
              Your one-stop gateway to access 2,500+ government schemes tailored for your needs.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Bar */}
              <div className="relative flex-1 group-focus-within:scale-[1.01] transition-transform duration-300">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 flex items-center gap-2 border-r border-slate-200 pr-2 h-5">
                   <Search className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for schemes, services, or departments..."
                  className="w-full bg-white rounded-lg pl-14 pr-12 py-3.5 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xl font-medium text-sm"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                   <button className="p-1.5 hover:bg-slate-100 rounded-md text-slate-500 transition-colors">
                     <Mic className="w-4 h-4" />
                   </button>
                   <button className="p-1.5 hover:bg-slate-100 rounded-md text-slate-500 transition-colors">
                     <Filter className="w-4 h-4" />
                   </button>
                </div>
              </div>
              
              {/* Secondary Action */}
              <button 
                onClick={() => navigate("/eligibility")}
                className="bg-[#FF9933] hover:bg-orange-600 text-white px-6 py-3.5 rounded-lg font-bold shadow-lg shadow-orange-900/20 whitespace-nowrap transition-all active:scale-95 flex items-center gap-2"
              >
                Check Eligibility
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Background Texture & Watermark */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 opacity-5 pointer-events-none">
             {/* Abstract Government Emblem Placeholder */}
             <div className="w-64 h-64 rounded-full border-[20px] border-white/20 flex items-center justify-center">
                <div className="w-40 h-40 rounded-full border-[10px] border-white/20" />
             </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          <StatCard 
            icon={Star} 
            value={mockSchemes.length} 
            label={t.totalSchemes} 
            iconColor="text-blue-700" 
            bgColor="bg-white"
          />
          <StatCard 
            icon={CheckCircle2} 
            value={recommendedSchemes.length} 
            label={t.forYou} 
            iconColor="text-green-700" 
            bgColor="bg-white"
          />
          <StatCard 
            icon={Briefcase} 
            value="12" 
            label={t.categories} 
            iconColor="text-purple-700" 
            bgColor="bg-white"
          />
          <StatCard 
            icon={TrendingUp} 
            value="3" 
            label={t.applied} 
            iconColor="text-orange-700" 
            bgColor="bg-white"
          />
          <StatCard 
            icon={Bookmark} 
            value="8" 
            label={t.saved} 
            iconColor="text-red-700" 
            bgColor="bg-white"
          />
        </section>

        {/* Quick Services Grid */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 border-l-4 border-blue-800 pl-3">
              Quick Services
            </h2>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
            <ServiceCard icon={FileText} label="Apply for Scheme" onClick={() => navigate("/schemes")} />
            <ServiceCard icon={Search} label="Track Status" onClick={() => navigate("/track-application")} />
            <ServiceCard icon={Download} label="Download Forms" onClick={() => navigate("/documents")} />
            <ServiceCard icon={ShieldCheck} label="Verify Eligibility" onClick={() => navigate("/eligibility")} />
            <ServiceCard icon={Scale} label="Compare Benefits" onClick={() => navigate("/compare")} />
            <ServiceCard icon={MessageSquare} label="Grievance Support" onClick={() => navigate("/grievance")} />
          </div>
        </section>

        {/* Application Progress Tracker */}
        <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              Application Status
            </h2>
            <button className="text-xs font-bold text-blue-700 hover:underline">View All Applications</button>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-slate-900 text-sm">PM Kisan Samman Nidhi</h3>
              <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-100">Application ID: #PMK-2024-892</span>
            </div>
            <div className="flex w-full mt-4">
              <ProgressStep label="Applied" status="completed" />
              <ProgressStep label="Under Review" status="current" />
              <ProgressStep label="Approved" status="pending" />
              <ProgressStep label="Disbursed" status="pending" isLast />
            </div>
          </div>
        </section>

        {/* Recommended Section */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 border-l-4 border-orange-500 pl-3">
              {t.recommended}
            </h2>
            <button 
              onClick={() => navigate("/recommendations")}
              className="text-sm font-bold text-blue-800 flex items-center gap-1 hover:underline transition-all group"
            >
              {t.seeAll}
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendedSchemes.slice(0, 4).map((scheme) => (
              <div key={scheme.id} className="transform hover:-translate-y-1 transition-transform duration-300 h-full">
                <SchemeCard scheme={scheme} />
              </div>
            ))}
          </div>
        </section>

        {/* Category Filter & All Schemes */}
        <section className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <h2 className="text-lg font-bold text-slate-800 border-l-4 border-green-600 pl-3">{t.allSchemes}</h2>
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
                {categoryTabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveFilter(tab.key)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border
                      ${activeFilter === tab.key
                        ? `${tab.color} text-white border-transparent shadow-md`
                        : "bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-slate-50"
                      }`}
                  >
                    {activeFilter === tab.key && tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {filteredSchemes.length > 0 ? (
                filteredSchemes.slice(0, 5).map((scheme) => (
                  <SchemeCard key={scheme.id} scheme={scheme} />
                ))
              ) : (
                <div className="bg-white rounded-xl p-12 text-center border border-dashed border-slate-300">
                  <p className="text-slate-500">{t.noSchemes}</p>
                </div>
              )}
              {filteredSchemes.length > 5 && (
                <button className="w-full py-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl font-bold transition-colors shadow-sm text-sm uppercase tracking-wide">
                  Load More Schemes
                </button>
              )}
            </div>
        </section>
      </div>

      {/* Right Info Panel (Desktop Only) */}
      <aside className="w-full xl:w-[340px] space-y-6 hidden xl:block">
        <div className="sticky top-24 space-y-6">
          
          {/* Government Updates */}
          <div className="bg-white p-0 rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-blue-50/50 p-4 border-b border-blue-100">
               <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                 <Bell className="w-4 h-4 text-blue-700" />
                 Government Updates
               </h3>
            </div>
            <div className="p-4 space-y-4">
              {[
                { text: "New agricultural subsidies announced for 2026.", date: "2 hours ago" },
                { text: "Student loan interest rates reduced by 1.5%.", date: "Yesterday" },
                { text: "Portal maintenance scheduled for Sunday midnight.", date: "2 days ago" }
              ].map((update, idx) => (
                <div key={idx} className="flex gap-3 group cursor-pointer">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0 group-hover:scale-125 transition-transform" />
                  <div>
                    <p className="text-xs font-medium text-slate-700 group-hover:text-blue-700 transition-colors leading-relaxed">{update.text}</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">{update.date}</span>
                  </div>
                </div>
              ))}
              <button className="w-full mt-2 py-2 text-xs font-bold text-blue-700 border border-blue-100 rounded-lg hover:bg-blue-50 transition-colors">
                View All Updates
              </button>
            </div>
          </div>

          {/* Important Deadlines */}
          <div className="bg-white p-0 rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-orange-50/50 p-4 border-b border-orange-100">
               <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                 <Calendar className="w-4 h-4 text-orange-600" />
                 Important Deadlines
               </h3>
            </div>
            <div className="divide-y divide-slate-50">
              {[
                { date: "Feb 28", event: "Scholarship Deadline", urgent: true },
                { date: "Mar 15", event: "Kisan Credit Renewal", urgent: false },
                { date: "Mar 31", event: "Tax Saving Schemes", urgent: false }
              ].map((item, idx) => (
                <div key={idx} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                     <div className={`flex flex-col items-center justify-center w-10 h-10 rounded-lg border ${item.urgent ? 'bg-red-50 border-red-100 text-red-600' : 'bg-slate-50 border-slate-100 text-slate-600'}`}>
                        <span className="text-[10px] font-bold uppercase">{item.date.split(" ")[0]}</span>
                        <span className="text-sm font-bold">{item.date.split(" ")[1]}</span>
                     </div>
                     <span className="text-xs font-bold text-slate-700 group-hover:text-blue-700 transition-colors">{item.event}</span>
                  </div>
                  {item.urgent && (
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" title="Urgent" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* AI Suggestions */}
          <div className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-xl p-6 text-white relative overflow-hidden shadow-lg shadow-blue-900/20 group">
            <div className="relative z-10">
              <h3 className="text-sm font-bold mb-3 flex items-center gap-2 text-blue-100 uppercase tracking-wider">
                <Lightbulb className="w-4 h-4 text-orange-400" />
                {t.aiSuggestions}
              </h3>
              <p className="text-sm text-white/90 mb-5 leading-relaxed font-medium">
                Based on your profile, you might be eligible for the new <strong>Solar Pump Subsidy</strong> launched yesterday.
              </p>
              <button className="w-full py-2.5 bg-white text-blue-900 rounded-lg text-xs font-bold hover:bg-blue-50 transition-colors shadow-sm flex items-center justify-center gap-2">
                Check Eligibility <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" />
          </div>
          
          {/* Helper Links */}
          <div className="grid grid-cols-2 gap-3">
             <div onClick={() => navigate("/help")} className="bg-white p-3 rounded-xl border border-slate-200 text-center hover:border-blue-300 cursor-pointer transition-colors shadow-sm">
                <MessageSquare className="w-5 h-5 text-blue-600 mx-auto mb-2" />
                <p className="text-[10px] font-bold text-slate-600">Help Desk</p>
             </div>
             <div onClick={() => navigate("/documents")} className="bg-white p-3 rounded-xl border border-slate-200 text-center hover:border-blue-300 cursor-pointer transition-colors shadow-sm">
                <FileText className="w-5 h-5 text-green-600 mx-auto mb-2" />
                <p className="text-[10px] font-bold text-slate-600">Documents</p>
             </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Dashboard;
