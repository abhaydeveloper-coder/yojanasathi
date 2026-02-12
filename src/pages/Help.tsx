import { HelpCircle, Phone, Mail } from "lucide-react";

const Help = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Help & Support</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              "How do I apply for a scheme?",
              "What documents do I need?",
              "How do I check my application status?",
              "Is this service free?"
            ].map((q, i) => (
              <div key={i} className="p-3 bg-slate-50 rounded-lg hover:bg-slate-100 cursor-pointer transition-colors">
                <p className="text-sm font-medium text-slate-700">{q}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Contact Us</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg text-blue-900">
              <Phone className="w-5 h-5" />
              <div>
                <p className="font-bold">Helpline Number</p>
                <p className="text-sm">1800-111-222 (Toll Free)</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg text-orange-900">
              <Mail className="w-5 h-5" />
              <div>
                <p className="font-bold">Email Support</p>
                <p className="text-sm">support@yojanasathi.gov.in</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
