const Footer = () => {
  return (
    <footer className="bg-white border-t mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm text-gray-600">
        
        {/* BRAND */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Core<span className="text-indigo-600">Learn</span>
          </h3>
          <p className="text-gray-500">
            Learn skills that matter. Build your future with expert-designed courses.
          </p>
        </div>

        {/* LEARN */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Learn</h4>
          <ul className="space-y-2">
            <li className="hover:text-black cursor-pointer">Courses</li>
            <li className="hover:text-black cursor-pointer">My Learning</li>
            <li className="hover:text-black cursor-pointer">Certificates</li>
          </ul>
        </div>

        {/* COMPANY */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Company</h4>
          <ul className="space-y-2">
            <li className="hover:text-black cursor-pointer">About</li>
            <li className="hover:text-black cursor-pointer">Careers</li>
            <li className="hover:text-black cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Support</h4>
          <ul className="space-y-2">
            <li className="hover:text-black cursor-pointer">Help Center</li>
            <li className="hover:text-black cursor-pointer">Terms</li>
            <li className="hover:text-black cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

      </div>

      <div className="border-t py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} CoreLearn. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

