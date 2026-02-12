import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/contexts/AppContext";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import ProfileSetup from "./pages/ProfileSetup";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Recommendations from "./pages/Recommendations";
import AllSchemes from "./pages/AllSchemes";
import Categories from "./pages/Categories";
import SavedSchemes from "./pages/SavedSchemes";
import Eligibility from "./pages/Eligibility";
import Profile from "./pages/Profile";
import Help from "./pages/Help";
import Compare from "./pages/Compare";
import TrackApplication from "./pages/TrackApplication";
import Documents from "./pages/Documents";
import Grievance from "./pages/Grievance";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile-setup" element={<ProfileSetup />} />
            
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/schemes" element={<AllSchemes />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/saved" element={<SavedSchemes />} />
              <Route path="/eligibility" element={<Eligibility />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/help" element={<Help />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/recommendations" element={<Recommendations />} />
              <Route path="/track-application" element={<TrackApplication />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/grievance" element={<Grievance />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
