import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { Phone, Mail, UserCircle, Shield, ArrowLeft } from "lucide-react";
import logo from "@/assets/logo.png";

const Login = () => {
  const navigate = useNavigate();
  const { setIsGuest } = useApp();
  const [loginMethod, setLoginMethod] = useState<"phone" | "email">("phone");
  const [inputValue, setInputValue] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGuest(false);
    navigate("/profile-setup");
  };

  const handleGuest = () => {
    setIsGuest(true);
    navigate("/profile-setup");
  };

  return (
    <div className="min-h-screen gradient-hero flex flex-col px-4 py-6">
      {/* Back button */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors mb-6 self-start"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">Back</span>
      </button>

      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-sm mx-auto animate-slide-up">
        {/* Logo small */}
        <div className="w-16 h-16 rounded-full bg-card shadow-card flex items-center justify-center mb-6 overflow-hidden">
          <img src={logo} alt="YojanaSathi" className="w-12 h-12 object-contain" />
        </div>

        <h2 className="text-2xl font-bold text-foreground mb-1">Welcome Back</h2>
        <p className="text-sm text-muted-foreground mb-8">Sign in to find your schemes</p>

        {/* Login Form */}
        <div className="w-full bg-card rounded-xl shadow-card p-6 mb-4">
          {/* Toggle */}
          <div className="flex rounded-lg bg-muted p-1 mb-6">
            <button
              onClick={() => setLoginMethod("phone")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-medium transition-all
                ${loginMethod === "phone" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"}`}
            >
              <Phone className="w-4 h-4" />
              Mobile
            </button>
            <button
              onClick={() => setLoginMethod("email")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-medium transition-all
                ${loginMethod === "email" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"}`}
            >
              <Mail className="w-4 h-4" />
              Email
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                {loginMethod === "phone" ? "Mobile Number" : "Email Address"}
              </label>
              <div className="relative">
                {loginMethod === "phone" && (
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium">
                    +91
                  </span>
                )}
                <input
                  type={loginMethod === "phone" ? "tel" : "email"}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={loginMethod === "phone" ? "Enter mobile number" : "Enter email address"}
                  className={`w-full bg-background border border-input rounded-lg py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all
                    ${loginMethod === "phone" ? "pl-12 pr-4" : "px-4"}`}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full gradient-saffron text-primary-foreground font-semibold py-3.5 rounded-lg hover:opacity-90 active:scale-[0.98] transition-all text-sm"
            >
              Continue →
            </button>
          </form>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 w-full my-2">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground">or</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Guest Access */}
        <button
          onClick={handleGuest}
          className="w-full flex items-center justify-center gap-2 bg-card border-2 border-border py-3.5 rounded-xl hover:border-secondary hover:bg-green-light transition-all text-sm font-medium text-foreground mt-2"
        >
          <UserCircle className="w-5 h-5 text-secondary" />
          Continue as Guest
        </button>

        {/* Privacy Note */}
        <div className="flex items-center gap-2 mt-8 px-4 py-3 rounded-lg bg-green-light">
          <Shield className="w-4 h-4 text-secondary flex-shrink-0" />
          <p className="text-xs text-foreground">
            No documents required. Your data stays private.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
