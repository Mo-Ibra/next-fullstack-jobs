import Link from "next/link";

const Navigation = () => {
  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">FS</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Full-Stack Jobs
              </h1>
              <p className="text-xs text-gray-500">Find Your Dream Role</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link
              href="/submit-job"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-lg shadow-blue-500/30 transition-all hover:shadow-xl hover:shadow-blue-500/40"
            >
              Post a Job
            </Link>
            <Link
              href="/blog"
              className="text-sm text-gray-600 hover:text-gray-900 flex items-center px-4 py-2.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Blog
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;