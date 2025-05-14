import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Layout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary-800 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img 
              src="https://opjtgtcnywocvstkmsqc.supabase.co/storage/v1/object/public/enterprise-logos//Earth%20Care%20Logo.png" 
              alt="Earth Care Logo" 
              className="h-10 w-10 mr-2"
            />
            <div>
              <h1 className="text-xl font-bold">Earth Care: Collective</h1>
              <p className="text-xs">Regenerative Enterprise Directory</p>
            </div>
          </Link>
          
          <button
            className="lg:hidden p-2 rounded hover:bg-primary-700 transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <nav className="hidden lg:flex space-x-6 items-center">
            <Link 
              to="/" 
              className={`hover:text-primary-200 transition-colors ${
                location.pathname === '/' ? 'font-bold' : ''
              }`}
            >
              Home
            </Link>
            <Link 
              to="/directory/land-projects" 
              className={`hover:text-primary-200 transition-colors ${
                location.pathname.includes('/directory/land-projects') ? 'font-bold' : ''
              }`}
            >
              Land Projects
            </Link>
            <Link 
              to="/directory/capital-sources" 
              className={`hover:text-primary-200 transition-colors ${
                location.pathname.includes('/directory/capital-sources') ? 'font-bold' : ''
              }`}
            >
              Capital Sources
            </Link>
            <Link 
              to="/directory/open-source-tools" 
              className={`hover:text-primary-200 transition-colors ${
                location.pathname.includes('/directory/open-source-tools') ? 'font-bold' : ''
              }`}
            >
              Open Source Tools
            </Link>
            <Link 
              to="/directory/network-organizers" 
              className={`hover:text-primary-200 transition-colors ${
                location.pathname.includes('/directory/network-organizers') ? 'font-bold' : ''
              }`}
            >
              Network Organizers
            </Link>
            <Link 
              to="/add-enterprise" 
              className="bg-secondary-600 hover:bg-secondary-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Add Enterprise
            </Link>
          </nav>
        </div>
        
        {isMenuOpen && (
          <div className="lg:hidden bg-primary-700 px-4 py-2">
            <nav className="flex flex-col space-y-2">
              <Link 
                to="/" 
                className={`hover:text-primary-200 py-2 transition-colors ${
                  location.pathname === '/' ? 'font-bold' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/directory/land-projects" 
                className={`hover:text-primary-200 py-2 transition-colors ${
                  location.pathname.includes('/directory/land-projects') ? 'font-bold' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Land Projects
              </Link>
              <Link 
                to="/directory/capital-sources" 
                className={`hover:text-primary-200 py-2 transition-colors ${
                  location.pathname.includes('/directory/capital-sources') ? 'font-bold' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Capital Sources
              </Link>
              <Link 
                to="/directory/open-source-tools" 
                className={`hover:text-primary-200 py-2 transition-colors ${
                  location.pathname.includes('/directory/open-source-tools') ? 'font-bold' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Open Source Tools
              </Link>
              <Link 
                to="/directory/network-organizers" 
                className={`hover:text-primary-200 py-2 transition-colors ${
                  location.pathname.includes('/directory/network-organizers') ? 'font-bold' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Network Organizers
              </Link>
              <Link 
                to="/add-enterprise" 
                className="bg-secondary-600 hover:bg-secondary-700 text-white px-4 py-2 rounded-lg text-center transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Add Enterprise
              </Link>
            </nav>
          </div>
        )}
      </header>
      
      <main className="flex-1 mb-8">
        <Outlet />
      </main>
      
      <footer className="bg-primary-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Earth Care: Collective</h3>
              <p className="text-sm text-gray-300">
                Mapping the regenerative economy and connecting enterprises working toward ecological restoration 
                and regenerative systems.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link to="/" className="hover:text-primary-300 transition-colors">Home</Link></li>
                <li><Link to="/add-enterprise" className="hover:text-primary-300 transition-colors">Add Enterprise</Link></li>
                <li><a href="#" className="hover:text-primary-300 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary-300 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-white hover:text-primary-300 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-primary-300 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-primary-300 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                  </svg>
                </a>
              </div>
              <p className="mt-4 text-sm text-gray-300">
                © {new Date().getFullYear()} Earth Care: Collective. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;