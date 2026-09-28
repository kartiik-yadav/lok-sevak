import { useState } from "react";

import LandingPage from "./LandingPage";
import Dashboard from "./Dashboard";
import GovernmentServices from "./GovernmentServices";
import ApplicationForm from "./ApplicationForm";
import ApplicationSuccess from "./ApplicationSuccess";
import MyApplications from "./MyApplications";
import ApplicationTracking from "./ApplicationTracking";
import Profile from "./Profile";
import Documents from "./Documents";
import AINavigator from "./AINavigator";
import OCRScanner from "./OCRScanner";

type Screen =
  | "landing"
  | "dashboard"
  | "services"
  | "ai-navigator"
  | "application-form"
  | "application-success"
  | "applications"
  | "tracking"
  | "profile"
  | "documents"
  | "ocr";

function App() {
  const [screen, setScreen] = useState<Screen>("landing");

  const [selectedService, setSelectedService] =
    useState("Income Certificate");

  const [applicationId, setApplicationId] =
    useState("LOK-2026-10482");

  const navigate = (nextScreen: string) => {
    setScreen(nextScreen as Screen);
  };

  const handleEnterDemo = () => {
    setScreen("dashboard");
  };

  const handleExploreServices = () => {
    setScreen("services");
  };

  const handleApply = (service: string) => {
    setSelectedService(service);
    setScreen("application-form");
  };

  const handleSubmitApplication = (id: string) => {
    setApplicationId(id);
    setScreen("application-success");
  };

  const handleTrackApplication = (id?: string) => {
    if (id) {
      setApplicationId(id);
    }

    setScreen("tracking");
  };

  switch (screen) {
    case "landing":
      return (
        <LandingPage
          onEnterDemo={handleEnterDemo}
          onExploreServices={handleExploreServices}
        />
      );

    case "dashboard":
      return <Dashboard onNavigate={navigate} />;

    case "services":
      return (
        <GovernmentServices
          onApply={handleApply}
          onNavigate={navigate}
        />
      );

    case "ai-navigator":
      return (
        <AINavigator
          onNavigate={navigate}
          onApply={handleApply}
        />
      );

    case "application-form":
      return (
        <ApplicationForm
          service={selectedService}
          onBack={() => navigate("services")}
          onSubmit={handleSubmitApplication}
        />
      );

    case "application-success":
      return (
        <ApplicationSuccess
          applicationId={applicationId}
          service={selectedService}
          onTrack={() =>
            handleTrackApplication(applicationId)
          }
          onApplications={() =>
            navigate("applications")
          }
          onDashboard={() => navigate("dashboard")}
        />
      );

    case "applications":
      return (
        <MyApplications
          onTrack={handleTrackApplication}
          onNavigate={navigate}
        />
      );

    case "tracking":
      return (
        <ApplicationTracking
          applicationId={applicationId}
          onBack={() => navigate("applications")}
          onNavigate={navigate}
        />
      );

    case "profile":
      return <Profile onNavigate={navigate} />;

    case "documents":
      return <Documents onNavigate={navigate} />;

    case "ocr":
      return (
        <OCRScanner
          onBack={() => navigate("documents")}
        />
      );

    default:
      return (
        <LandingPage
          onEnterDemo={handleEnterDemo}
          onExploreServices={handleExploreServices}
        />
      );
  }
}

export default App;