import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Score from "../pages/Score";
import Dashboard from "../pages/Dashboard";
import Report from "../pages/Report";
import Setting from "../pages/Setting";

export default function AppRoutes() {
  return (
    <div className="min-h-screen bg-slate-50">
      <BrowserRouter>
        {/* Fixed Header */}
        <div className="fixed top-0 left-0 right-0 z-40">
          <Header />
        </div>

        <div className="flex pt-[10vh]">
          {/* Fixed Sidebar */}
          <div className="fixed left-0 top-[10vh] bottom-0 z-30">
            <Sidebar />
          </div>

          {/* Main Content Area */}
          <main className="flex-1 ml-72 bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 min-h-[90vh] relative">
            {/* Content Container */}
            <div className="relative z-10 p-6">
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
