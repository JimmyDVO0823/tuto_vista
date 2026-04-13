export default function Navbar() {
  return (
    <nav className="bg-[#f7f9fb]/80 dark:bg-[#191c1e]/80 backdrop-blur-md top-0 sticky z-50 shadow-sm dark:shadow-none">
      <div className="flex justify-between items-center w-full px-8 py-4 max-w-full mx-auto">
        <div className="flex items-center gap-12">
          <span className="text-xl font-bold tracking-tight text-[#002045] dark:text-[#f7f9fb] font-headline">
            The Academic Editorial
          </span>
          <div className="hidden md:flex items-center gap-8">
            <a className="text-[#191c1e]/60 dark:text-[#f7f9fb]/60 hover:text-[#002045] dark:hover:text-white transition-colors" href="#">Find Tutors</a>
            <a className="text-[#191c1e]/60 dark:text-[#f7f9fb]/60 hover:text-[#002045] dark:hover:text-white transition-colors" href="#">Library</a>
            <a className="text-[#191c1e]/60 dark:text-[#f7f9fb]/60 hover:text-[#002045] dark:hover:text-white transition-colors" href="#">Resources</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-5 py-2 text-[#002045] font-semibold hover:opacity-80 transition-all active:scale-95">Sign In</button>
          <button className="px-6 py-2 bg-tertiary-container text-[#4e3d00] font-bold rounded-md hover:brightness-105 transition-all active:scale-95">Apply to Tutor</button>
        </div>
      </div>
    </nav>
  );
}
