export default function Footer() {
  return (
    <footer className="bg-[#f7f9fb] dark:bg-[#191c1e] w-full py-12 border-t border-[#e6e8ea]/20">
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
        <span className="text-[0.75rem] uppercase tracking-[0.05em] font-medium text-[#002045] dark:text-[#f2f4f6]">
          © 2024 The Academic Editorial. All rights reserved.
        </span>
        <div className="flex gap-8">
          <a className="text-[0.75rem] uppercase tracking-[0.05em] font-medium text-gray-500 hover:text-[#002045] transition-colors" href="#">Privacy Policy</a>
          <a className="text-[0.75rem] uppercase tracking-[0.05em] font-medium text-gray-500 hover:text-[#002045] transition-colors" href="#">Terms of Service</a>
          <a className="text-[0.75rem] uppercase tracking-[0.05em] font-medium text-gray-500 hover:text-[#002045] transition-colors" href="#">Accessibility</a>
          <a className="text-[0.75rem] uppercase tracking-[0.05em] font-medium text-gray-500 hover:text-[#002045] transition-colors" href="#">Contact</a>
        </div>
      </div>
    </footer>
  );
}
