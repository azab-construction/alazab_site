import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useServiceWorker } from "@/hooks/useServiceWorker";
import { usePerformanceOptimization } from "@/hooks/usePerformanceOptimization";
import { trackWebVitals } from "@/utils/analytics";
import Index from "./pages/Index";
import MaintenanceRequest from "./pages/MaintenanceRequest";
import MaintenanceTracking from "./pages/MaintenanceTracking";
import MaintenanceList from "./pages/MaintenanceList";
import ServicesPage from "./pages/ServicesPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectManagement from "./pages/ProjectManagement";
import ProjectDetails from "./pages/ProjectDetails";
import ProjectPortfolioDetails from "./pages/ProjectPortfolioDetails";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import CEOPage from "./pages/CEOPage";
import ChatbotPage from "./pages/ChatbotPage";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import AdminDashboard from "./pages/AdminDashboard";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { Toaster } from "./components/ui/toaster";
import "./App.css";

import ProjectsShowcase from "./pages/ProjectsShowcase";
import MaintenanceRequestDetails from "./pages/MaintenanceRequestDetails";
import MaintenanceReports from "./pages/MaintenanceReports";
import ProjectStoryPage from "./pages/ProjectStoryPage";
import GeneralSuppliesPage from "./pages/services/GeneralSuppliesPage";
import MaintenanceRenovationPage from "./pages/services/MaintenanceRenovationPage";
import BrandIdentityPage from "./pages/services/BrandIdentityPage";
import LuxuryCleaningPage from "./pages/services/LuxuryCleaningPage";

function App() {
  // تفعيل Service Worker وتحسينات الأداء
  useServiceWorker();
  usePerformanceOptimization();
  
  // تفعيل تتبع الأداء
  React.useEffect(() => {
    trackWebVitals();
  }, []);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/maintenance-request" element={<MaintenanceRequest />} />
        <Route path="/maintenance-tracking" element={<MaintenanceTracking />} />
        <Route path="/maintenance-list" element={<MaintenanceList />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/chatbot" element={<ChatbotPage />} />
        <Route path="/project-management" element={
          <ProtectedRoute>
            <ProjectManagement />
          </ProtectedRoute>
        } />
        <Route path="/projects/:projectId" element={
          <ProtectedRoute>
            <ProjectDetails />
          </ProtectedRoute>
        } />
        <Route path="/portfolio/:projectId" element={<ProjectPortfolioDetails />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/ceo" element={<CEOPage />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />
        <Route path="/admin-dashboard" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        } />
        <Route path="/projects-gallery" element={<ProjectsShowcase />} />
        <Route path="/projects-gallery/:projectId" element={<ProjectStoryPage />} />
        <Route path="/services/general-supplies" element={<GeneralSuppliesPage />} />
        <Route path="/services/maintenance-renovation" element={<MaintenanceRenovationPage />} />
        <Route path="/services/brand-identity" element={<BrandIdentityPage />} />
        <Route path="/services/luxury-cleaning" element={<LuxuryCleaningPage />} />
        <Route path="/maintenance-request-details/:id" element={
          <ProtectedRoute>
            <MaintenanceRequestDetails />
          </ProtectedRoute>
        } />
        <Route path="/maintenance-reports" element={
          <ProtectedRoute>
            <MaintenanceReports />
          </ProtectedRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
