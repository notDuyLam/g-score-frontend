export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white h-[10vh] flex items-center justify-center px-6 shadow-lg border-b border-blue-700">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-blue-600 rounded-lg shadow-md">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-300 to-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-lg font-bold text-blue-900">G</span>
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-wide">G-Score</h1>
          <p className="text-sm text-blue-300">Student Management System</p>
        </div>
      </div>
    </header>
  );
}
