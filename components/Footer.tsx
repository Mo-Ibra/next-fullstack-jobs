import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">FS</span>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Full-Stack Jobs</h3>
              <p className="text-sm text-gray-400">Find Your Dream Role</p>
            </div>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm text-gray-400">
              © 2025 Full-Stack Jobs. All rights reserved.
            </p>
            <div className="flex gap-4 mt-2 justify-center md:justify-end">
              <Link
                href="/admin"
                className="text-sm hover:text-white transition-colors"
              >
                Admin
              </Link>
              <Link
                href="/submit-job"
                className="text-sm hover:text-white transition-colors"
              >
                Post a Job
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;