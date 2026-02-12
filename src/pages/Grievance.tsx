import { MessageSquare, AlertTriangle, CheckCircle, FileText } from "lucide-react";

const Grievance = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Grievance Redressal Support</h1>
      
      {/* Search Grievance */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Track Existing Grievance</h2>
        <div className="flex gap-4 flex-col md:flex-row">
          <input 
            type="text" 
            placeholder="Enter Grievance ID (e.g. GR-2024-001)" 
            className="flex-1 border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button className="bg-red-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors">
            Track Status
          </button>
        </div>
      </div>

      {/* File New Grievance */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { icon: MessageSquare, title: "Lodge a Complaint", desc: "Report issues with scheme implementation or service delivery." },
          { icon: AlertTriangle, title: "Report Corruption", desc: "Report any fraudulent activity or misuse of funds anonymously." },
          { icon: CheckCircle, title: "Track Resolution", desc: "Check the status of your previously filed complaints." },
          { icon: FileText, title: "FAQs", desc: "Find answers to frequently asked questions about grievances." }
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-red-300 transition-all cursor-pointer group">
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-red-600 group-hover:bg-red-100 transition-colors mb-4 mx-auto">
              <item.icon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-800 text-center mb-2 group-hover:text-red-700 transition-colors">{item.title}</h3>
            <p className="text-sm text-slate-500 text-center leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grievance;
