import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { 
    FileText, 
    ArrowLeft, 
    ChevronRight, 
    Search, 
    BookOpen, 
    Clock, 
    CheckCircle,
    Info
} from 'lucide-react';

export default function PublicLayanan({ layanans }) {
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState(null);

    const filtered = layanans.filter(l => 
        l.nama.toLowerCase().includes(search.toLowerCase()) ||
        l.deskripsi.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="layanan-page">
            <Head title="Pusat Layanan Warga Digital" />
            
            {/* Header / Nav */}
            <div className="page-header">
                <div className="container">
                    <Link href="/" className="btn-back">
                        <ArrowLeft size={18} /> Kembali ke Beranda
                    </Link>
                    <h1>Pusat Layanan Desa</h1>
                    <p>Temukan persyaratan dan prosedur pengurusan dokumen kependudukan secara mandiri.</p>
                </div>
            </div>

            <div className="container main-content">
                <div className="search-bar-wrapper">
                    <Search className="search-icon" size={20} />
                    <input 
                        type="text" 
                        placeholder="Cari jenis layanan (misal: KTP, Domisili)..." 
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>

                <div className="layanan-layout">
                    {/* List */}
                    <div className="layanan-list">
                        {filtered.length > 0 ? filtered.map((layanan, i) => (
                            <motion.div 
                                key={layanan.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className={`layanan-item ${selected?.id === layanan.id ? 'active' : ''}`}
                                onClick={() => setSelected(layanan)}
                            >
                                <div className="item-icon">
                                    <FileText size={24} />
                                </div>
                                <div className="item-info">
                                    <h3>{layanan.nama}</h3>
                                    <p>{layanan.deskripsi?.substring(0, 60)}...</p>
                                </div>
                                <ChevronRight className="chevron" size={18} />
                            </motion.div>
                        )) : (
                            <div className="empty-state">Layanan tidak ditemukan...</div>
                        )}
                    </div>

                    {/* Detail Panel */}
                    <div className="detail-panel">
                        {selected ? (
                            <motion.div 
                                key={selected.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="detail-card"
                            >
                                <div className="detail-header">
                                    <div className="icon-badge"><BookOpen size={24} /></div>
                                    <h2>{selected.nama}</h2>
                                    <p>{selected.deskripsi}</p>
                                </div>

                                <div className="detail-sections">
                                    <div className="d-section">
                                        <div className="s-title"><CheckCircle size={18} /> Persyaratan Dokumen</div>
                                        <div className="s-content">
                                            {selected.persyaratan ? selected.persyaratan.split('\n').map((line, i) => (
                                                <div key={i} className="li-item">• {line}</div>
                                            )) : 'Tidak ada persyaratan khusus.'}
                                        </div>
                                    </div>

                                    <div className="d-section">
                                        <div className="s-title"><Clock size={18} /> Prosedur Pengurusan</div>
                                        <div className="s-content prose">
                                            {selected.prosedur || 'Silakan hubungi kantor desa untuk informasi lebih lanjut.'}
                                        </div>
                                    </div>

                                    {selected.file_lampiran && (
                                        <div className="download-cta">
                                            <div className="cta-icon"><Info size={20} /></div>
                                            <div className="cta-text">
                                                <strong>Formulir Tersedia</strong>
                                                <span>Anda dapat mengunduh formulir ini untuk diisi di rumah.</span>
                                            </div>
                                            <a href={`/storage/${selected.file_lampiran}`} target="_blank" className="btn-download">Unduh File</a>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ) : (
                            <div className="placeholder-detail">
                                <div className="illu">📋</div>
                                <h3>Pilih Layanan</h3>
                                <p>Silakan klik salah satu jenis layanan di samping untuk melihat detail persyaratan dan prosedur.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style>{`
                .layanan-page { min-height: 100vh; background: #f8fafc; font-family: 'Inter', sans-serif; padding-bottom: 80px; }
                .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
                
                .page-header { background: #1e293b; color: white; padding: 60px 0 100px; text-align: center; }
                .btn-back { display: inline-flex; align-items: center; gap: 8px; color: #94a3b8; text-decoration: none; font-weight: 600; font-size: 0.9rem; margin-bottom: 24px; transition: 0.2s; }
                .btn-back:hover { color: white; }
                .page-header h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: 12px; }
                .page-header p { color: #94a3b8; font-size: 1.1rem; max-width: 600px; margin: 0 auto; }

                .main-content { margin-top: -50px; }
                .search-bar-wrapper { background: white; border-radius: 20px; padding: 4px 24px; display: flex; align-items: center; gap: 16px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1); border: 1px solid #e2e8f0; margin-bottom: 40px; }
                .search-icon { color: #94a3b8; }
                .search-bar-wrapper input { flex: 1; border: none; padding: 20px 0; outline: none; font-size: 1.1rem; font-weight: 500; color: #1e293b; }

                .layanan-layout { display: grid; grid-template-columns: 380px 1fr; gap: 40px; }
                
                .layanan-list { display: flex; flex-direction: column; gap: 12px; }
                .layanan-item { background: white; padding: 20px; border-radius: 16px; border: 1px solid #e2e8f0; display: flex; align-items: center; gap: 16px; cursor: pointer; transition: 0.2s; }
                .layanan-item:hover { border-color: #3b82f6; transform: translateX(5px); }
                .layanan-item.active { background: #eff6ff; border-color: #3b82f6; }
                .item-icon { width: 48px; height: 48px; background: #f1f5f9; color: #475569; border-radius: 12px; display: flex; align-items: center; justify-content: center; transition: 0.2s; }
                .layanan-item.active .item-icon { background: #3b82f6; color: white; }
                .item-info h3 { font-size: 1.05rem; font-weight: 800; color: #1e293b; margin: 0 0 4px; }
                .item-info p { font-size: 0.85rem; color: #64748b; margin: 0; }
                .chevron { margin-left: auto; color: #cbd5e1; }
                .layanan-item.active .chevron { color: #3b82f6; }

                .detail-panel { min-height: 500px; }
                .detail-card { background: white; border-radius: 24px; border: 1px solid #e2e8f0; padding: 40px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
                .detail-header { text-align: center; margin-bottom: 40px; border-bottom: 1px solid #f1f5f9; padding-bottom: 32px; }
                .icon-badge { width: 64px; height: 64px; background: #fdf2f8; color: #ec4899; border-radius: 20px; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; }
                .detail-header h2 { font-size: 2rem; font-weight: 900; color: #1e293b; margin-bottom: 12px; }
                .detail-header p { color: #64748b; line-height: 1.6; }

                .detail-sections { display: flex; flex-direction: column; gap: 32px; }
                .s-title { display: flex; align-items: center; gap: 10px; font-weight: 800; font-size: 1.1rem; color: #1e293b; margin-bottom: 16px; }
                .s-content { color: #475569; line-height: 1.7; font-size: 1rem; }
                .li-item { margin-bottom: 8px; }
                .prose { white-space: pre-wrap; }

                .download-cta { margin-top: 16px; background: #f0f9ff; border: 1px solid #bae6fd; padding: 24px; border-radius: 20px; display: flex; align-items: center; gap: 20px; }
                .cta-icon { width: 44px; height: 44px; background: white; color: #0284c7; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
                .cta-text { flex: 1; }
                .cta-text strong { display: block; color: #0369a1; font-size: 1rem; }
                .cta-text span { font-size: 0.85rem; color: #0ea5e9; }
                .btn-download { background: #0284c7; color: white; padding: 12px 24px; border-radius: 12px; text-decoration: none; font-weight: 700; transition: 0.2s; }
                .btn-download:hover { background: #0369a1; transform: translateY(-2px); }

                .placeholder-detail { background: #f1f5f9; border: 2px dashed #e2e8f0; border-radius: 24px; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 40px; color: #94a3b8; }
                .illu { font-size: 4rem; margin-bottom: 20px; opacity: 0.5; }
                .placeholder-detail h3 { font-size: 1.5rem; font-weight: 800; color: #64748b; margin-bottom: 8px; }

                @media (max-width: 992px) {
                    .layanan-layout { grid-template-columns: 1fr; }
                    .page-header h1 { font-size: 2rem; }
                }
            `}</style>
        </div>
    );
}
