import { useApp } from "@/contexts/AppContext";
import { User } from "lucide-react";

const Profile = () => {
  const { userProfile, language } = useApp();
  const firstName = userProfile?.name || (language === "hi" ? "अतिथि" : "Guest");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Profile</h1>
      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 max-w-2xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-2xl">
            {firstName[0]}
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">{firstName}</h2>
            <p className="text-slate-500">{userProfile?.occupation || "User"}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-lg">
              <span className="text-sm text-slate-500 block mb-1">State</span>
              <span className="font-medium text-slate-900">{userProfile?.state || "-"}</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <span className="text-sm text-slate-500 block mb-1">District</span>
              <span className="font-medium text-slate-900">{userProfile?.district || "-"}</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <span className="text-sm text-slate-500 block mb-1">Age</span>
              <span className="font-medium text-slate-900">{userProfile?.age || "-"}</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <span className="text-sm text-slate-500 block mb-1">Gender</span>
              <span className="font-medium text-slate-900">{userProfile?.gender || "-"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
