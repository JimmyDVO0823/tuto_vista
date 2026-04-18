const Footer = () => {
  return (
    <footer className="bg-[#f7f9fb] border-t border-[#e6e8ea]/20">
      <div className="max-w-7xl mx-auto px-8 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-[0.75rem] uppercase tracking-[0.05em] font-medium text-gray-500 order-2 md:order-1">
          © 2024 The Academic Editorial. All rights reserved.
        </div>
        <div className="flex gap-8 order-1 md:order-2">
          <a
            className="text-[0.75rem] uppercase tracking-[0.05em] font-medium text-gray-500 hover:text-[#002045] transition-colors"
            href="#"
          >
            Privacy Policy
          </a>
          <a
            className="text-[0.75rem] uppercase tracking-[0.05em] font-medium text-gray-500 hover:text-[#002045] transition-colors"
            href="#"
          >
            Terms of Service
          </a>
          <a
            className="text-[0.75rem] uppercase tracking-[0.05em] font-medium text-gray-500 hover:text-[#002045] transition-colors"
            href="#"
          >
            Accessibility
          </a>
          <a
            className="text-[0.75rem] uppercase tracking-[0.05em] font-medium text-gray-500 hover:text-[#002045] transition-colors"
            href="#"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
