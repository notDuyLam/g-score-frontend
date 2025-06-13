import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Score from "../pages/Score";
import Dashboard from "../pages/Dashboard";
import Report from "../pages/Report";
import Setting from "../pages/Setting";

export default function AppRoutes() {
  return (
    <div className="bg-gray300">
      <BrowserRouter>
        <Header />

        <div className="flex">
          <Sidebar />
          <main className="flex-1 bg-gray-100 min-h-screen p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/score" element={<Score />} />
              <Route path="/dashboard" element={<Report />} />
              <Route path="/setting" element={<Setting />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </div>
  );
}
