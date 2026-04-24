/**
 * @fileoverview Layout Component - Public Navigation Header
 * @module components/layout/Header
 * @description The primary navigational entry point for non-authenticated 
 * sessions. Employs glassmorphism (backdrop-blur) and high-contrast 
 * branding to establish immediate authority.
 */

/**
 * Header Component.
 * 
 * @component
 */
const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-[#f7f9fb]/80 backdrop-blur-md shadow-sm">
      <div className="flex justify-between items-center w-full px-8 py-4 max-w-full mx-auto">
        <div className="text-xl font-bold tracking-tight text-[#002045]">
          The Academic Editorial
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <a
            className="text-[#191c1e]/60 hover:text-[#002045] transition-colors"
            href="#"
          >
            Find Tutors
          </a>
          <a
            className="text-[#191c1e]/60 hover:text-[#002045] transition-colors"
            href="#"
          >
            Library
          </a>
          <a
            className="text-[#191c1e]/60 hover:text-[#002045] transition-colors"
            href="#"
          >
            Resources
          </a>
        </nav>
        <div className="flex items-center gap-4">
          <button className="text-[#002045] font-semibold text-sm hover:opacity-80 active:scale-95 transition-transform">
            Apply to Tutor
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
