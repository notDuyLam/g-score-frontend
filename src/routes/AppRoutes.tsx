import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Score from "../pages/Score";
import Dashboard from "../pages/Dashboard";
import Report from "../pages/Report";
import Setting from "../pages/Setting";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function AppRoutes() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <BrowserRouter>
        {/* Fixed Header */}
        <div className="fixed top-0 left-0 right-0 z-50">
          <Header />
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden fixed top-4 left-4 z-50 bg-blue-800 hover:bg-blue-700 text-white"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        <div className="flex pt-[10vh]">
          {/* Mobile Overlay */}
          {sidebarOpen && (
            <div
              className="lg:hidden fixed inset-0 bg-black/50 z-40 pt-[10vh]"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <div
            className={`
              fixed left-0 top-[10vh] bottom-0 z-40 transition-transform duration-300 ease-in-out
              lg:translate-x-0 lg:z-30
              ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            `}
          >
            <Sidebar />
          </div>

          {/* Main Content Area */}
          <main
            className={`
              flex-1 bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 min-h-[90vh] relative transition-all duration-300 ease-in-out
              lg:ml-72
              ${sidebarOpen ? "ml-0" : "ml-0"}
            `}
          >
            {/* Content Container */}
            <div className="relative z-10 p-4 lg:p-6">
              <div className="mx-auto max-w-7xl">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/score" element={<Score />} />
                  <Route path="/dashboard" element={<Report />} />
                  <Route path="/setting" element={<Setting />} />
                </Routes>
              </div>
            </div>

            {/* Background Pattern */}
            <div className="absolute inset-0 z-0 opacity-5">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />
            </div>
          </main>
        </div>
      </BrowserRouter>
    </div>
  );
}
