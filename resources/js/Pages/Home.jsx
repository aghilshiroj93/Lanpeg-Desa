import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { 
    Users, 
    Calendar, 
    Newspaper, 
    MapPin, 
    Phone, 
    Mail, 
    Facebook, 
    Instagram, 
    Youtube, 
    ArrowRight, 
    ChevronRight,
    Search,
    ShieldCheck,
    FileText
} from 'lucide-react';

export default function Home({ stats, beritas, agendas, aparatur, settings, profile, layanans }) {
    
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1, 
            y: 0,
            transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" }
        })
    };

    const staggeringContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    return (
        <div className="home-container">
            <Head title="Selamat Datang di Portal Resmi Desa" />

            {/* Navbar */}
            <nav className="navbar">
                <div className="nav-content">
                    <Link href="/" className="logo-section">
                        <div className="logo-box">L</div>
                        <span className="logo-text">LANPEG DESA</span>
                    </Link>
                    <div className="nav-links">
                        <a href="#profil">Profil</a>
                        <a href="#berita">Berita</a>
                        <a href="#layanan">Layanan</a>
                        <a href="#kontak">Kontak</a>
                        <Link href="/login" className="btn-admin-login">Login Admin</Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <motion.div 
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        custom={1}
                        className="badge-welcome"
                    >
                        Selamat Datang di Portal Desa Digital
                    </motion.div>
                    <motion.h1 
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        custom={2}
                    >
                        Membangun Desa Modern <br /> 
                        <span>Mandiri & Terintegrasi</span>
                    </motion.h1>
                    <motion.p 
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        custom={3}
                    >
                        Pusat informasi resmi dan layanan publik digital untuk seluruh warga desa. <br />
                        Akses data, berita, dan urusan administrasi lebih cepat dan transparant.
                    </motion.p>
                    <motion.div 
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        custom={4}
                        className="hero-buttons"
                    >
                        <a href="#berita" className="btn-primary">Kabar Desa Terkini</a>
                        <Link href="/layanan" className="btn-secondary">Lihat Layanan Publik</Link>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-strip">
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggeringContainer}
                    className="stats-grid"
                >
                    <motion.div variants={fadeIn} custom={1} className="stat-item">
                        <div className="icon blue"><Users size={24} /></div>
                        <div className="info">
                            <h3>{stats.total_penduduk}</h3>
                            <p>Jiwa Terdaftar</p>
                        </div>
                    </motion.div>
                    <motion.div variants={fadeIn} custom={2} className="stat-item">
                        <div className="icon pink"><Users size={24} /></div>
                        <div className="info">
                            <h3>{stats.laki_laki} / {stats.perempuan}</h3>
                            <p>Laki-laki / Perempuan</p>
                        </div>
                    </motion.div>
                    <motion.div variants={fadeIn} custom={3} className="stat-item">
                        <div className="icon orange"><ShieldCheck size={24} /></div>
                        <div className="info">
                            <h3>{stats.total_aparatur}</h3>
                            <p>Aparatur Desa</p>
                        </div>
                    </motion.div>
                    <motion.div variants={fadeIn} custom={4} className="stat-item">
                        <div className="icon green"><MapPin size={24} /></div>
                        <div className="info">
                            <h3>Aktif</h3>
                            <p>Pelayanan Digital</p>
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {/* Services Preview Section */}
            <section id="layanan" className="section layanan-preview">
                <div className="section-header">
                    <h2>E-Layanan Terpadu Desa</h2>
                    <p>Berbagai kemudahan mengurus administrasi kependudukan tanpa harus antre lama.</p>
                </div>
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggeringContainer}
                    className="service-preview-grid"
                >
                    {layanans.map((layanan, idx) => (
                        <motion.div key={layanan.id} variants={fadeIn} custom={idx} className="service-card">
                            <div className="service-icon"><FileText size={24} /></div>
                            <h4>{layanan.nama}</h4>
                            <p>{layanan.deskripsi?.substring(0, 50)}...</p>
                            <Link href="/layanan" className="link-service">Pelajari Syarat <ArrowRight size={14} /></Link>
                        </motion.div>
                    ))}
                </motion.div>
                <div className="centered-action">
                    <Link href="/layanan" className="btn-outline">Lihat Semua Layanan Desa</Link>
                </div>
            </section>

            {/* News Section */}
            <section id="berita" className="section berita-section">
                <div className="section-header">
                    <h2>Kabar Desa Terkini</h2>
                    <p>Informasi terbaru mengenai pembangunan dan kegiatan desa.</p>
                </div>
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={staggeringContainer}
                    className="berita-grid"
                >
                    {beritas.map((berita, idx) => (
                        <motion.div key={berita.id} variants={fadeIn} custom={idx} className="berita-card">
                            <div className="card-image">
                                <img src={berita.image ? `/storage/${berita.image}` : 'https://via.placeholder.com/600x400'} alt={berita.title} />
                            </div>
                            <div className="card-content">
                                <span className="date">{new Date(berita.created_at).toLocaleDateString('id-ID')}</span>
                                <h4>{berita.title}</h4>
                                <p>{berita.description?.substring(0, 80)}...</p>
                                <Link href="#" className="read-more">Baca Selengkapnya <ChevronRight size={14} /></Link>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Agenda & Aparatur Split */}
            <section className="split-section">
                <div className="container-split">
                    {/* Left: Agenda */}
                    <div className="agenda-side">
                        <h3 className="sub-title">Agenda Desa Mendatang</h3>
                        <div className="agenda-list">
                            {agendas.map((agenda, idx) => (
                                <motion.div 
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    key={agenda.id} 
                                    className="agenda-item"
                                >
                                    <div className="date-box">
                                        <strong>{new Date(agenda.tanggal_mulai).getDate()}</strong>
                                        <span>{new Date(agenda.tanggal_mulai).toLocaleDateString('id-ID', { month: 'short' })}</span>
                                    </div>
                                    <div className="item-content">
                                        <h4>{agenda.judul}</h4>
                                        <p><MapPin size={12} /> {agenda.lokasi}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Aparatur */}
                    <div className="aparatur-side">
                        <h3 className="sub-title">Perangkat Desa Utama</h3>
                        <div className="aparatur-grid">
                            {aparatur.map((person, idx) => (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.1 }}
                                    key={person.id} 
                                    className="person-card"
                                >
                                    <div className="person-img">
                                        <img src={person.foto ? `/storage/${person.foto}` : 'https://via.placeholder.com/100'} alt={person.nama} />
                                    </div>
                                    <h5>{person.nama}</h5>
                                    <p>{person.jabatan}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer / Kontak */}
            <footer id="kontak" className="footer">
                <div className="footer-top">
                    <div className="footer-info">
                        <div className="logo-section light">
                            <div className="logo-box">L</div>
                            <span className="logo-text">LANPEG DESA</span>
                        </div>
                        <p>{profile?.description || 'Portal resmi informasi desa yang terintegrasi untuk pelayanan publik yang lebih baik.'}</p>
                        <div className="social-links">
                            {settings.facebook && <a href={settings.facebook} target="_blank"><Facebook size={20} /></a>}
                            {settings.instagram && <a href={settings.instagram} target="_blank"><Instagram size={20} /></a>}
                            {settings.youtube && <a href={settings.youtube} target="_blank"><Youtube size={20} /></a>}
                        </div>
                    </div>
                    <div className="footer-contact">
                        <h4>Hubungi Kami</h4>
                        <ul>
                            <li><MapPin size={16} /> {settings.address || 'Alamat Kantor Desa....'}</li>
                            <li><Phone size={16} /> {settings.phone || '0xxx-xxxxxx'}</li>
                            <li><Mail size={16} /> {settings.email || 'info@desa.id'}</li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2026 Portal Desa Digital - Powered by Lanpeg Digital Ecosystem</p>
                </div>
            </footer>

            <style>{`
                .home-container { font-family: 'Inter', sans-serif; color: #1e293b; overflow-x: hidden; }
                
                /* Navbar */
                .navbar { position: fixed; top: 0; left: 0; right: 0; background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(10px); z-index: 1000; border-bottom: 1px solid rgba(0,0,0,0.05); }
                .nav-content { max-width: 1200px; margin: 0 auto; padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; }
                .logo-section { display: flex; align-items: center; gap: 12px; text-decoration: none; color: #1e293b; }
                .logo-box { width: 40px; height: 40px; background: #1e293b; color: white; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-weight: 900; }
                .logo-text { font-weight: 800; font-size: 1.2rem; letter-spacing: -0.02em; }
                .nav-links { display: flex; align-items: center; gap: 32px; }
                .nav-links a { text-decoration: none; color: #64748b; font-weight: 600; font-size: 0.95rem; transition: 0.2s; }
                .nav-links a:hover { color: #1e293b; }
                .btn-admin-login { background: #f1f5f9; color: #1e293b; padding: 10px 20px; border-radius: 10px; font-weight: 700; text-decoration: none; transition: 0.2s; }
                .btn-admin-login:hover { background: #e2e8f0; }

                /* Hero */
                .hero { height: 90vh; min-height: 700px; background: url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80') center/cover no-repeat; position: relative; display: flex; align-items: center; justify-content: center; text-align: center; }
                .hero-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.7)); }
                .hero-content { position: relative; z-index: 10; max-width: 900px; padding: 40px; color: white; }
                .badge-welcome { display: inline-block; background: rgba(255,255,255,0.2); backdrop-filter: blur(4px); padding: 8px 20px; border-radius: 30px; font-size: 0.9rem; font-weight: 700; margin-bottom: 24px; border: 1px solid rgba(255,255,255,0.3); }
                .hero h1 { font-size: 4rem; font-weight: 900; line-height: 1.1; margin-bottom: 24px; }
                .hero h1 span { color: #3b82f6; }
                .hero p { font-size: 1.25rem; color: rgba(255,255,255,0.8); margin-bottom: 40px; line-height: 1.5; }
                .hero-buttons { display: flex; gap: 20px; justify-content: center; }
                .btn-primary { background: #3b82f6; color: white; padding: 18px 36px; border-radius: 14px; font-weight: 700; text-decoration: none; transition: 0.3s; box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3); }
                .btn-primary:hover { transform: translateY(-4px); background: #2563eb; }
                .btn-secondary { background: rgba(255,255,255,0.1); backdrop-filter: blur(4px); color: white; padding: 18px 36px; border-radius: 14px; font-weight: 700; text-decoration: none; border: 1px solid rgba(255,255,255,0.2); transition: 0.3s; }
                .btn-secondary:hover { background: rgba(255,255,255,0.2); }

                /* Stats Strip */
                .stats-strip { background: white; margin-top: -60px; position: relative; z-index: 20; max-width: 1100px; margin-left: auto; margin-right: auto; padding: 40px; border-radius: 32px; box-shadow: 0 30px 60px -12px rgba(0,0,0,0.1); }
                .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 40px; }
                .stat-item { display: flex; align-items: center; gap: 20px; }
                .stat-item .icon { width: 56px; height: 56px; border-radius: 16px; display: flex; align-items: center; justify-content: center; }
                .icon.blue { background: #eff6ff; color: #3b82f6; }
                .icon.pink { background: #fdf2f8; color: #ec4899; }
                .icon.orange { background: #fff7ed; color: #f59e0b; }
                .icon.green { background: #f0fdf4; color: #10b981; }
                .stat-item h3 { font-size: 1.5rem; font-weight: 800; margin: 0; }
                .stat-item p { font-size: 0.85rem; color: #64748b; font-weight: 600; margin: 0; }

                /* Services Preview */
                .layanan-preview { background: #f8fafc; }
                .service-preview-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 48px; }
                .service-card { background: white; padding: 32px; border-radius: 24px; border: 1px solid #e2e8f0; transition: 0.3s; }
                .service-card:hover { transform: translateY(-5px); border-color: #3b82f6; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05); }
                .service-icon { width: 56px; height: 56px; background: #eff6ff; color: #3b82f6; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; }
                .service-card h4 { font-size: 1.2rem; font-weight: 800; margin-bottom: 8px; }
                .service-card p { font-size: 0.9rem; color: #64748b; margin-bottom: 20px; line-height: 1.5; }
                .link-service { text-decoration: none; color: #3b82f6; font-weight: 700; font-size: 0.85rem; display: flex; align-items: center; gap: 6px; }
                .centered-action { text-align: center; }
                .btn-outline { display: inline-block; padding: 14px 32px; border: 2px solid #1e293b; border-radius: 14px; color: #1e293b; font-weight: 700; text-decoration: none; transition: 0.2s; }
                .btn-outline:hover { background: #1e293b; color: white; }

                /* Berita Section */
                .section { padding: 120px 24px; max-width: 1200px; margin: 0 auto; }
                .section-header { text-align: center; margin-bottom: 64px; }
                .section-header h2 { font-size: 2.5rem; font-weight: 800; margin-bottom: 16px; }
                .section-header p { color: #64748b; font-size: 1.1rem; }
                .berita-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
                .berita-card { background: #f8fafc; border-radius: 24px; overflow: hidden; border: 1px solid #e2e8f0; transition: 0.3s; }
                .berita-card:hover { transform: translateY(-10px); border-color: #3b82f6; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05); }
                .card-image { height: 220px; overflow: hidden; }
                .card-image img { width: 100%; height: 100%; object-fit: cover; transition: 0.5s; }
                .berita-card:hover .card-image img { scale: 1.1; }
                .card-content { padding: 24px; }
                .card-content .date { font-size: 0.75rem; color: #3b82f6; font-weight: 800; text-transform: uppercase; display: block; margin-bottom: 12px; }
                .card-content h4 { font-size: 1.2rem; font-weight: 800; margin-bottom: 12px; height: 3rem; overflow: hidden; }
                .card-content p { color: #64748b; font-size: 0.95rem; margin-bottom: 20px; }
                .read-more { text-decoration: none; color: #1e293b; font-weight: 700; font-size: 0.85rem; display: flex; align-items: center; gap: 4px; }

                /* Split Section */
                .split-section { background: #f1f5f9; padding: 100px 24px; }
                .container-split { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; }
                .sub-title { font-size: 1.5rem; font-weight: 800; margin-bottom: 40px; display: flex; align-items: center; gap: 12px; }
                .agenda-list { display: flex; flex-direction: column; gap: 20px; }
                .agenda-item { display: flex; gap: 20px; background: white; padding: 20px; border-radius: 20px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
                .date-box { min-width: 60px; height: 60px; background: #1e293b; color: white; border-radius: 14px; display: flex; flex-direction: column; align-items: center; justify-content: center; }
                .date-box strong { font-size: 1.5rem; line-height: 1; }
                .date-box span { font-size: 0.7rem; text-transform: uppercase; font-weight: 800; }
                .item-content h4 { font-size: 1.1rem; font-weight: 700; margin-bottom: 4px; }
                .item-content p { font-size: 0.85rem; color: #64748b; display: flex; align-items: center; gap: 6px; }

                .aparatur-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
                .person-card { background: white; padding: 24px; border-radius: 20px; text-align: center; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
                .person-img { width: 80px; height: 80px; margin: 0 auto 16px; border-radius: 24px; overflow: hidden; background: #f8fafc; }
                .person-img img { width: 100%; height: 100%; object-fit: cover; }
                .person-card h5 { font-size: 1rem; font-weight: 800; margin-bottom: 4px; }
                .person-card p { font-size: 0.8rem; color: #3b82f6; font-weight: 700; }

                /* Footer */
                .footer { background: #0f172a; color: white; padding: 100px 24px; }
                .footer-top { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr; gap: 100px; padding-bottom: 64px; }
                .logo-section.light .logo-box { background: white; color: #0f172a; }
                .logo-section.light .logo-text { color: white; }
                .footer-info p { color: #94a3b8; line-height: 1.6; margin: 24px 0; max-width: 400px; }
                .social-links { display: flex; gap: 16px; }
                .social-links a { width: 44px; height: 44px; border-radius: 12px; background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; color: white; transition: 0.2s; }
                .social-links a:hover { background: #3b82f6; transform: translateY(-4px); }
                .footer-contact h4 { font-size: 1.25rem; font-weight: 700; margin-bottom: 32px; }
                .footer-contact ul { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 20px; }
                .footer-contact li { display: flex; gap: 16px; color: #94a3b8; font-size: 0.95rem; }
                .footer-contact li svg { color: #3b82f6; flex-shrink: 0; }
                .footer-bottom { border-top: 1px solid rgba(255,255,255,0.05); max-width: 1200px; margin: 0 auto; padding-top: 40px; text-align: center; color: #64748b; font-size: 0.85rem; }

                @media (max-width: 992px) {
                    .hero h1 { font-size: 2.5rem; }
                    .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 24px; }
                    .berita-grid { grid-template-columns: 1fr; }
                    .container-split { grid-template-columns: 1fr; gap: 60px; }
                    .footer-top { grid-template-columns: 1fr; gap: 60px; }
                    .nav-links { display: none; }
                }
            `}</style>
        </div>
    );
}
