import { FileText, Download } from "lucide-react";

const Documents = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Download Documents & Forms</h1>
      
      {/* Search Documents */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 flex gap-4">
        <input 
          type="text" 
          placeholder="Search for forms, documents, or schemes..." 
          className="flex-1 border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors">
          Search
        </button>
      </div>

      {/* Popular Downloads */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "Application Form", type: "PDF", size: "1.2 MB" },
          { title: "Income Certificate Format", type: "DOC", size: "0.8 MB" },
          { title: "Self Declaration", type: "PDF", size: "0.5 MB" },
          { title: "Caste Certificate Application", type: "PDF", size: "1.5 MB" },
          { title: "Affidavit Template", type: "DOC", size: "0.3 MB" },
          { title: "Loan Application Form", type: "PDF", size: "2.1 MB" }
        ].map((doc, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 group-hover:bg-blue-100 transition-colors">
                <FileText className="w-6 h-6" />
              </div>
              <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                <Download className="w-5 h-5" />
              </button>
            </div>
            <h3 className="font-bold text-slate-800 mb-1 group-hover:text-blue-700 transition-colors">{doc.title}</h3>
            <p className="text-xs text-slate-500 font-medium flex items-center gap-2">
              <span className="uppercase bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 border border-slate-200">{doc.type}</span>
              <span>•</span>
              <span>{doc.size}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Documents;
