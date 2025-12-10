function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-t border-gray-700 py-6 text-center mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} HeartPredict. All rights reserved.
        </p>
        <p className="text-gray-500 text-xs mt-2">
          AI-powered heart disease risk assessment
        </p>
      </div>
    </footer>
  );
}

export default Footer;