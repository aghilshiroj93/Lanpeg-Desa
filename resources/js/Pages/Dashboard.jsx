import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    Users, 
    FileText, 
    Calendar, 
    UserCheck, 
    ChevronRight, 
    ArrowUpRight,
    Clock,
    Newspaper,
    Printer,
} from 'lucide-react';
import { 
    PieChart, 
    Pie, 
    Cell, 
    ResponsiveContainer, 
    Tooltip, 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid,
    Legend
} from 'recharts';

export default function Dashboard({ stats, gender_stats, status_stats, recent_surats, recent_beritas, upcoming_agendas }) {
    
    const COLORS = ['#3b82f6', '#ec4899', '#f59e0b'];

    return (
        <DashboardLayout>
            <Head title="Dashboard Utama" />

            <div className="welcome-section">
                <div className="welcome-text">
                    <h1>Selamat Datang, Admin</h1>
                    <p>Pantau data kependudukan dan layanan desa secara real-time dari satu dashboard.</p>
                </div>
                <div className="current-date">
                    <Clock size={16} />
                    <span>{new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
            </div>

            {/* Stat Cards */}
            <div className="stats-grid">
                <div className="stat-card blue">
                    <div className="stat-icon"><Users size={24} /></div>
                    <div className="stat-info">
                        <span className="label">Total Penduduk</span>
                        <h2 className="value">{stats.total_penduduk}</h2>
                        <span className="trend">Jiwa Terdaftar</span>
                    </div>
                </div>
                <div className="stat-card pink">
                    <div className="stat-icon"><UserCheck size={24} /></div>
                    <div className="stat-info">
                        <span className="label">Aparatur Desa</span>
                        <h2 className="value">{stats.total_aparatur}</h2>
                        <span className="trend">Personal Standby</span>
                    </div>
                </div>
                <div className="stat-card orange">
                    <div className="stat-icon"><Calendar size={24} /></div>
                    <div className="stat-info">
                        <span className="label">Agenda Terdekat</span>
                        <h2 className="value">{stats.total_agenda}</h2>
                        <span className="trend">Kegiatan Aktif</span>
                    </div>
                </div>
                <div className="stat-card indigo">
                    <div className="stat-icon"><FileText size={24} /></div>
                    <div className="stat-info">
                        <span className="label">Surat Keluar</span>
                        <h2 className="value">{stats.total_surat}</h2>
                        <span className="trend">Dokumen Terarsip</span>
                    </div>
                </div>
            </div>

            {/* Charts Row */}
            <div className="charts-row">
                <div className="chart-card">
                    <div className="chart-header">
                        <h3>Distribusi Gender</h3>
                        <Link href="/penduduk" className="btn-view">Lihat Detail</Link>
                    </div>
                    <div className="chart-body" style={{ height: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={gender_stats}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {gender_stats.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" height={36}/>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="chart-card">
                    <div className="chart-header">
                        <h3>Status Penduduk</h3>
                        <Link href="/penduduk" className="btn-view">Lihat Detail</Link>
                    </div>
                    <div className="chart-body" style={{ height: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={status_stats}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                                <Tooltip cursor={{fill: '#f8fafc'}} />
                                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Activity Row */}
            <div className="activity-row">
                {/* Recent Letters */}
                <div className="activity-card">
                    <div className="activity-header">
                        <div className="title-box">
                            <div className="icon pink"><Printer size={18} /></div>
                            <h3>Surat Terbaru</h3>
                        </div>
                        <Link href="/surat" className="btn-more">Arsip <ChevronRight size={14} /></Link>
                    </div>
                    <div className="activity-list">
                        {recent_surats.map((surat) => (
                            <div key={surat.id} className="activity-item">
                                <div className="item-main">
                                    <strong>{surat.penduduk.nama_lengkap}</strong>
                                    <span>{surat.jenis_surat}</span>
                                </div>
                                <div className="item-meta">
                                    <code>{surat.nomor_surat}</code>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Upcoming Agendas */}
                <div className="activity-card">
                    <div className="activity-header">
                        <div className="title-box">
                            <div className="icon orange"><Calendar size={18} /></div>
                            <h3>Agenda Mendatang</h3>
                        </div>
                        <Link href="/agenda" className="btn-more">Semua <ChevronRight size={14} /></Link>
                    </div>
                    <div className="activity-list">
                        {upcoming_agendas.map((agenda) => (
                            <div key={agenda.id} className="activity-item">
                                <div className="item-main">
                                    <strong>{agenda.judul}</strong>
                                    <span>{agenda.lokasi}</span>
                                </div>
                                <div className="item-meta date">
                                    <strong>{new Date(agenda.tanggal_mulai).getDate()}</strong>
                                    <span>{new Date(agenda.tanggal_mulai).toLocaleDateString('id-ID', { month: 'short' })}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent News */}
                <div className="activity-card">
                    <div className="activity-header">
                        <div className="title-box">
                            <div className="icon indigo"><Newspaper size={18} /></div>
                            <h3>Berita Terkini</h3>
                        </div>
                        <Link href="/berita" className="btn-more">Kabar <ChevronRight size={14} /></Link>
                    </div>
                    <div className="activity-list">
                        {recent_beritas.map((berita) => (
                            <div key={berita.id} className="activity-item">
                                <div className="item-main">
                                    <strong>{berita.title}</strong>
                                    <span>{new Date(berita.created_at).toLocaleDateString('id-ID')}</span>
                                </div>
                                <div className="item-meta">
                                    <div className="status-dot online"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                .welcome-section { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
                .welcome-text h1 { font-size: 2.2rem; font-weight: 800; color: #1e293b; margin-bottom: 4px; }
                .welcome-text p { color: #64748b; font-size: 1.1rem; }
                .current-date { display: flex; align-items: center; gap: 10px; background: white; padding: 10px 20px; border-radius: 12px; border: 1px solid #e2e8f0; font-weight: 700; color: #1e293b; font-size: 0.9rem; }

                /* Stats Cards */
                .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; margin-bottom: 32px; }
                .stat-card { background: white; padding: 24px; border-radius: 20px; display: flex; align-items: center; gap: 20px; border: 1px solid #e2e8f0; transition: 0.3s; }
                .stat-card:hover { transform: translateY(-5px); box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); }
                .stat-icon { width: 56px; height: 56px; border-radius: 16px; display: flex; align-items: center; justify-content: center; }
                .blue .stat-icon { background: #eff6ff; color: #3b82f6; }
                .pink .stat-icon { background: #fdf2f8; color: #ec4899; }
                .orange .stat-icon { background: #fff7ed; color: #f59e0b; }
                .indigo .stat-icon { background: #eef2ff; color: #6366f1; }
                .stat-info .label { font-size: 0.85rem; font-weight: 700; color: #64748b; display: block; margin-bottom: 4px; }
                .stat-info .value { font-size: 1.75rem; font-weight: 800; color: #1e293b; line-height: 1; margin: 0; }
                .stat-info .trend { font-size: 0.75rem; color: #94a3b8; font-weight: 600; }

                /* Charts Row */
                .charts-row { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 32px; }
                .chart-card { background: white; border-radius: 24px; border: 1px solid #e2e8f0; padding: 24px; }
                .chart-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
                .chart-header h3 { font-size: 1.1rem; font-weight: 800; color: #1e293b; margin: 0; }
                .btn-view { font-size: 0.85rem; font-weight: 700; color: #3b82f6; text-decoration: none; }

                /* Activity Cards */
                .activity-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
                .activity-card { background: white; border-radius: 24px; border: 1px solid #e2e8f0; padding: 24px; }
                .activity-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
                .title-box { display: flex; align-items: center; gap: 12px; }
                .title-box .icon { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
                .title-box .icon.pink { background: #fdf2f8; color: #ec4899; }
                .title-box .icon.orange { background: #fff7ed; color: #f59e0b; }
                .title-box .icon.indigo { background: #eef2ff; color: #6366f1; }
                .title-box h3 { font-size: 1rem; font-weight: 800; color: #1e293b; margin: 0; }
                .btn-more { font-size: 0.85rem; font-weight: 700; color: #64748b; display: flex; align-items: center; gap: 4px; text-decoration: none; }

                .activity-list { display: flex; flex-direction: column; gap: 16px; }
                .activity-item { display: flex; justify-content: space-between; align-items: center; padding-bottom: 16px; border-bottom: 1px solid #f1f5f9; }
                .activity-item:last-child { border-bottom: none; padding-bottom: 0; }
                .item-main strong { display: block; font-size: 0.95rem; color: #1e293b; }
                .item-main span { font-size: 0.8rem; color: #94a3b8; font-weight: 600; }
                
                .item-meta code { font-size: 0.75rem; background: #f1f5f9; padding: 4px 8px; border-radius: 6px; color: #475569; font-weight: 700; }
                .item-meta.date { text-align: center; background: #f8fafc; padding: 6px 12px; border-radius: 10px; min-width: 50px; }
                .item-meta.date strong { display: block; font-size: 1.1rem; line-height: 1; color: #1e293b; }
                .item-meta.date span { font-size: 0.7rem; color: #94a3b8; text-transform: uppercase; font-weight: 800; }

                .status-dot { width: 8px; height: 8px; border-radius: 50%; }
                .status-dot.online { background: #10b981; box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1); }
            `}</style>
        </DashboardLayout>
    );
}
