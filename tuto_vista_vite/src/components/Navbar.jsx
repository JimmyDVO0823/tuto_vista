import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-[#f7f9fb]/80 backdrop-blur-md top-0 sticky z-50 shadow-sm">
      <div className="flex justify-between items-center w-full px-8 py-4 max-w-full mx-auto">
        <div className="flex items-center gap-12">
          <Link to="/" className="text-xl font-bold tracking-tight text-[#002045] font-headline">
            The Academic Editorial
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link className="text-[#191c1e]/60 hover:text-[#002045] transition-colors" to="/tutors">Find Tutors</Link>
            <Link className="text-[#191c1e]/60 hover:text-[#002045] transition-colors" to="/dashboard/student">Library</Link>
            <a className="text-[#191c1e]/60 hover:text-[#002045] transition-colors" href="#">Resources</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="px-5 py-2 text-[#002045] font-semibold hover:opacity-80 transition-all active:scale-95">
            Sign In
          </Link>
          <button className="px-6 py-2 bg-tertiary-container text-[#4e3d00] font-bold rounded-md hover:brightness-105 transition-all active:scale-95">Apply to Tutor</button>
        </div>
      </div>
    </nav>
  );
}
