import { Search, CheckCircle2, Clock, AlertCircle } from "lucide-react";

const TrackApplication = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Track Application Status</h1>
      
      {/* Search Section */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Enter Application Details</h2>
        <div className="flex gap-4 flex-col md:flex-row">
          <input 
            type="text" 
            placeholder="Enter Application ID (e.g. PMK-2024-892)" 
            className="flex-1 border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors">
            Track Status
          </button>
        </div>
      </div>

      {/* Recent Applications */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-lg font-bold text-slate-800 mb-6">Recent Applications</h2>
        <div className="space-y-6">
          {[
            { id: "PMK-2024-892", scheme: "PM Kisan Samman Nidhi", status: "Under Review", date: "10 Feb 2024", icon: Clock, color: "text-blue-600", bg: "bg-blue-50" },
            { id: "PMS-2023-114", scheme: "Post Matric Scholarship", status: "Approved", date: "15 Jan 2024", icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
            { id: "ABY-2023-005", scheme: "Ayushman Bharat Yojana", status: "Action Required", date: "05 Jan 2024", icon: AlertCircle, color: "text-orange-600", bg: "bg-orange-50" }
          ].map((app, idx) => (
            <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-slate-100 rounded-lg hover:border-blue-200 transition-colors">
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-full ${app.bg} flex items-center justify-center ${app.color}`}>
                  <app.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{app.scheme}</h3>
                  <p className="text-xs text-slate-500 font-medium">Application ID: {app.id}</p>
                  <p className="text-xs text-slate-400 mt-1">Applied on: {app.date}</p>
                </div>
              </div>
              <div className="mt-4 md:mt-0 flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${app.color.replace('text', 'border').replace('600', '200')} ${app.bg}`}>
                  {app.status}
                </span>
                <button className="text-sm font-bold text-blue-700 hover:underline">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrackApplication;
