import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Home, LogOut, ChevronLeft } from 'lucide-react';
import PWAInstallPrompt from './PWAInstallPrompt';

const Layout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isHome = location.pathname === '/';

    return (
        <div className="app-container min-h-screen bg-gray-50 max-w-md mx-auto shadow-lg relative">
            {/* Header */}
            <header className="bg-nh-blue text-white p-4 flex items-center justify-between sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    {!isHome && (
                        <button onClick={() => navigate(-1)} className="p-1 hover:bg-white/10 rounded">
                            <ChevronLeft size={24} />
                        </button>
                    )}
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                        <img src="/logo.png" alt="Logo" className="h-5" />
                        <h1 className="text-lg font-bold">
                            농협구례교육원
                        </h1>
                    </div>
                </div>
                <button onClick={() => navigate('/')} className="p-1 hover:bg-white/10 rounded">
                    <Home size={24} />
                </button>
            </header>

            {/* Main Content */}
            <main className="p-4 pb-20">
                <Outlet />
            </main>

            {/* Footer (Optional) */}
            <footer className="bg-nh-gray p-4 text-center text-xs text-gray-500 mt-auto">
                © 농협구례교육원
            </footer>

            <PWAInstallPrompt />
        </div>
    );
};


export default Layout;
