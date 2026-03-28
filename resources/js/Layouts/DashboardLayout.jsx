import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { 
    LayoutDashboard, 
    UserCircle, 
    Users2, 
    Building2, 
    Newspaper, 
    Image, 
    FileText, 
    Calendar, 
    Users, 
    MapPin, 
    ChevronDown, 
    Menu, 
    X,
    Bell,
    Search,
    ChevronRight,
    LogOut,
    Settings,
    HelpCircle,
    FolderOpen
} from 'lucide-react';
import './DashboardLayout.css';

const MenuItem = ({ item, active, onClick, isOpen, currentPath }) => {
    const hasSubmenu = item.submenu && item.submenu.length > 0;
    const isSubmenuActive = hasSubmenu && item.submenu.some(sub => currentPath === sub.href);
    const [localOpen, setLocalOpen] = useState(isSubmenuActive || isOpen);

    useEffect(() => {
        if (isSubmenuActive) setLocalOpen(true);
    }, [isSubmenuActive]);

    const handleToggle = (e) => {
        if (hasSubmenu) {
            e.preventDefault();
            setLocalOpen(!localOpen);
        } else {
            onClick();
        }
    };

    return (
        <div className="menu-item-container">
            <Link 
                href={hasSubmenu ? '#' : item.href} 
                className={`menu-link ${active || isSubmenuActive ? 'active' : ''}`}
                onClick={handleToggle}
            >
                <div className="menu-icon-label">
                    <item.icon size={20} className="menu-icon" />
                    <span>{item.label}</span>
                </div>
                {hasSubmenu && (
                    <ChevronDown size={16} className={`chevron ${localOpen ? 'rotate' : ''}`} />
                )}
            </Link>
            
            {hasSubmenu && localOpen && (
                <div className="submenu">
                    {item.submenu.map((sub, idx) => (
                        <Link 
                            key={idx} 
                            href={sub.href} 
                            className={`submenu-link ${currentPath === sub.href ? 'active' : ''}`}
                        >
                            <ChevronRight size={14} className="submenu-dot" />
                            <span>{sub.label}</span>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default function DashboardLayout({ children }) {
    const { url } = usePage();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const menuData = [
        { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
        { label: 'Profil Desa', icon: UserCircle, href: '/profil' },
        { label: 'Struktur Desa', icon: Users2, href: '/struktur' },
        { label: 'Lembaga Desa', icon: Building2, href: '/lembaga' },
        { label: 'Berita / Kabar', icon: Newspaper, href: '/berita' },
        { label: 'Galeri & Dokumentasi', icon: Image, href: '/galeri' },
        { label: 'Pusat Layanan', icon: FileText, href: '/layanan' },
        { label: 'Agenda & Kegiatan', icon: Calendar, href: '/agenda' },
        { label: 'File & Dokumen', icon: FolderOpen, href: '/files' },
        { label: 'Manajemen Penduduk', icon: Users, href: '/penduduk' },
        { label: 'Layanan Surat', icon: FileText, href: '/surat' },
        { label: 'Kontak & Lokasi', icon: MapPin, href: '/kontak-lokasi' },
    ];

    return (
        <div className="layout-container">
            {/* Sidebar Overlay for Mobile */}
            {isMobileOpen && (
                <div className="sidebar-overlay" onClick={() => setIsMobileOpen(false)}></div>
            )}

            {/* Sidebar */}
            <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'} ${isMobileOpen ? 'mobile-show' : ''}`}>
                <div className="sidebar-header">
                    <div className="logo-container">
                        <div className="logo-box">D</div>
                        <span className="logo-text">LANPEG DESA</span>
                    </div>
                </div>

                <div className="sidebar-content">
                    <div className="menu-group">
                        <p className="menu-title">Main Menu</p>
                        {menuData.map((item, idx) => (
                            <MenuItem 
                                key={idx} 
                                item={item} 
                                active={url === item.href}
                                currentPath={url}
                                onClick={() => setIsMobileOpen(false)}
                            />
                        ))}
                    </div>

                    <div className="menu-group footer-menu">
                        <p className="menu-title">Server System</p>
                        <MenuItem item={{ label: 'Manajemen Akun', icon: Settings, href: '/akun' }} active={url === '/akun'} currentPath={url} />
                        <div className="menu-item-container">
                            <Link href="/logout" method="post" as="button" className="menu-link logout">
                                <LogOut size={20} className="menu-icon" />
                                <span>Logout</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Wrapper */}
            <div className="main-wrapper">
                {/* Header */}
                <header className="header">
                    <div className="header-left">
                        <button className="icon-button mobile-toggle" onClick={() => setIsMobileOpen(true)}>
                            <Menu size={20} />
                        </button>
                        <button className="icon-button desktop-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                            <Menu size={20} />
                        </button>
                        <div className="search-bar">
                            <Search size={18} className="search-icon" />
                            <input type="text" placeholder="Search data, reports..." />
                        </div>
                    </div>

                    <div className="header-right">
                        <button className="icon-button notification">
                            <Bell size={20} />
                            <span className="badge"></span>
                        </button>
                        <div className="user-profile">
                            <div className="user-info">
                                <span className="user-name">Admin Desa</span>
                                <span className="user-role">Super Admin</span>
                            </div>
                            <div className="user-avatar">AD</div>
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <main className="main-content">
                    <div className="content-inner">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
